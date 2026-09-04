import DashboardStatsBar from "../components/dashboard/DashboardStatsBar";
import PromoCarousel from "../components/home/PromoCarousel";
import TournamentBrowseSection from "../components/tournament/TournamentBrowseSection";
import LeaderboardSection from "../components/dashboard/LeaderboardSection";
import HostSection from "../components/home/HostSection";
import PastTournamentsSection from "../components/home/PastTournamentSection";

export default function DashboardHome() {
  return (
    <div className="w-full min-h-[calc(100vh-5rem)] bg-neutral-950 text-white space-y-10 pb-16">
      {/* 1. Top Command Center Banner & Stats Bar */}
      <section className="w-full max-w-[1920px] mx-auto px-4 sm:px-8 lg:px-12 2xl:px-16 pt-8">
        <DashboardStatsBar />
      </section>

      {/* 2. Featured Live & High-Stakes Carousel */}
      <section className="w-full max-w-[1920px] mx-auto px-4 sm:px-8 lg:px-12 2xl:px-16">
        <div className="mb-3 flex items-center justify-between">
          <h2 className="text-xs font-black uppercase tracking-widest text-amber-400">
            Featured Tournaments &amp; Major Qualifiers
          </h2>
          <span className="text-xs text-neutral-400 font-semibold">
            Auto-updating
          </span>
        </div>
        <PromoCarousel />
      </section>

      {/* 3. Main Tournament Discovery Hub */}
      <section className="w-full max-w-[1920px] mx-auto px-4 sm:px-8 lg:px-12 2xl:px-16">
        <TournamentBrowseSection />
      </section>

      {/* 4. Weekly Hall of Fame & Leaderboard */}
      <section className="w-full max-w-[1920px] mx-auto px-4 sm:px-8 lg:px-12 2xl:px-16">
        <LeaderboardSection />
      </section>

      {/* 5. Organizer Host Portal */}
      <section className="w-full">
        <HostSection />
      </section>

      {/* 6. Personal Match History */}
      <section className="w-full max-w-[1920px] mx-auto px-4 sm:px-8 lg:px-12 2xl:px-16">
        <PastTournamentsSection />
      </section>
    </div>
  );
}
