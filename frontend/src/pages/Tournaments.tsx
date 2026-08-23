import { useTournamentAds } from '../hooks/useTournamentAds'
import TournamentAdCard from '../components/tournament/TournamentAdCard'
import { tournamentDialogue as d } from '../theme/tournament.dialogue'

export default function Tournaments() {
  const { ads, isLoading, error } = useTournamentAds()

  return (
    <section className={d.page.shell}>
      <div className={d.page.header}>
        <h1 className={d.page.title}>Tournaments</h1>
        <p className={d.page.subtitle}>
          Every live, upcoming, and open-registration bracket across FreeFire and PUBG.
        </p>
      </div>

      {isLoading && (
        <div className={d.layout.cardGrid}>
          {[0, 1, 2].map((i) => (
            <div key={i} className={d.surface.skeleton} />
          ))}
        </div>
      )}

      {!isLoading && error && <p className={`${d.surface.muted} ${d.type.emphasis}`}>{error}</p>}

      {!isLoading && !error && (
        <div className={d.layout.cardGrid}>
          {ads.map((ad) => (
            <TournamentAdCard key={ad.id} ad={ad} />
          ))}
        </div>
      )}
    </section>
  )
}
