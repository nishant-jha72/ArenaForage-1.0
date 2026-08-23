import { useMemo, useState } from 'react'
import { SearchX } from 'lucide-react'
import { useAllTournaments } from '../../hooks/useAllTournaments'
import TournamentAdCard from './TournamentAdCard'
import TournamentFilters, { type TournamentFilterState } from './TournamentFilter'
import { tournamentDialogue as d } from '../../theme/tournament.dialogue'

const DEFAULT_FILTERS: TournamentFilterState = {
  search: '',
  game: 'All',
  format: 'All',
  status: 'All',
}

export default function TournamentBrowseSection() {
  const { tournaments, isLoading, error } = useAllTournaments()
  const [filters, setFilters] = useState<TournamentFilterState>(DEFAULT_FILTERS)

  const filtered = useMemo(() => {
    const query = filters.search.trim().toLowerCase()
    return tournaments.filter((t) => {
      const matchesSearch = query.length === 0 || t.title.toLowerCase().includes(query)
      const matchesGame = filters.game === 'All' || t.game === filters.game
      const matchesFormat = filters.format === 'All' || t.format === filters.format
      const matchesStatus = filters.status === 'All' || t.status === filters.status
      return matchesSearch && matchesGame && matchesFormat && matchesStatus
    })
  }, [tournaments, filters])

  return (
    <section className={d.page.shell}>
      <div className={d.layout.sectionHeader}>
        <div>
          <h2 className={d.page.sectionTitle}>Browse tournaments</h2>
          <p className={d.page.sectionSubtitle}>
            {tournaments.length} tournaments currently listed across Free Fire &amp; PUBG.
          </p>
        </div>
      </div>

      <div className="mb-6">
        <TournamentFilters filters={filters} onChange={setFilters} />
      </div>

      {isLoading && (
        <div className={d.layout.cardGrid}>
          {Array.from({ length: 6 }).map((_, i) => (
            <div key={i} className={d.surface.skeleton} />
          ))}
        </div>
      )}

      {!isLoading && error && <p className={`${d.surface.muted} ${d.type.emphasis}`}>{error}</p>}

      {!isLoading && !error && filtered.length === 0 && (
        <div className={`flex flex-col items-center gap-2 ${d.surface.glass}`}>
          <SearchX size={28} className={d.empty.icon} />
          <p className={d.empty.title}>No tournaments match your search or filters.</p>
          <button onClick={() => setFilters(DEFAULT_FILTERS)} className={`mt-1 ${d.cta.textLink}`}>
            Clear filters
          </button>
        </div>
      )}

      {!isLoading && !error && filtered.length > 0 && (
        <div className={d.layout.cardGrid}>
          {filtered.map((t) => (
            <TournamentAdCard key={t.id} ad={t} />
          ))}
        </div>
      )}
    </section>
  )
}
