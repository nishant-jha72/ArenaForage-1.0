import { Search } from 'lucide-react'
import type { GameTitle, TournamentFormat, TournamentStatus } from '../../types/tournament'
import { tournamentDialogue as d } from '../../theme/tournament.dialogue'

export interface TournamentFilterState {
  search: string
  game: GameTitle | 'All'
  format: TournamentFormat | 'All'
  status: TournamentStatus | 'All'
}

interface Props {
  filters: TournamentFilterState
  onChange: (filters: TournamentFilterState) => void
}

export default function TournamentFilters({ filters, onChange }: Props) {
  return (
    <div className={d.layout.filterBar}>
      <div className="relative flex-1">
        <Search
          size={16}
          className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink-700/50 dark:text-slate-500"
        />
        <input
          type="text"
          value={filters.search}
          onChange={(e) => onChange({ ...filters, search: e.target.value })}
          placeholder="Search tournaments…"
          className={d.form.input}
        />
      </div>

      <div className="flex gap-3">
        <select
          value={filters.game}
          onChange={(e) => onChange({ ...filters, game: e.target.value as TournamentFilterState['game'] })}
          className={d.form.select}
        >
          <option value="All">All games</option>
          <option value="FreeFire">Free Fire</option>
          <option value="PUBG">PUBG</option>
        </select>

        <select
          value={filters.format}
          onChange={(e) =>
            onChange({ ...filters, format: e.target.value as TournamentFilterState['format'] })
          }
          className={d.form.select}
        >
          <option value="All">All formats</option>
          <option value="Solo">Solo</option>
          <option value="Duo">Duo</option>
          <option value="Squad">Squad</option>
        </select>

        <select
          value={filters.status}
          onChange={(e) =>
            onChange({ ...filters, status: e.target.value as TournamentFilterState['status'] })
          }
          className={`hidden sm:block ${d.form.select}`}
        >
          <option value="All">All statuses</option>
          {(Object.keys(d.status) as TournamentStatus[]).map((value) => (
            <option key={value} value={value}>
              {d.status[value].filterLabel}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}
