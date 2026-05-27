import React, { useState, useEffect, useRef } from "react";
import { Play, Pause, Volume2, Sparkles, Compass } from "lucide-react";

export const CosmicSpacePlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [frequencyMode, setFrequencyMode] = useState<"528" | "432">("528");
  const [volume, setVolume] = useState(0.25);
  const [isExpanded, setIsExpanded] = useState(false);

  // Web Audio Refs
  const audioCtxRef = useRef<AudioContext | null>(null);
  const gainNodeRef = useRef<GainNode | null>(null);
  const filterNodeRef = useRef<BiquadFilterNode | null>(null);
  
  // Oscillators
  const osc1Ref = useRef<OscillatorNode | null>(null);
  const osc2Ref = useRef<OscillatorNode | null>(null);
  const subOscRef = useRef<OscillatorNode | null>(null);

  // LFO for volume swelling
  const lfoRef = useRef<OscillatorNode | null>(null);
  const lfoGainRef = useRef<GainNode | null>(null);

  // Initialize and play synthesized Space ambient drone
  const startSoundscape = () => {
    try {
      // Create Audio Context if not exists
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (!audioCtxRef.current) {
        audioCtxRef.current = new AudioContextClass();
      }

      const ctx = audioCtxRef.current;
      
      // Resume if suspended (browser security autostart policy)
      if (ctx.state === "suspended") {
        ctx.resume();
      }

      // 1. MASTER GAIN
      const masterGain = ctx.createGain();
      masterGain.gain.setValueAtTime(volume, ctx.currentTime);
      masterGain.connect(ctx.destination);
      gainNodeRef.current = masterGain;

      // 2. BIQUAD LOWPASS FILTER (creates deep, warm, velvety space drone)
      const lowpassFilter = ctx.createBiquadFilter();
      lowpassFilter.type = "lowpass";
      lowpassFilter.frequency.setValueAtTime(320, ctx.currentTime);
      lowpassFilter.Q.setValueAtTime(1.5, ctx.currentTime);
      lowpassFilter.connect(masterGain);
      filterNodeRef.current = lowpassFilter;

      // 3. BASE FREQUENCIES
      const baseFreq = frequencyMode === "528" ? 528 : 432;

      // Oscillator 1 (Left Channel feel via detuning)
      const osc1 = ctx.createOscillator();
      osc1.type = "sine";
      osc1.frequency.setValueAtTime(baseFreq, ctx.currentTime);
      
      // Oscillator 2 (Beating binaural effect)
      const osc2 = ctx.createOscillator();
      osc2.type = "sine";
      osc2.frequency.setValueAtTime(baseFreq + 0.65, ctx.currentTime); // Beating rate of 0.65Hz

      // Sub-harmonic warm base (2 octaves below, triangle wave for gentle harmonics)
      const subOsc = ctx.createOscillator();
      subOsc.type = "triangle";
      subOsc.frequency.setValueAtTime(baseFreq / 4, ctx.currentTime); // 132Hz / 108Hz

      // 4. LOW-VOLUME MULTIPLIERS FOR COMFORT
      const osc1Gain = ctx.createGain();
      osc1Gain.gain.setValueAtTime(0.55, ctx.currentTime);
      
      const osc2Gain = ctx.createGain();
      osc2Gain.gain.setValueAtTime(0.45, ctx.currentTime);

      const subGain = ctx.createGain();
      subGain.gain.setValueAtTime(0.28, ctx.currentTime); // Deep warm sub rumble

      // Connect sources to their gains
      osc1.connect(osc1Gain);
      osc2.connect(osc2Gain);
      subOsc.connect(subGain);

      // Connect all gains to the filter
      osc1Gain.connect(lowpassFilter);
      osc2Gain.connect(lowpassFilter);
      subGain.connect(lowpassFilter);

      // 5. BREATHING LFO (Automated swell for organic volume waves)
      const lfo = ctx.createOscillator();
      lfo.frequency.setValueAtTime(0.08, ctx.currentTime); // Swells once every 12.5 seconds
      
      const lfoGain = ctx.createGain();
      lfoGain.gain.setValueAtTime(0.12, ctx.currentTime); // Swell amplitude
      
      lfo.connect(lfoGain);
      lfoGain.connect(masterGain.gain); // Modulate master gain

      // Start all sound generators
      osc1.start();
      osc2.start();
      subOsc.start();
      lfo.start();

      // Save refs
      osc1Ref.current = osc1;
      osc2Ref.current = osc2;
      subOscRef.current = subOsc;
      lfoRef.current = lfo;
      lfoGainRef.current = lfoGain;

      setIsPlaying(true);
    } catch (e) {
      console.error("Failed to start Web Audio Synthesizer:", e);
    }
  };

  // Stop synthesized soundscape
  const stopSoundscape = () => {
    try {
      osc1Ref.current?.stop();
      osc2Ref.current?.stop();
      subOscRef.current?.stop();
      lfoRef.current?.stop();

      osc1Ref.current = null;
      osc2Ref.current = null;
      subOscRef.current = null;
      lfoRef.current = null;
      lfoGainRef.current = null;
      gainNodeRef.current = null;
      filterNodeRef.current = null;

      setIsPlaying(false);
    } catch (e) {
      console.error("Failed to stop soundscape clean:", e);
    }
  };

  // Handle active volume changes
  useEffect(() => {
    if (gainNodeRef.current && audioCtxRef.current) {
      gainNodeRef.current.gain.linearRampToValueAtTime(volume, audioCtxRef.current.currentTime + 0.1);
    }
  }, [volume]);

  // Handle active frequency updates
  useEffect(() => {
    if (isPlaying) {
      // Smooth frequency shift ramp for organic transition
      const baseFreq = frequencyMode === "528" ? 528 : 432;
      const ctx = audioCtxRef.current;
      if (ctx) {
        osc1Ref.current?.frequency.exponentialRampToValueAtTime(baseFreq, ctx.currentTime + 1.2);
        osc2Ref.current?.frequency.exponentialRampToValueAtTime(baseFreq + 0.65, ctx.currentTime + 1.2);
        subOscRef.current?.frequency.exponentialRampToValueAtTime(baseFreq / 4, ctx.currentTime + 1.2);
      }
    }
  }, [frequencyMode, isPlaying]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopSoundscape();
      if (audioCtxRef.current) {
        audioCtxRef.current.close();
      }
    };
  }, []);

  const handleTogglePlay = () => {
    if (isPlaying) {
      stopSoundscape();
    } else {
      startSoundscape();
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 select-none">
      {/* Floating expanded controller panel */}
      {isExpanded ? (
        <div className="w-[320px] bg-cosmos/85 backdrop-blur-xl border border-stardust/60 rounded-[24px] p-6 shadow-2xl shadow-black/80 animate-in slide-in-from-bottom duration-300">
          <div className="flex items-center justify-between border-b border-stardust/40 pb-4 mb-4">
            <div className="flex items-center gap-2">
              <Compass className="w-5 h-5 text-eclipse rotate-[35deg]" />
              <div>
                <h3 className="font-display font-medium text-[16px] text-white">Space Sanctuary Player</h3>
                <p className="font-mono text-[9px] text-silver/60">CELESTIAL AMBIENT DRONE</p>
              </div>
            </div>
            <button
              onClick={() => setIsExpanded(false)}
              className="text-silver hover:text-white text-xs font-mono border border-stardust/40 rounded-full px-2 py-0.5"
            >
              HIDE
            </button>
          </div>

          {/* Space frequency details */}
          <div className="bg-void/40 border border-stardust/30 rounded-xl p-3 mb-4 text-center">
            <span className="font-mono text-[8px] uppercase text-eclipse tracking-widest font-bold">
              ACTIVE VIBRATION
            </span>
            <h4 className="font-display text-lg text-white mt-0.5">
              {frequencyMode === "528" ? "528Hz Solar Wind" : "432Hz Cosmic Resonance"}
            </h4>
            <p className="text-[10px] text-silver/80 mt-1 font-ui leading-relaxed">
              {frequencyMode === "528"
                ? "Solfeggio frequency associated with cellular harmony, deep meditation, and soothing background solar resonance."
                : "A natural frequency representing cosmic math, providing an atmospheric soundscape for deep space exploration."}
            </p>
          </div>

          {/* Main controls row */}
          <div className="flex items-center justify-between gap-4 mb-4">
            <button
              onClick={handleTogglePlay}
              className={`w-12 h-12 rounded-full flex items-center justify-center cursor-pointer transition-all ${
                isPlaying
                  ? "bg-eclipse text-black shadow-md shadow-eclipse/20 hover:scale-105"
                  : "bg-void border border-stardust/60 text-white hover:border-eclipse hover:scale-105"
              }`}
            >
              {isPlaying ? <Pause className="w-5 h-5 fill-current" /> : <Play className="w-5 h-5 fill-current translate-x-0.5" />}
            </button>

            {/* Frequency Selection */}
            <div className="flex bg-void border border-stardust/40 rounded-full p-0.5 flex-grow">
              <button
                onClick={() => setFrequencyMode("528")}
                className={`flex-1 py-1.5 rounded-full text-[10px] font-mono font-semibold transition-all ${
                  frequencyMode === "528"
                    ? "bg-eclipse/15 border border-eclipse/40 text-eclipse"
                    : "text-silver hover:text-white"
                }`}
              >
                528Hz
              </button>
              <button
                onClick={() => setFrequencyMode("432")}
                className={`flex-1 py-1.5 rounded-full text-[10px] font-mono font-semibold transition-all ${
                  frequencyMode === "432"
                    ? "bg-eclipse/15 border border-eclipse/40 text-eclipse"
                    : "text-silver hover:text-white"
                }`}
              >
                432Hz
              </button>
            </div>
          </div>

          {/* Volume Control */}
          <div className="flex items-center gap-3 bg-void/50 border border-stardust/30 rounded-xl p-3">
            <Volume2 className="w-4 h-4 text-silver" />
            <input
              type="range"
              min="0"
              max="0.5"
              step="0.01"
              value={volume}
              onChange={(e) => setVolume(parseFloat(e.target.value))}
              className="w-full accent-eclipse h-1 bg-stardust rounded-lg cursor-pointer"
            />
            <span className="font-mono text-[9px] text-silver/60 w-6 text-right">
              {Math.round(volume * 200)}%
            </span>
          </div>

          {/* Visualizer bars */}
          {isPlaying && (
            <div className="flex justify-center items-end gap-1 h-5 mt-4">
              {Array.from({ length: 18 }).map((_, idx) => {
                const animDelay = `${(idx * 0.13).toFixed(2)}s`;
                const animDuration = `${(0.8 + Math.random() * 0.7).toFixed(2)}s`;
                return (
                  <div
                    key={idx}
                    className="w-1 bg-eclipse rounded-full animate-pulse"
                    style={{
                      height: `${25 + Math.sin(idx) * 65}%`,
                      animationDelay: animDelay,
                      animationDuration: animDuration,
                      transformOrigin: "bottom center",
                    }}
                  />
                );
              })}
            </div>
          )}
        </div>
      ) : (
        /* Floating closed pill badge */
        <button
          onClick={() => setIsExpanded(true)}
          className="group relative flex items-center gap-3.5 bg-cosmos/85 backdrop-blur-md border border-stardust/60 rounded-full px-5 py-3 shadow-xl hover:shadow-2xl hover:border-eclipse hover:scale-105 active:scale-95 transition-all select-none cursor-pointer"
        >
          {/* Breathing outer aura when playing */}
          {isPlaying && (
            <span className="absolute -inset-0.5 rounded-full bg-gradient-to-r from-eclipse to-aurora blur opacity-30 animate-pulse" />
          )}

          {/* Sound bars micro indicator */}
          {isPlaying ? (
            <div className="flex items-end gap-0.5 h-3.5 w-4 relative z-10 shrink-0">
              <div className="w-[2px] bg-eclipse h-full animate-bounce" style={{ animationDelay: "0.1s" }} />
              <div className="w-[2px] bg-eclipse h-[60%] animate-bounce" style={{ animationDelay: "0.3s" }} />
              <div className="w-[2px] bg-eclipse h-[80%] animate-bounce" style={{ animationDelay: "0.5s" }} />
            </div>
          ) : (
            <div className="w-4 h-4 flex items-center justify-center relative z-10 shrink-0 text-silver group-hover:text-eclipse transition-colors">
              <Sparkles className="w-4 h-4 animate-spin-slow" />
            </div>
          )}

          <div className="relative z-10 text-left shrink-0">
            <span className="block font-display font-medium text-xs leading-none text-white group-hover:text-eclipse transition-colors">
              {isPlaying ? "Space Resonance Active" : "Cosmic Ambience"}
            </span>
            <span className="block font-mono text-[8px] leading-none text-silver/60 mt-1 uppercase tracking-widest">
              {isPlaying ? `${frequencyMode}Hz SOLFEGGIO` : "synthesize 528hz"}
            </span>
          </div>
        </button>
      )}
    </div>
  );
};

export default CosmicSpacePlayer;
