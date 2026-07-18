import { useTournamentAds } from '../hooks/useTournamentAds'
import TournamentAdCard from '../components/TournamentAdCard'

export default function Tournaments() {
  const { ads, isLoading, error } = useTournamentAds()

  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="font-display text-3xl font-bold text-ink-900 sm:text-4xl dark:text-white">
          Tournaments
        </h1>
        <p className="mt-2 max-w-xl text-sm text-ink-700 dark:text-slate-400">
          Every live, upcoming, and open-registration bracket across FreeFire and PUBG.
        </p>
      </div>

      {isLoading && (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="clip-panel h-80 animate-pulse rounded-xl border border-ink-900/10 bg-ink-900/5 dark:border-white/10 dark:bg-white/5"
            />
          ))}
        </div>
      )}

      {!isLoading && error && (
        <p className="rounded-md border border-ink-900/10 bg-ink-900/[0.02] p-6 text-sm font-semibold text-ink-900 dark:border-white/10 dark:bg-white/5 dark:text-white">
          {error}
        </p>
      )}

      {!isLoading && !error && (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {ads.map((ad) => (
            <TournamentAdCard key={ad.id} ad={ad} />
          ))}
        </div>
      )}
    </section>
  )
}
