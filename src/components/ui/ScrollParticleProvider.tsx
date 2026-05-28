import React, { createContext, useContext, useState, useMemo } from 'react';
import { EngineOptions } from './ParticleEngine';

export interface ScrollParticleSettings extends EngineOptions {
  enabled: boolean;
  density: 'performance' | 'balanced' | 'cinematic';
}

interface ScrollParticleContextType {
  settings: ScrollParticleSettings;
  updateSettings: (newSettings: Partial<ScrollParticleSettings>) => void;
  activeCount: number;
  registerActiveInstance: (id: string) => void;
  unregisterActiveInstance: (id: string) => void;
}

const ScrollParticleContext = createContext<ScrollParticleContextType | undefined>(undefined);

export const useScrollParticles = () => {
  const context = useContext(ScrollParticleContext);
  if (!context) {
    throw new Error('useScrollParticles must be used within a ScrollParticleProvider');
  }
  return context;
};

export const ScrollParticleProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [settings, setSettings] = useState<ScrollParticleSettings>({
    enabled: true,
    density: 'balanced',
    maxParticles: 3500,
    particleSize: 2.2,
    springStrength: 0.08,
    damping: 0.86,
    jitterStrength: 0.35,
    flowStrength: 0.15
  });

  const [activeInstances, setActiveInstances] = useState<Set<string>>(new Set());

  const updateSettings = (newSettings: Partial<ScrollParticleSettings>) => {
    setSettings((prev) => {
      const merged = { ...prev, ...newSettings };
      
      // Sync numerical defaults based on density modes
      if (newSettings.density) {
        if (newSettings.density === 'performance') {
          merged.maxParticles = 2000;
          merged.particleSize = 2.5;
          merged.jitterStrength = 0.2;
        } else if (newSettings.density === 'cinematic') {
          merged.maxParticles = 5000;
          merged.particleSize = 1.8;
          merged.jitterStrength = 0.5;
        } else { // balanced
          merged.maxParticles = 3500;
          merged.particleSize = 2.2;
          merged.jitterStrength = 0.35;
        }
      }

      return merged;
    });
  };

  const registerActiveInstance = (id: string) => {
    setActiveInstances((prev) => {
      const next = new Set(prev);
      next.add(id);
      return next;
    });
  };

  const unregisterActiveInstance = (id: string) => {
    setActiveInstances((prev) => {
      const next = new Set(prev);
      next.delete(id);
      return next;
    });
  };

  const value = useMemo(
    () => ({
      settings,
      updateSettings,
      activeCount: activeInstances.size,
      registerActiveInstance,
      unregisterActiveInstance
    }),
    [settings, activeInstances]
  );

  return (
    <ScrollParticleContext.Provider value={value}>
      {children}
    </ScrollParticleContext.Provider>
  );
};
