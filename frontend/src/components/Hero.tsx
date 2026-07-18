import { useEffect, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { ArrowRight, Gamepad2 } from 'lucide-react'
import { useTournamentAds } from '../hooks/useTournamentAds'
import TournamentAdCard from './TournamentAdCard'

export default function Hero() {
  const { ads, isLoading, error } = useTournamentAds()
  const [activeIndex, setActiveIndex] = useState(0)

  // Rotate through featured tournament ads every 5s once loaded.
  useEffect(() => {
    if (ads.length === 0) return
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % ads.length)
    }, 5000)
    return () => clearInterval(interval)
  }, [ads.length])

  return (
    <section className="relative overflow-hidden bg-white dark:bg-ink-900">
      <div className="pointer-events-none absolute inset-0 bg-grid-light bg-grid dark:bg-grid-dark [mask-image:radial-gradient(ellipse_at_top,black,transparent_70%)]" />

      <div className="relative mx-auto grid max-w-7xl grid-cols-1 gap-10 px-4 pb-16 pt-10 sm:px-6 md:pt-16 lg:grid-cols-2 lg:gap-8 lg:px-8 lg:pb-24 lg:pt-20">
        {/* Left: context + CTA */}
        <div className="flex flex-col justify-center">
          <span className="mb-4 inline-flex w-fit items-center gap-2 rounded-full border border-brand-blue/20 bg-brand-blue/5 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-brand-blue dark:border-brand-cyan/20 dark:bg-brand-cyan/5 dark:text-brand-cyan">
            <Gamepad2 size={14} />
            FreeFire · PUBG Mobile
          </span>

          <h1 className="font-display text-4xl font-bold leading-tight text-ink-900 sm:text-5xl md:text-6xl dark:text-white">
            Where squads become <span className="text-brand-blue dark:text-brand-cyan">champions</span>
          </h1>

          <p className="mt-5 max-w-lg text-base leading-relaxed text-ink-700 sm:text-lg dark:text-slate-300">
            Arena Circuit runs competitive FreeFire and PUBG tournaments for every skill level —
            from weekend scrims to ranked regional finals. Register your squad, track live
            brackets, and get paid out the moment you win.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <NavLink
              to="/tournaments"
              className="flex items-center justify-center gap-2 rounded-md bg-brand-blue px-6 py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-blue-hover dark:bg-brand-cyan dark:text-ink-900 dark:hover:bg-brand-cyan/80"
            >
              Browse Tournaments
              <ArrowRight size={16} />
            </NavLink>
            <NavLink
              to="/host"
              className="flex items-center justify-center gap-2 rounded-md border border-ink-900/15 px-6 py-3 text-sm font-semibold text-ink-900 transition-colors hover:border-brand-blue hover:text-brand-blue dark:border-white/15 dark:text-white dark:hover:border-brand-cyan dark:hover:text-brand-cyan"
            >
              Host Your Own
            </NavLink>
          </div>

          <dl className="mt-10 grid grid-cols-3 gap-4 border-t border-ink-900/10 pt-6 dark:border-white/10">
            <div>
              <dt className="font-display text-2xl font-bold text-ink-900 dark:text-white">1,200+</dt>
              <dd className="text-xs text-ink-700 dark:text-slate-400">Squads registered</dd>
            </div>
            <div>
              <dt className="font-display text-2xl font-bold text-ink-900 dark:text-white">₹42L+</dt>
              <dd className="text-xs text-ink-700 dark:text-slate-400">Prize money paid</dd>
            </div>
            <div>
              <dt className="font-display text-2xl font-bold text-ink-900 dark:text-white">180+</dt>
              <dd className="text-xs text-ink-700 dark:text-slate-400">Tournaments hosted</dd>
            </div>
          </dl>
        </div>

        {/* Right: tournament ad, loaded from the database */}
        <div className="flex flex-col justify-center">
          {isLoading && (
            <div className="clip-panel h-80 animate-pulse rounded-xl border border-ink-900/10 bg-ink-900/5 dark:border-white/10 dark:bg-white/5" />
          )}

          {!isLoading && error && (
            <div className="clip-panel flex h-80 flex-col items-center justify-center gap-2 rounded-xl border border-ink-900/10 bg-ink-900/[0.02] p-6 text-center dark:border-white/10 dark:bg-white/5">
              <p className="text-sm font-semibold text-ink-900 dark:text-white">{error}</p>
            </div>
          )}

          {!isLoading && !error && ads.length > 0 && (
            <>
              <TournamentAdCard ad={ads[activeIndex]} />
              <div className="mt-4 flex justify-center gap-2">
                {ads.map((ad, i) => (
                  <button
                    key={ad.id}
                    aria-label={`Show tournament ${i + 1}`}
                    onClick={() => setActiveIndex(i)}
                    className={`h-1.5 rounded-full transition-all ${
                      i === activeIndex
                        ? 'w-6 bg-brand-blue dark:bg-brand-cyan'
                        : 'w-1.5 bg-ink-900/15 dark:bg-white/15'
                    }`}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </section>
  )
}
