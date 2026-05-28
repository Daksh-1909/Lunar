export interface Particle {
  x: number;
  y: number;
  targetX: number;
  targetY: number;
  r: number;
  g: number;
  b: number;
  a: number;
  vx: number;
  vy: number;
  size: number;
  originalAlpha: number;
  noiseOffset: number;
}

export type EngineStatus = 'inactive' | 'dissolving' | 'rebuilding' | 'idle';

export interface EngineOptions {
  maxParticles?: number;
  particleSize?: number;
  springStrength?: number;
  damping?: number;
  jitterStrength?: number;
  flowStrength?: number;
  glowColor?: string;
}

export class ParticleEngine {
  private canvas: HTMLCanvasElement;
  private ctx: CanvasRenderingContext2D;
  private particles: Particle[] = [];
  private status: EngineStatus = 'inactive';
  private animationFrameId: number | null = null;
  private onCompleteCallback: ((status: EngineStatus) => void) | null = null;
  private lastTime: number = 0;
  private scaleX: number = 1;
  private scaleY: number = 1;
  private offsetX: number = 0;
  private offsetY: number = 0;

  // Configuration options
  private maxParticles: number = 3000;
  private particleSize: number = 2;
  private springStrength: number = 0.08;
  private damping: number = 0.85;
  private jitterStrength: number = 0.3;
  private flowStrength: number = 0.15;
  private opacity: number = 1;

  constructor(canvas: HTMLCanvasElement, options?: EngineOptions) {
    this.canvas = canvas;
    const context = canvas.getContext('2d');
    if (!context) {
      throw new Error('Could not retrieve 2D context from canvas');
    }
    this.ctx = context;

    if (options) {
      if (options.maxParticles !== undefined) this.maxParticles = options.maxParticles;
      if (options.particleSize !== undefined) this.particleSize = options.particleSize;
      if (options.springStrength !== undefined) this.springStrength = options.springStrength;
      if (options.damping !== undefined) this.damping = options.damping;
      if (options.jitterStrength !== undefined) this.jitterStrength = options.jitterStrength;
      if (options.flowStrength !== undefined) this.flowStrength = options.flowStrength;
    }
  }

  /**
   * Samples pixels from the captured offscreen canvas to generate particles.
   */
  public generateParticlesFromImage(
    capturedCanvas: HTMLCanvasElement,
    elementWidth: number,
    elementHeight: number,
    canvasPaddingX: number,
    canvasPaddingY: number
  ) {
    const tempCtx = capturedCanvas.getContext('2d');
    if (!tempCtx) return;

    const width = capturedCanvas.width;
    const height = capturedCanvas.height;

    // Get image pixels
    const imgData = tempCtx.getImageData(0, 0, width, height);
    const data = imgData.data;

    this.particles = [];

    // Calculate dynamic step to keep particle count optimized around maxParticles limit
    let totalSolidPixels = 0;
    for (let i = 3; i < data.length; i += 4) {
      if (data[i] > 10) totalSolidPixels++; // alpha > 10
    }

    const ratio = Math.max(1, totalSolidPixels / this.maxParticles);
    const step = Math.max(2, Math.round(Math.sqrt(ratio * (width / height) * 4)));
    
    // Scale mapping elements local to layout canvas coordinates
    this.scaleX = elementWidth / width;
    this.scaleY = elementHeight / height;
    this.offsetX = canvasPaddingX;
    this.offsetY = canvasPaddingY;

    for (let y = 0; y < height; y += step) {
      for (let x = 0; x < width; x += step) {
        const index = (y * width + x) * 4;
        const r = data[index];
        const g = data[index + 1];
        const b = data[index + 2];
        const a = data[index + 3] / 255;

        // Skip highly transparent pixels to save performance
        if (a < 0.1) continue;

        // Target coordinates mapped to overlay canvas space
        const targetX = x * this.scaleX + this.offsetX;
        const targetY = y * this.scaleY + this.offsetY;

        this.particles.push({
          x: targetX,
          y: targetY,
          targetX,
          targetY,
          r,
          g,
          b,
          a,
          vx: 0,
          vy: 0,
          size: Math.random() * (this.particleSize - 0.5) + 0.8,
          originalAlpha: a,
          noiseOffset: Math.random() * 1000
        });
      }
    }
  }

  /**
   * Set callback for completion transitions
   */
  public onComplete(callback: (status: EngineStatus) => void) {
    this.onCompleteCallback = callback;
  }

  /**
   * Transition to dissolve state (pixels drift apart and fade)
   */
  public dissolve() {
    if (this.status === 'dissolving') return;
    this.status = 'dissolving';
    this.opacity = 1;
    
    // Give particles a tiny initial outward kick to feel kinetic
    const centerX = this.canvas.width / 2;
    const centerY = this.canvas.height / 2;

    this.particles.forEach((p) => {
      const angle = Math.atan2(p.y - centerY, p.x - centerX);
      const dist = Math.sqrt((p.x - centerX) ** 2 + (p.y - centerY) ** 2);
      const kick = (Math.random() * 2 + 0.5) * (dist / centerX + 0.5);

      p.vx = Math.cos(angle) * kick + (Math.random() - 0.5) * 1.5;
      p.vy = Math.sin(angle) * kick - Math.random() * 1.5; // slight upward draft
    });

    this.lastTime = performance.now();
    this.loop();
  }

  /**
   * Transition to rebuild state (particles gather in a cosmic cloud and assemble)
   */
  public rebuild() {
    if (this.status === 'rebuilding') return;
    this.status = 'rebuilding';
    this.opacity = 1;

    // Spawn particles in a scattered atmospheric dust cloud around the borders
    const w = this.canvas.width;
    const h = this.canvas.height;

    this.particles.forEach((p) => {
      // Scatter coordinates randomly across edges or in outer orbit rings
      const edge = Math.floor(Math.random() * 4);
      let sx = 0;
      let sy = 0;

      if (edge === 0) { // top
        sx = Math.random() * w;
        sy = -50 - Math.random() * 100;
      } else if (edge === 1) { // bottom
        sx = Math.random() * w;
        sy = h + 50 + Math.random() * 100;
      } else if (edge === 2) { // left
        sx = -50 - Math.random() * 100;
        sy = Math.random() * h;
      } else { // right
        sx = w + 50 + Math.random() * 100;
        sy = Math.random() * h;
      }

      p.x = sx;
      p.y = sy;
      p.vx = (p.targetX - sx) * 0.01 + (Math.random() - 0.5) * 5;
      p.vy = (p.targetY - sy) * 0.01 + (Math.random() - 0.5) * 5;
      p.a = 0; // fade in as they approach
    });

    this.lastTime = performance.now();
    this.loop();
  }

  /**
   * Stop the animation loop immediately and deactivate
   */
  public stop() {
    this.status = 'inactive';
    if (this.animationFrameId !== null) {
      cancelAnimationFrame(this.animationFrameId);
      this.animationFrameId = null;
    }
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  /**
   * Retrieves the current engine status
   */
  public getStatus(): EngineStatus {
    return this.status;
  }

  /**
   * Core simulation rendering loop
   */
  private loop = () => {
    if (this.status === 'inactive' || this.status === 'idle') return;

    const now = performance.now();
    const dt = Math.min(33, now - this.lastTime) / 16.666; // Normalize to 60fps delta
    this.lastTime = now;

    this.update(dt);
    this.draw();

    this.animationFrameId = requestAnimationFrame(this.loop);
  };

  /**
   * Update particle positions based on active forces
   */
  private update(dt: number) {
    const timeSec = performance.now() * 0.001;
    let particlesSettled = 0;
    let particlesFaded = 0;

    const count = this.particles.length;

    for (let i = 0; i < count; i++) {
      const p = this.particles[i];

      if (this.status === 'dissolving') {
        // 1. Fluid turbulence / noise (simulating horizontal swirl)
        const flowAngle = Math.sin(p.y * 0.01 + timeSec * 2 + p.noiseOffset) * Math.PI;
        p.vx += Math.cos(flowAngle) * this.flowStrength * dt;
        p.vy += Math.sin(flowAngle) * this.flowStrength * 0.5 * dt - 0.02 * dt; // slight thermal rising

        // 2. Organic jitter/vibration
        p.x += (Math.random() - 0.5) * this.jitterStrength * dt;
        p.y += (Math.random() - 0.5) * this.jitterStrength * dt;

        // 3. Apply physics updates
        p.x += p.vx * dt;
        p.y += p.vy * dt;

        // 4. Dampen velocity
        p.vx *= Math.pow(this.damping, dt);
        p.vy *= Math.pow(this.damping, dt);

        // 5. Fade alpha
        p.a -= 0.012 * dt;
        if (p.a <= 0) {
          p.a = 0;
          particlesFaded++;
        }
      } 
      else if (this.status === 'rebuilding') {
        const dx = p.targetX - p.x;
        const dy = p.targetY - p.y;
        const dist = Math.sqrt(dx * dx + dy * dy);

        // 1. Magnetic Spring Attraction pull
        if (dist > 0.1) {
          // Strong acceleration at high distance, spring-like decelerating close by
          const pull = Math.min(6, dist * this.springStrength);
          p.vx += (dx / dist) * pull * dt;
          p.vy += (dy / dist) * pull * dt;
        }

        // 2. Swirling atmospheric noise (tapers off as particles get close to target)
        const noiseFactor = Math.min(1, dist / 150);
        const flowAngle = Math.cos(p.x * 0.02 + timeSec * 1.5 + p.noiseOffset) * Math.PI * 2;
        p.vx += Math.cos(flowAngle) * this.flowStrength * 8 * noiseFactor * dt;
        p.vy += Math.sin(flowAngle) * this.flowStrength * 8 * noiseFactor * dt;

        // 3. Jitter / vibration (decreases near target to avoid pixel flickering)
        const jitter = this.jitterStrength * noiseFactor;
        p.x += (Math.random() - 0.5) * jitter * dt;
        p.y += (Math.random() - 0.5) * jitter * dt;

        // 4. Apply physics velocity
        p.x += p.vx * dt;
        p.y += p.vy * dt;

        // 5. Velocity damping (higher damping near target to snap cleanly)
        const currentDamping = dist < 20 ? 0.75 : this.damping;
        p.vx *= Math.pow(currentDamping, dt);
        p.vy *= Math.pow(currentDamping, dt);

        // 6. Alpha recovery (fade in smoothly)
        if (p.a < p.originalAlpha) {
          p.a += 0.04 * dt;
          if (p.a > p.originalAlpha) p.a = p.originalAlpha;
        }

        // Check if particle is fully home
        if (dist < 1.2) {
          p.x = p.targetX;
          p.y = p.targetY;
          p.vx = 0;
          p.vy = 0;
          p.a = p.originalAlpha;
          particlesSettled++;
        }
      }
    }

    // Complete callbacks on state resolution
    if (this.status === 'dissolving' && particlesFaded >= count * 0.95) {
      this.status = 'inactive';
      if (this.onCompleteCallback) this.onCompleteCallback('dissolving');
    } 
    else if (this.status === 'rebuilding' && particlesSettled >= count * 0.96) {
      this.status = 'idle';
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
      if (this.onCompleteCallback) this.onCompleteCallback('rebuilding');
    }
  }

  /**
   * Draw updated particles to canvas with additive blending glow
   */
  private draw() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // Set additive screen blend mode to create cosmic celestial glow points
    this.ctx.globalCompositeOperation = 'lighter';

    const count = this.particles.length;
    for (let i = 0; i < count; i++) {
      const p = this.particles[i];
      if (p.a <= 0) continue;

      this.ctx.fillStyle = `rgba(${p.r}, ${p.g}, ${p.b}, ${p.a * this.opacity})`;

      // Draw particle as a tiny rectangle or round point
      if (p.size < 1.5) {
        this.ctx.fillRect(p.x - p.size / 2, p.y - p.size / 2, p.size, p.size);
      } else {
        this.ctx.beginPath();
        this.ctx.arc(p.x, p.y, p.size / 2, 0, Math.PI * 2);
        this.ctx.fill();
      }
    }
  }
}
