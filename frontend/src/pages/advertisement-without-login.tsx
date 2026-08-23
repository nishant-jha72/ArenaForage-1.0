import React, { useState } from 'react';
import { ShieldCheck, Zap, Globe, Info, ChevronDown, ArrowRight, Layers } from 'lucide-react';

// ==========================================
// 1. Types & Interfaces
// ==========================================

export interface PromoCardData {
  id: string;
  icon: React.ElementType;
  heading: string;
  description: string;
  badges?: string[];
  expandableContent?: string;
}

export interface PromoSectionTheme {
  accentColor: string;       // Primary accent (e.g., #D97706 or custom hex)
  accentHover: string;       // Darker accent state
  borderAccent: string;      // Border highlights
  badgeBg: string;           // Badge fill
  badgeText: string;         // Badge text
}

export interface PromoSectionProps {
  theme?: Partial<PromoSectionTheme>;
  onJoinClick?: () => void;
  onHostClick?: () => void;
  className?: string;
}

// ==========================================
// 2. Default Configuration & Theme
// ==========================================

const DEFAULT_THEME: PromoSectionTheme = {
  accentColor: '#D97706',
  accentHover: '#B45309',
  borderAccent: 'rgba(217, 119, 6, 0.3)',
  badgeBg: 'rgba(217, 119, 6, 0.15)',
  badgeText: '#F59E0B',
};

const PROMO_CARDS_DATA: PromoCardData[] = [
  {
    id: 'trust-card',
    icon: ShieldCheck,
    heading: 'Trust',
    description: '100% Fair Environment. No Hackers Allowed.',
    expandableContent:
      'If a hacker is found during a match, the complete match will be rescheduled, or all participant entry amounts will be fully refunded.',
  },
  {
    id: 'payments-card',
    icon: Zap,
    heading: 'Faster Payments',
    description:
      'Payments are processed immediately after official match score validation, ensuring quick and reliable prize distribution.',
  },
  {
    id: 'exposure-card',
    icon: Globe,
    heading: 'Global Exposure',
    description: "Connect and compete with India's top esports talent.",
    badges: ['TG', 'S8UL', 'GG'],
  },
];

// ==========================================
// 3. Main Component
// ==========================================

export const PromoSection: React.FC<PromoSectionProps> = ({
  theme = {},
  onJoinClick,
  onHostClick,
  className = '',
}) => {
  const activeTheme = { ...DEFAULT_THEME, ...theme };
  const [isTrustExpanded, setIsTrustExpanded] = useState(false);

  return (
    <section
      className={`w-full py-12 sm:py-16 lg:py-20 bg-[#0A0A0C] border-y border-white/10 relative overflow-hidden ${className}`}
      aria-label="Platform Advantages and Features"
    >
      {/* Background Decorative Ambient Glows */}
      <div
        className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[500px] rounded-full blur-[140px] pointer-events-none opacity-10 transition-all duration-700"
        style={{ backgroundColor: activeTheme.accentColor }}
        aria-hidden="true"
      />
      <div
        className="absolute bottom-0 right-1/4 w-[400px] h-[400px] rounded-full blur-[120px] pointer-events-none opacity-10 transition-all duration-700"
        style={{ backgroundColor: activeTheme.accentColor }}
        aria-hidden="true"
      />

      {/* Full-width responsive container */}
      <div className="w-full max-w-[1400px] mx-auto px-4 sm:px-6 lg:px-12 relative z-10">
        
        {/* Section Sub-heading Header */}
        <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14 space-y-3">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
            <Layers className="w-4 h-4" style={{ color: activeTheme.accentColor }} aria-hidden="true" />
            <span className="text-xs sm:text-sm font-extrabold uppercase tracking-widest text-neutral-300">
              Why ArenaForage
            </span>
          </div>
          <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white tracking-tight uppercase leading-tight">
            Built For Serious Competitors
          </h2>
          <p className="text-sm sm:text-base text-neutral-400 font-medium">
            Experience peak tournament organization with instant payouts, strict anti-cheat policies, and competitive community recognition.
          </p>
        </div>

        {/* 3-Card Grid Layout (Responsive: 1 col on mobile, 3 cols on desktop) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 items-start mb-12 lg:mb-16">
          {PROMO_CARDS_DATA.map((card) => {
            const IconComponent = card.icon;
            const isTrustCard = card.id === 'trust-card';

            return (
              <div
                key={card.id}
                className="group relative w-full h-full rounded-2xl bg-[#121215]/80 hover:bg-[#16161A] border transition-all duration-300 shadow-xl hover:shadow-2xl hover:-translate-y-1 p-6 sm:p-8 flex flex-col justify-between backdrop-blur-md"
                style={{ borderColor: activeTheme.borderAccent }}
              >
                <div>
                  {/* Card Header & Icon */}
                  <div className="flex items-center justify-between mb-5">
                    <div
                      className="p-3.5 rounded-xl border transition-colors duration-300 shadow-inner"
                      style={{
                        backgroundColor: `${activeTheme.accentColor}1A`,
                        borderColor: activeTheme.borderAccent,
                      }}
                    >
                      <IconComponent
                        className="w-7 h-7 transition-transform duration-300 group-hover:scale-110"
                        style={{ color: activeTheme.accentColor }}
                        aria-hidden="true"
                      />
                    </div>

                    {/* Interactive Info Toggle for Trust Card */}
                    {isTrustCard && card.expandableContent && (
                      <button
                        onClick={() => setIsTrustExpanded((prev) => !prev)}
                        aria-expanded={isTrustExpanded}
                        aria-controls="trust-card-expandable"
                        aria-label="Toggle fair play refund policy details"
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-white/10 text-xs font-bold text-neutral-300 hover:text-white transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-amber-500/50"
                      >
                        <Info className="w-4 h-4" style={{ color: activeTheme.accentColor }} aria-hidden="true" />
                        <span>Details</span>
                        <ChevronDown
                          className={`w-3.5 h-3.5 transition-transform duration-300 ${
                            isTrustExpanded ? 'rotate-180' : 'rotate-0'
                          }`}
                        />
                      </button>
                    )}
                  </div>

                  {/* Card Title */}
                  <h3 className="text-xl sm:text-2xl font-black text-white tracking-tight uppercase mb-3">
                    {card.heading}
                  </h3>

                  {/* Base Description */}
                  <p className="text-sm sm:text-base text-neutral-300 font-medium leading-relaxed mb-4">
                    {card.description}
                  </p>

                  {/* Community Badges (For Global Exposure Card) */}
                  {card.badges && card.badges.length > 0 && (
                    <div className="flex flex-wrap items-center gap-2 pt-2">
                      <span className="text-xs font-bold uppercase tracking-wider text-neutral-400 mr-1">
                        Featured Communities:
                      </span>
                      {card.badges.map((badge) => (
                        <span
                          key={badge}
                          className="px-3 py-1 rounded-md text-xs font-black tracking-wider uppercase border shadow-sm transition-transform hover:scale-105"
                          style={{
                            backgroundColor: activeTheme.badgeBg,
                            color: activeTheme.badgeText,
                            borderColor: activeTheme.borderAccent,
                          }}
                        >
                          {badge}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Smooth Accordion Expansion (Trust Card Detail) */}
                {isTrustCard && card.expandableContent && (
                  <div
                    id="trust-card-expandable"
                    className={`grid transition-all duration-300 ease-in-out overflow-hidden ${
                      isTrustExpanded ? 'grid-rows-[1fr] opacity-100 mt-4 pt-4 border-t border-white/10' : 'grid-rows-[0fr] opacity-0'
                    }`}
                  >
                    <div className="overflow-hidden">
                      <p className="text-xs sm:text-sm text-neutral-300 leading-relaxed font-semibold bg-black/30 p-3.5 rounded-xl border border-white/5">
                        <span className="text-amber-400 font-bold block mb-1">🛡️ Anti-Cheat Guarantee:</span>
                        {card.expandableContent}
                      </p>
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Dedicated Call-To-Action (CTA) Area */}
        <div className="w-full pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6">
          
          {/* Primary CTA Button */}
          <a
            href="/register"
            onClick={(e) => {
              if (onJoinClick) {
                e.preventDefault();
                onJoinClick();
              }
            }}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl font-extrabold text-base sm:text-lg text-black tracking-wide shadow-xl hover:shadow-2xl hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-amber-500/50 cursor-pointer"
            style={{ backgroundColor: activeTheme.accentColor }}
          >
            <span>Join Now</span>
            <ArrowRight className="w-5 h-5 stroke-[2.5]" aria-hidden="true" />
          </a>

          {/* Secondary CTA Button */}
          <a
            href="#"
            onClick={(e) => {
              if (onHostClick) {
                e.preventDefault();
                onHostClick();
              }
            }}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-8 py-4 rounded-xl border-2 font-bold text-base sm:text-lg text-white bg-white/5 hover:bg-white/10 backdrop-blur-sm hover:-translate-y-0.5 active:translate-y-0 transition-all duration-300 focus:outline-none focus:ring-4 focus:ring-amber-500/50 cursor-pointer"
            style={{ borderColor: activeTheme.accentColor }}
          >
            <span>Host a Tournament</span>
          </a>

        </div>

      </div>
    </section>
  );
};

export default PromoSection;