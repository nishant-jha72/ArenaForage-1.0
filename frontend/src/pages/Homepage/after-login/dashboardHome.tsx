import { useAuth } from '../../../context/AuthContext'
import PromoCarousel from '../../../components/PromoCarousel'
import TournamentBrowseSection from '../../../components/TournamentBrowseSection'
import HostSection from '../../../components/HostSection'
import PastTournamentsSection from '../../../components/PastTournamentSection'

export default function DashboardHome() {
  const { user } = useAuth()

  return (
    <>
      <section className="w-full bg-white dark:bg-ink-900 pt-16 sm:pt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
          <h1 className="font-display text-2xl font-bold text-ink-900 sm:text-3xl dark:text-white">
            Welcome back{user ? `, ${user.username}` : ''}
          </h1>
          <p className="mt-1 text-sm text-ink-700 dark:text-slate-400">
            Here's what's happening across Free Fire &amp; PUBG right now.
          </p>
        </div>
        <div className="mt-6 w-full overflow-hidden">
          <PromoCarousel />
        </div>
      </section>
      <TournamentBrowseSection />
      <HostSection />
      <PastTournamentsSection />
    </>
  )
}