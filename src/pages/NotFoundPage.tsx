import React from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Moon } from "lucide-react";

export const NotFoundPage: React.FC = () => {
  return (
    <div className="w-full bg-transparent min-h-[80vh] flex flex-col items-center justify-center text-center px-6 select-none animate-in fade-in">
      <div className="relative w-28 h-28 flex items-center justify-center mb-6">
        <Moon className="w-20 h-20 text-eclipse rotate-12 absolute animate-pulse opacity-40" />
        <span className="font-mono text-5xl font-semibold text-white z-10">404</span>
      </div>

      <h1 className="text-3xl md:text-4xl font-display font-medium text-white tracking-wide">
        Astral Path Lost
      </h1>
      
      <p className="text-sm text-silver/60 font-ui mt-2 max-w-sm mx-auto leading-relaxed">
        The coordinates you entered have drifted out of our gallery's orbit. Journey back to safety.
      </p>

      <Link to="/" className="btn-primary mt-8 shrink-0">
        <ArrowLeft className="w-4 h-4" />
        Return to Home Orbit
      </Link>
    </div>
  );
};

export default NotFoundPage;
