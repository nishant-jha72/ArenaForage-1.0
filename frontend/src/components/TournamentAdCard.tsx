import { Trophy, Users, CalendarDays } from 'lucide-react'
import type { TournamentAd } from '../types/tournament'

const STATUS_LABEL: Record<TournamentAd['status'], string> = {
  live: 'LIVE NOW',
  'registration-open': 'REGISTRATION OPEN',
  upcoming: 'UPCOMING',
}

export default function TournamentAdCard({ ad }: { ad: TournamentAd }) {
  return (
    <div className="clip-panel relative overflow-hidden rounded-xl border border-ink-900/10 bg-white shadow-lg shadow-ink-900/5 dark:border-white/10 dark:bg-ink-800">
      <div className={`h-24 bg-gradient-to-br ${ad.accent} sm:h-28`}>
        <div className="flex h-full items-start justify-between p-4">
          <span className="rounded bg-ink-900/30 px-2 py-1 font-display text-xs font-bold uppercase tracking-widest text-white backdrop-blur-sm">
            {ad.game}
          </span>
          {ad.status === 'live' && (
            <span className="flex items-center gap-1.5 rounded bg-white/15 px-2 py-1 text-xs font-bold text-white backdrop-blur-sm">
              <span className="h-1.5 w-1.5 animate-pulse-live rounded-full bg-red-400" />
              {STATUS_LABEL[ad.status]}
            </span>
          )}
          {ad.status !== 'live' && (
            <span className="rounded bg-white/15 px-2 py-1 text-xs font-bold text-white backdrop-blur-sm">
              {STATUS_LABEL[ad.status]}
            </span>
          )}
        </div>
      </div>

      <div className="p-5">
        <h3 className="font-display text-lg font-bold leading-snug text-ink-900 dark:text-white">
          {ad.title}
        </h3>

        <div className="mt-4 grid grid-cols-3 gap-2 text-center">
          <div className="rounded-md bg-ink-900/[0.03] py-2 dark:bg-white/5">
            <Trophy size={14} className="mx-auto mb-1 text-brand-blue dark:text-brand-cyan" />
            <p className="text-xs font-semibold text-ink-900 dark:text-white">{ad.prizePool}</p>
          </div>
          <div className="rounded-md bg-ink-900/[0.03] py-2 dark:bg-white/5">
            <CalendarDays size={14} className="mx-auto mb-1 text-brand-blue dark:text-brand-cyan" />
            <p className="text-xs font-semibold text-ink-900 dark:text-white">{ad.date}</p>
          </div>
          <div className="rounded-md bg-ink-900/[0.03] py-2 dark:bg-white/5">
            <Users size={14} className="mx-auto mb-1 text-brand-blue dark:text-brand-cyan" />
            <p className="text-xs font-semibold text-ink-900 dark:text-white">
              {ad.slotsLeft} slots
            </p>
          </div>
        </div>

        <button className="mt-4 w-full rounded-md bg-brand-blue py-2.5 text-sm font-semibold text-white transition-colors hover:bg-brand-blue-hover dark:bg-brand-cyan dark:text-ink-900 dark:hover:bg-brand-cyan/80">
          Register Now
        </button>
      </div>
    </div>
  )
}
