import { useState } from "react";
import { Swords, Crown } from "lucide-react";

interface LeaderboardItem {
  rank: number;
  name: string;
  game: "Free Fire" | "PUBG";
  tag: string;
  kills: number;
  wins: number;
  earnings: string;
  avatar: string;
}

const TOP_SQUADS: LeaderboardItem[] = [
  {
    rank: 1,
    name: "S8UL Esports",
    game: "PUBG",
    tag: "#S8UL",
    kills: 184,
    wins: 12,
    earnings: "₹85,000",
    avatar: "🥇",
  },
  {
    rank: 2,
    name: "Total Gaming Alpha",
    game: "Free Fire",
    tag: "#TG",
    kills: 162,
    wins: 10,
    earnings: "₹62,000",
    avatar: "🥈",
  },
  {
    rank: 3,
    name: "GodLike Esports",
    game: "PUBG",
    tag: "#GODL",
    kills: 148,
    wins: 8,
    earnings: "₹45,000",
    avatar: "🥉",
  },
  {
    rank: 4,
    name: "Orangutan Gaming",
    game: "Free Fire",
    tag: "#OG",
    kills: 126,
    wins: 6,
    earnings: "₹28,000",
    avatar: "4",
  },
  {
    rank: 5,
    name: "Reckoning Esports",
    game: "PUBG",
    tag: "#RECK",
    kills: 112,
    wins: 5,
    earnings: "₹18,000",
    avatar: "5",
  },
];

export default function LeaderboardSection() {
  const [activeTab, setActiveTab] = useState<"squads" | "mvp">("squads");

  return (
    <section className="w-full rounded-3xl bg-neutral-900/90 border border-white/10 p-6 sm:p-8 space-y-6 shadow-2xl backdrop-blur-xl">
      {/* Header & Tabs */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-2 text-xs font-black uppercase tracking-widest text-amber-400">
            <Crown size={15} />
            Hall of Fame
          </div>
          <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-white flex items-center gap-2">
            Weekly Leaderboard
          </h2>
        </div>

        {/* Tab Selector */}
        <div className="flex items-center gap-2 bg-black/50 border border-white/10 p-1 rounded-xl shrink-0">
          <button
            onClick={() => setActiveTab("squads")}
            className={`px-4 py-2 rounded-lg text-xs font-black uppercase tracking-wider transition-all cursor-pointer ${
              activeTab === "squads"
                ? "bg-amber-500 text-black shadow-md shadow-amber-500/20"
                : "text-neutral-400 hover:text-white"
            }`}
          >
            Top Squads
          </button>
          <button
            onClick={() => setActiveTab("mvp")}
            className={`px-4 py-2 rounded-lg text-xs font-black uppercase tracking-wider transition-all cursor-pointer ${
              activeTab === "mvp"
                ? "bg-amber-500 text-black shadow-md shadow-amber-500/20"
                : "text-neutral-400 hover:text-white"
            }`}
          >
            MVP Kill Leaders
          </button>
        </div>
      </div>

      {/* Leaderboard Ranks List */}
      <div className="space-y-3">
        {TOP_SQUADS.map((item) => {
          return (
            <div
              key={item.name}
              className={`flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 rounded-2xl border transition-all duration-300 ${
                item.rank === 1
                  ? "bg-gradient-to-r from-amber-500/20 via-neutral-900 to-neutral-900 border-amber-500/40 shadow-lg shadow-amber-500/10"
                  : item.rank === 2
                    ? "bg-gradient-to-r from-neutral-800/80 via-neutral-900 to-neutral-900 border-white/20"
                    : item.rank === 3
                      ? "bg-gradient-to-r from-amber-900/20 via-neutral-900 to-neutral-900 border-amber-800/30"
                      : "bg-white/5 border-white/5 hover:border-white/15"
              }`}
            >
              {/* Left Rank & Team Info */}
              <div className="flex items-center gap-4">
                <div
                  className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl font-black text-sm ${
                    item.rank === 1
                      ? "bg-amber-500 text-black shadow-md shadow-amber-500/30"
                      : item.rank === 2
                        ? "bg-neutral-300 text-black"
                        : item.rank === 3
                          ? "bg-amber-800 text-white"
                          : "bg-white/10 text-neutral-400"
                  }`}
                >
                  {item.rank === 1 ? <Crown size={20} /> : `#${item.rank}`}
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="font-extrabold text-base text-white tracking-wide">
                      {item.name}
                    </h3>
                    <span className="text-xs font-bold text-amber-400/80">
                      {item.tag}
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mt-0.5 text-xs text-neutral-400 font-medium">
                    <span className="px-2 py-0.5 rounded bg-white/10 text-neutral-300 text-[10px] font-bold uppercase">
                      {item.game}
                    </span>
                    <span>{item.wins} Victories</span>
                  </div>
                </div>
              </div>

              {/* Right Stats */}
              <div className="flex items-center justify-between sm:justify-end gap-6 text-sm">
                <div className="text-left sm:text-right">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 block">
                    Kills Recorded
                  </span>
                  <span className="font-extrabold text-white flex items-center gap-1">
                    <Swords size={14} className="text-amber-500" />
                    {item.kills} Kills
                  </span>
                </div>

                <div className="text-right">
                  <span className="text-[10px] font-bold uppercase tracking-wider text-neutral-400 block">
                    Prize Won
                  </span>
                  <span className="font-black text-amber-400 text-base">
                    {item.earnings}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
