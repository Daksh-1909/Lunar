import React, { useState, useRef, useEffect } from "react";
import { Send, MapPin, Mail, Phone, Heart, Sparkles, ChevronDown } from "lucide-react";
import { SpaceBackground } from "../components/ui/SpaceBackground";

interface ConfettiParticle {
  x: number;
  y: number;
  color: string;
  size: number;
  speedX: number;
  speedY: number;
  rotation: number;
  rotationSpeed: number;
}

export const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "general",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationRef = useRef<number | null>(null);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const dropdownOptions = [
    { value: "general", label: "General Inquiry" },
    { value: "submit", label: "Submit Astrophotography" },
    { value: "collaboration", label: "Observatory Collaboration" },
    { value: "licensing", label: "Fine Art Licensing" }
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSubjectSelect = (value: string) => {
    setFormData((prev) => ({ ...prev, subject: value }));
    setIsDropdownOpen(false);
  };

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const startConfetti = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    const particles: ConfettiParticle[] = [];
    const colors = ["#f4a623", "#00e5a0", "#2997ff", "#7c3aed", "#ff6b6b"];

    // Initialize particles
    for (let i = 0; i < 150; i++) {
      particles.push({
        x: canvas.width / 2,
        y: canvas.height / 2 + 100, // rise up from center
        color: colors[Math.floor(Math.random() * colors.length)],
        size: Math.random() * 8 + 4,
        speedX: (Math.random() - 0.5) * 15,
        speedY: (Math.random() - 0.7) * 20 - 5,
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 5
      });
    }

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      let activeParticles = false;

      particles.forEach((p) => {
        p.x += p.speedX;
        p.y += p.speedY;
        p.speedY += 0.4; // gravity force
        p.speedX *= 0.98; // air resistance
        p.rotation += p.rotationSpeed;

        if (p.y < canvas.height) {
          activeParticles = true;
        }

        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.fillStyle = p.color;
        ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size);
        ctx.restore();
      });

      if (activeParticles) {
        animationRef.current = requestAnimationFrame(animate);
      } else {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    };

    animate();
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate network submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSuccess(true);
      setTimeout(() => {
        startConfetti();
      }, 100);
    }, 1500);
  };

  useEffect(() => {
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, []);

  return (
    <div className="w-full bg-transparent min-h-screen py-24 px-6 md:px-12 relative overflow-hidden flex items-center">
      <SpaceBackground variant="spa" />
      {/* Canvas for success confetti */}
      <canvas
        ref={canvasRef}
        className="fixed inset-0 w-full h-full pointer-events-none z-50"
      />

      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16 w-full items-start relative z-10">
        
        {/* Left Column: Contact details (Apple surface card) */}
        <div className="lg:col-span-5 flex flex-col gap-10 select-none animate-in slide-in-from-left duration-500">
          <div>
            <span className="font-mono text-xs uppercase tracking-[0.25em] text-eclipse">
              STELLAR SIGNAL
            </span>
            <h1 className="text-4xl md:text-5xl font-display font-semibold tracking-wide text-white mt-3 display-tight">
              Transmit Coordinates
            </h1>
            <p className="text-sm text-silver/80 font-ui mt-4 leading-relaxed max-w-sm">
              Have a galactic capture to submit, a collaboration proposal, or simply want to inquire about fine art licensing? Transmit your signal to our deep-space communications array.
            </p>
          </div>

          {/* Details list */}
          <div className="flex flex-col gap-6 font-ui">
            <div className="flex gap-4 items-start">
              <div className="w-10 h-10 rounded-full bg-cosmos border border-stardust/40 flex items-center justify-center text-eclipse shrink-0">
                <MapPin className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-semibold text-white font-mono uppercase tracking-wider">OBSERVATORY HEADQUARTERS</h4>
                <p className="text-sm text-silver/80 mt-1 leading-relaxed">
                  Lunar Observatory, <br />
                  85 Skyview Ridge Road, Atacama, Chile
                </p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <div className="w-10 h-10 rounded-full bg-cosmos border border-stardust/40 flex items-center justify-center text-aurora shrink-0">
                <Mail className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-semibold text-white font-mono uppercase tracking-wider">SIGNAL COMMUNICATIONS</h4>
                <p className="text-sm text-silver/80 mt-1 hover:text-white transition-colors">
                  observatory@lunar.com
                </p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <div className="w-10 h-10 rounded-full bg-cosmos border border-stardust/40 flex items-center justify-center text-primary-on-dark shrink-0">
                <Phone className="w-4 h-4" />
              </div>
              <div>
                <h4 className="text-xs font-semibold text-white font-mono uppercase tracking-wider">COMMUNICATIONS HOTLINE</h4>
                <p className="text-sm text-silver/80 mt-1">
                  +1 (800) SKY-GLOW
                </p>
              </div>
            </div>
          </div>

          <div className="pt-6 border-t border-stardust/20 text-xs text-silver/40 leading-relaxed font-mono flex items-center gap-1">
            <span>Our support and reception array is active 24/7.</span>
            <Heart className="w-3 h-3 text-supernova animate-pulse fill-supernova" />
          </div>
        </div>

        {/* Right Column: Contact form */}
        <div className="lg:col-span-7 bg-cosmos/40 backdrop-blur-sm border border-stardust/40 rounded-[28px] p-8 md:p-12 relative animate-in slide-in-from-right duration-500">
          
          {isSuccess ? (
            /* SUCCESS STATE PANEL */
            <div className="w-full text-center py-20 animate-in zoom-in-95 duration-500 flex flex-col items-center select-none">
              <div className="w-16 h-16 rounded-full bg-aurora/10 border border-aurora flex items-center justify-center text-aurora mb-6 animate-bounce">
                <Sparkles className="w-8 h-8" />
              </div>
              <h2 className="text-3xl font-display font-medium text-white">
                Transmission Dispatched!
              </h2>
              <p className="text-sm text-silver/80 font-ui mt-3 max-w-sm mx-auto leading-relaxed">
                Thank you, <span className="text-eclipse font-semibold">{formData.name}</span>. Your details have safely bypassed atmospheric interference. Our observatory crew will reply within 24 hours.
              </p>
              <button
                onClick={() => {
                  setIsSuccess(false);
                  setFormData({ name: "", email: "", subject: "general", message: "" });
                }}
                className="btn-primary mt-8"
              >
                Send Another Transmission
              </button>
            </div>
          ) : (
            /* FORM PANEL */
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Name */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="name" className="font-mono text-[10px] uppercase tracking-wider text-silver/80">
                    YOUR FULL NAME
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    required
                    value={formData.name}
                    onChange={handleInputChange}
                    className="w-full h-11 bg-void text-white font-ui border border-stardust/60 rounded-full px-5 focus:outline-none focus:border-eclipse focus:ring-1 focus:ring-eclipse/50 text-[14px] transition-all"
                  />
                </div>

                {/* Email */}
                <div className="flex flex-col gap-2">
                  <label htmlFor="email" className="font-mono text-[10px] uppercase tracking-wider text-silver/80">
                    EMAIL ADDRESS
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    className="w-full h-11 bg-void text-white font-ui border border-stardust/60 rounded-full px-5 focus:outline-none focus:border-eclipse focus:ring-1 focus:ring-eclipse/50 text-[14px] transition-all"
                  />
                </div>
              </div>

              {/* Subject Dropdown */}
              <div className="flex flex-col gap-2 relative" ref={dropdownRef}>
                <label className="font-mono text-[10px] uppercase tracking-wider text-silver/80 select-none">
                  TRANSMISSION SUBJECT
                </label>
                
                <button
                  type="button"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                  className={`w-full h-11 bg-void text-white font-ui border border-stardust/60 rounded-full px-5 flex items-center justify-between focus:outline-none focus:border-eclipse focus:ring-1 focus:ring-eclipse/50 text-[14px] transition-all cursor-pointer select-none ${
                    isDropdownOpen ? "border-eclipse ring-1 ring-eclipse/50" : ""
                  }`}
                >
                  <span className="text-white">{dropdownOptions.find(opt => opt.value === formData.subject)?.label || "Select Subject"}</span>
                  <ChevronDown className={`w-4 h-4 text-silver transition-transform duration-300 ${isDropdownOpen ? "rotate-180 text-eclipse" : ""}`} />
                </button>

                {isDropdownOpen && (
                  <div className="absolute top-[calc(100%+6px)] left-0 w-full bg-[#0B0F2B] border border-[#2C3E91] rounded-2xl py-2 shadow-2xl shadow-black/90 z-50 animate-in fade-in zoom-in-95 duration-200 backdrop-blur-md">
                    {dropdownOptions.map((opt) => (
                      <button
                        key={opt.value}
                        type="button"
                        onClick={() => handleSubjectSelect(opt.value)}
                        className={`w-full text-left px-5 py-3 hover:bg-[#121A4A] text-[14px] transition-all font-ui cursor-pointer flex items-center justify-between ${
                          opt.value === formData.subject
                            ? "text-eclipse bg-[#2C3E91]/30 font-medium"
                            : "text-silver hover:text-white"
                        }`}
                      >
                        <span>{opt.label}</span>
                        {opt.value === formData.subject && (
                          <div className="w-1.5 h-1.5 rounded-full bg-eclipse animate-pulse" />
                        )}
                      </button>
                    ))}
                  </div>
                )}
              </div>

              {/* Message */}
              <div className="flex flex-col gap-2">
                <label htmlFor="message" className="font-mono text-[10px] uppercase tracking-wider text-silver/80">
                  MESSAGE TRANSMISSION CONTENTS
                </label>
                <textarea
                  id="message"
                  name="message"
                  required
                  rows={5}
                  value={formData.message}
                  onChange={handleInputChange}
                  className="w-full bg-void text-white font-ui border border-stardust/60 rounded-[20px] p-5 focus:outline-none focus:border-eclipse focus:ring-1 focus:ring-eclipse/50 text-[14px] transition-all resize-none"
                />
              </div>

              {/* Submit CTA */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="btn-primary w-full h-12 rounded-full mt-4 select-none shrink-0"
              >
                {isSubmitting ? (
                  /* Loading Spinner */
                  <div className="flex items-center justify-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Broadcasting Signal...</span>
                  </div>
                ) : (
                  <>
                    <Send className="w-4 h-4" />
                    <span>Transmit Space Signal</span>
                  </>
                )}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
