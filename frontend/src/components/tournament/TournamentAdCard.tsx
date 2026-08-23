import { NavLink } from 'react-router-dom'
import { Trophy, Users, CalendarDays } from 'lucide-react'
import type { TournamentAd } from '../../types/tournament'
import { statusDialogue, tournamentDialogue as d } from '../../theme/tournament.dialogue'

export default function TournamentAdCard({ ad }: { ad: TournamentAd }) {
  const status = statusDialogue(ad.status)

  return (
    <div className={d.surface.panel}>
      <div className={`h-24 bg-gradient-to-br ${ad.accent} sm:h-28`}>
        <div className="flex h-full items-start justify-between p-4">
          <span className="flex items-center gap-1.5">
            <span className={d.gameBadge}>{ad.game}</span>
            <span className={d.formatBadge}>{ad.format}</span>
          </span>
          <span className={status.className}>
            {ad.status === 'live' && <span className={status.dot} />}
            {status.label}
          </span>
        </div>
      </div>

      <div className="p-5">
        <h3 className={d.type.cardTitle}>{ad.title}</h3>

        <div className={d.layout.metaGrid}>
          <div className={d.surface.metaCell}>
            <Trophy size={14} className={`mx-auto mb-1 ${d.type.icon}`} />
            <p className="text-xs font-semibold text-ink-900 dark:text-white">{ad.prizePool}</p>
          </div>
          <div className={d.surface.metaCell}>
            <CalendarDays size={14} className={`mx-auto mb-1 ${d.type.icon}`} />
            <p className="text-xs font-semibold text-ink-900 dark:text-white">{ad.date}</p>
          </div>
          <div className={d.surface.metaCell}>
            <Users size={14} className={`mx-auto mb-1 ${d.type.icon}`} />
            <p className="text-xs font-semibold text-ink-900 dark:text-white">
              {ad.slotsLeft} slots
            </p>
          </div>
        </div>

        <NavLink to={`/tournaments/${ad.id}`} className={`mt-4 ${d.cta.primary}`}>
          Register Now
        </NavLink>
      </div>
    </div>
  )
}
