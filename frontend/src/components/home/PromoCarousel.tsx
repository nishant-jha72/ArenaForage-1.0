import { useEffect, useRef, useState, useMemo, useCallback } from "react";
import { NavLink } from "react-router-dom";
import {
  ChevronLeft,
  ChevronRight,
  Trophy,
  CalendarDays,
  ArrowRight,
  ShieldAlert,
  Sparkles,
} from "lucide-react";
import { useTournamentAds } from "../../hooks/useTournamentAds";

export interface AdItem {
  id: string | number;
  title: string;
  game: string;
  format: string;
  status?: "live" | "upcoming" | string;
  prizePool: string;
  date: string;
  slotsLeft?: number | string;
  accent?: string;
}

const SLIDE_DURATION = 5000;

const GAME_LOGOS: Record<string, string> = {
  "Free Fire": "/garena_freefire_logo.jpg",
  PUBG: "/pubg_logo.png",
  "PUBG Mobile": "/pubg_logo.png",
};

export default function PromoCarousel() {
  const { ads: apiAds, isLoading, error } = useTournamentAds();

  const ads: AdItem[] = useMemo(() => {
    return apiAds && apiAds.length > 0 ? apiAds : [];
  }, [apiAds]);

  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const goNext = useCallback(() => {
    if (ads.length <= 1) return;
    setActiveIndex((prev) => (prev + 1) % ads.length);
  }, [ads.length]);

  const goPrev = useCallback(() => {
    if (ads.length <= 1) return;
    setActiveIndex((prev) => (prev - 1 + ads.length) % ads.length);
  }, [ads.length]);

  const goTo = (index: number) => {
    setActiveIndex(index);
  };

  useEffect(() => {
    if (ads.length <= 1 || isPaused) {
      if (timerRef.current) clearInterval(timerRef.current);
      return;
    }

    timerRef.current = setInterval(() => {
      goNext();
    }, SLIDE_DURATION);

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [ads.length, isPaused, goNext]);

  const renderGameBrand = (gameName: string) => {
    const logoUrl = GAME_LOGOS[gameName];

    return (
      <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-black/60 border border-white/10 shadow-inner backdrop-blur-md">
        <span className="text-xs font-black uppercase tracking-wider text-white">
          {gameName}
        </span>
        {logoUrl && (
          <img
            src={logoUrl}
            alt={`${gameName} Logo`}
            className="h-4 w-4 rounded-full object-cover border border-white/20 shrink-0"
            loading="eager"
            onError={(e) => {
              (e.target as HTMLImageElement).style.display = "none";
            }}
          />
        )}
      </div>
    );
  };

  if (isLoading) {
    return (
      <div className="w-full h-64 sm:h-72 animate-pulse bg-[#0B0B0C] flex items-center justify-center">
        <div className="flex items-center gap-3 text-neutral-500 font-bold text-sm">
          <Sparkles className="w-5 h-5 animate-spin text-amber-500" />
          <span>Loading Tournaments...</span>
        </div>
      </div>
    );
  }

  if (error && ads.length === 0) {
    return (
      <div className="w-full flex h-64 sm:h-72 flex-col items-center justify-center gap-3 border-y border-white/10 bg-[#0B0B0C] p-6 text-center shadow-2xl">
        <ShieldAlert className="w-8 h-8 text-amber-500" />
        <p className="text-sm font-extrabold uppercase tracking-wider text-neutral-300">
          {error ?? "No tournaments available right now."}
        </p>
      </div>
    );
  }

  const active = ads[activeIndex] || ads[0];

  return (
    <section
      aria-label="Promotional Tournaments Carousel"
      className="w-full overflow-hidden"
    >
      <div
        className="group relative w-full overflow-hidden rounded-3xl bg-neutral-900/90 border border-white/10 shadow-2xl backdrop-blur-xl transition-all duration-300"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Background Ambient Glows */}
        <div
          className="absolute -top-24 -left-24 w-80 h-80 rounded-full bg-amber-500/10 blur-3xl pointer-events-none transform-gpu"
          aria-hidden="true"
        />
        <div
          className="absolute -bottom-24 -right-24 w-80 h-80 rounded-full bg-amber-500/5 blur-3xl pointer-events-none transform-gpu"
          aria-hidden="true"
        />

        {/* Inner Content Padding */}
        <div className="relative w-full min-h-[260px] sm:min-h-[290px] p-6 sm:p-10 lg:p-12 flex flex-col justify-between z-10">
          {/* Card Top Row */}
          <div className="flex flex-wrap items-center justify-between gap-3">
            <div className="flex flex-wrap items-center gap-2">
              {renderGameBrand(active.game)}

              <span className="px-3 py-1 rounded-full bg-white/5 border border-white/10 text-xs font-bold uppercase tracking-wider text-neutral-300 backdrop-blur-md">
                {active.format}
              </span>
            </div>

            {active.status === "live" && (
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-red-500/10 border border-red-500/30 backdrop-blur-md">
                <span className="h-2 w-2 animate-pulse rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.8)]" />
                <span className="text-xs font-black uppercase tracking-widest text-red-400">
                  LIVE NOW
                </span>
              </div>
            )}
          </div>

          {/* Card Content Body */}
          <div className="my-4 transition-all duration-500">
            <h3 className="max-w-3xl font-black text-2xl sm:text-3xl lg:text-4xl text-white tracking-tight uppercase leading-snug">
              {active.title}
            </h3>

            <div className="mt-4 flex flex-wrap items-center gap-4 sm:gap-6 text-xs sm:text-sm font-bold text-neutral-300">
              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10">
                <Trophy size={16} className="text-amber-500" />
                <span className="text-white">{active.prizePool}</span>
              </span>

              <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/5 border border-white/10">
                <CalendarDays size={16} className="text-amber-500" />
                <span>{active.date}</span>
              </span>

              {active.slotsLeft !== undefined && (
                <span className="text-xs font-extrabold uppercase tracking-wider text-amber-500 bg-amber-500/10 border border-amber-500/20 px-3 py-1.5 rounded-lg">
                  {active.slotsLeft} slots left
                </span>
              )}
            </div>
          </div>

          {/* Action CTA */}
          <div className="pt-2">
            <NavLink
              to={`/tournaments/${active.id}`}
              className="inline-flex items-center gap-2.5 rounded-xl bg-amber-500 px-6 py-3 text-xs sm:text-sm font-black uppercase tracking-wider text-black shadow-[0_0_20px_rgba(217,119,6,0.25)] transition-all duration-300 hover:bg-amber-400 hover:shadow-[0_0_25px_rgba(217,119,6,0.45)] hover:-translate-y-0.5 active:translate-y-0"
            >
              <span>Register Now</span>
              <ArrowRight size={16} className="stroke-[2.5]" />
            </NavLink>
          </div>
        </div>

        {/* Navigation Controls */}
        {ads.length > 1 && (
          <>
            <button
              onClick={goPrev}
              type="button"
              aria-label="Previous tournament"
              className="absolute left-4 top-1/2 -translate-y-1/2 z-20 flex h-11 w-11 items-center justify-center rounded-xl bg-black/60 border border-white/10 text-white opacity-0 backdrop-blur-md transition-all duration-300 hover:bg-amber-500 hover:text-black hover:border-amber-500 group-hover:opacity-100 focus-visible:opacity-100 cursor-pointer"
            >
              <ChevronLeft size={22} />
            </button>

            <button
              onClick={goNext}
              type="button"
              aria-label="Next tournament"
              className="absolute right-4 top-1/2 -translate-y-1/2 z-20 flex h-11 w-11 items-center justify-center rounded-xl bg-black/60 border border-white/10 text-white opacity-0 backdrop-blur-md transition-all duration-300 hover:bg-amber-500 hover:text-black hover:border-amber-500 group-hover:opacity-100 focus-visible:opacity-100 cursor-pointer"
            >
              <ChevronRight size={22} />
            </button>
          </>
        )}

        {/* Pagination Dots */}
        {ads.length > 1 && (
          <div className="absolute bottom-6 right-8 z-20 flex items-center gap-2">
            {ads.map((ad, i) => (
              <button
                key={ad.id}
                type="button"
                aria-label={`Show tournament ${i + 1}`}
                onClick={() => goTo(i)}
                className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${
                  i === activeIndex
                    ? "w-8 bg-amber-500 shadow-[0_0_8px_rgba(217,119,6,0.8)]"
                    : "w-2 bg-white/20 hover:bg-white/40"
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
