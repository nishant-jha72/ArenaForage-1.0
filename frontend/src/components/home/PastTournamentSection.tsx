import { Trophy, Crosshair, Medal, Gamepad2 } from 'lucide-react'
import { usePastTournaments } from '../../hooks/usePastTournaments'
import { tournamentDialogue as d } from '../../theme/tournament.dialogue'

function ordinal(n: number): string {
  const s = ['th', 'st', 'nd', 'rd']
  const v = n % 100
  return `${n}${s[(v - 20) % 10] ?? s[v] ?? s[0]}`
}

export default function PastTournamentsSection() {
  const { history, isLoading, error } = usePastTournaments()

  return (
    <section className={d.page.shell}>
      <h2 className={d.page.sectionTitle}>Your past tournaments</h2>
      <p className={d.page.sectionSubtitle}>
        A record of every match you've competed in on Arena Forage.
      </p>

      {isLoading && (
        <div className="mt-6 space-y-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className={d.surface.skeletonRow} />
          ))}
        </div>
      )}

      {!isLoading && error && (
        <p className={`mt-6 ${d.surface.muted} ${d.type.emphasis}`}>{error}</p>
      )}

      {!isLoading && !error && history.length === 0 && (
        <div className={`mt-6 flex flex-col items-center gap-2 ${d.surface.glass}`}>
          <Gamepad2 size={28} className={d.empty.icon} />
          <p className={d.empty.title}>You havenot played any game yet</p>
        </div>
      )}

      {!isLoading && !error && history.length > 0 && (
        <div className="mt-6 space-y-3">
          {history.map((result) => (
            <div
              key={result.id}
              className={`flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between ${d.surface.row}`}
            >
              <div>
                <div className="flex items-center gap-2">
                  <span className={d.gameChip}>{result.game}</span>
                  <h3 className={d.type.rowTitle}>{result.title}</h3>
                </div>
                <p className={`mt-1 ${d.type.meta}`}>{result.date}</p>
              </div>

              <div className="flex items-center gap-5 text-sm">
                <span className={`flex items-center gap-1.5 ${d.type.emphasis}`}>
                  <Medal size={15} className={d.type.icon} />
                  {ordinal(result.placement)} place
                </span>
                <span className={`flex items-center gap-1.5 ${d.type.body}`}>
                  <Crosshair size={15} />
                  {result.kills} kills
                </span>
                <span className={`flex items-center gap-1.5 ${d.type.emphasis}`}>
                  <Trophy size={15} className={d.type.icon} />
                  {result.prizeWon}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}
