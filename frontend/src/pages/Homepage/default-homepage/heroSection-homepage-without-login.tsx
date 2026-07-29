import React from 'react';
import { Trophy, Compass } from 'lucide-react';

interface HeroProps {
  bgImageSrc?: string;
  onPrimaryClick?: () => void;
  onSecondaryClick?: () => void;
}

export const HeroSection: React.FC<HeroProps> = ({
  bgImageSrc = '/homepage/burriram_united.png',
  onPrimaryClick,
  onSecondaryClick,
}) => {
  return (
    <section 
      className="w-full min-h-[calc(100vh-5rem)] relative flex flex-col justify-center items-end text-right p-6 sm:p-12 lg:p-16 overflow-hidden border-b border-[#EA580C]/20 group"
      aria-label="Hero Section"
    >
      {/* Background Image Layer */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat transition-transform duration-1000 ease-out transform scale-100 group-hover:scale-105"
        style={{ backgroundImage: `url('${bgImageSrc}')` }}
        aria-hidden="true"
      />

      {/* Overlay */}
      <div 
        className="absolute inset-0 bg-gradient-to-t from-[#F59E0B]/50 via-[#D97706]/35 to-[#B45309]/30 mix-blend-multiply" 
        aria-hidden="true"
      />

      {/* Vignette */}
      <div 
        className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,rgba(0,0,0,0.45)_100%)] pointer-events-none" 
        aria-hidden="true"
      />

      {/* Content Container - Pushed to the Right */}
      <div className="relative z-10 max-w-2xl ml-auto flex flex-col items-end animate-fade-in-up space-y-6 sm:space-y-8">
        
        {/* Main Display Heading */}
        <h1 className="text-3xl sm:text-5xl md:text-6xl lg:text-7xl font-black tracking-tight text-black leading-[1.1] drop-shadow-sm font-sans uppercase text-right">
          Elite Esports.{' '}
          <span className="inline-block text-black underline decoration-[#B45309]/60 underline-offset-8">
            Endless Glory.
          </span>
        </h1>

        {/* High Contrast Description Box */}
        <p className="text-base sm:text-lg md:text-xl font-bold text-white leading-relaxed sm:leading-loose text-right max-w-xl px-6 py-5 rounded-2xl bg-black/40 backdrop-blur-md border border-[#D97706]/30 shadow-2xl drop-shadow-[0_2px_4px_rgba(0,0,0,0.9)]">
          Welcome to ArenaForage, where competitive gaming meets professional tournament hosting. Whether you're a rising player or an experienced squad, our Free Fire and PUBG tournaments deliver fair competition, seamless organization, exciting rewards, and the thrill of true esports. Enter the arena, prove your skill, and forge your legacy.
        </p>

        {/* CTA Button Group aligned to the Right */}
        <div className="flex flex-col sm:flex-row items-center justify-end gap-4 sm:gap-6 w-full sm:w-auto pt-2">
          <a
            href="/register"
            onClick={(e) => {
              if (onPrimaryClick) {
                e.preventDefault();
                onPrimaryClick();
              }
            }}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl bg-[#D97706] hover:bg-[#B45309] text-black font-extrabold text-base sm:text-lg tracking-wide shadow-lg hover:shadow-xl hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-[#D97706]/50 cursor-pointer"
          >
            <Trophy className="w-5 h-5 text-black stroke-[2.5]" aria-hidden="true" />
            <span>Join Tournament</span>
          </a>

          <a
            href="/tournaments"
            onClick={(e) => {
              if (onSecondaryClick) {
                e.preventDefault();
                onSecondaryClick();
              }
            }}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl border-2 border-[#D97706] bg-black/10 hover:bg-[#D97706]/20 backdrop-blur-sm text-black font-bold text-base sm:text-lg tracking-wide hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-[#D97706]/50 cursor-pointer"
          >
            <Compass className="w-5 h-5 text-sky-600 stroke-[2.5]" aria-hidden="true" />
            <span>Explore Events</span>
          </a>
        </div>

      </div>
    </section>
  );
};

export default HeroSection;