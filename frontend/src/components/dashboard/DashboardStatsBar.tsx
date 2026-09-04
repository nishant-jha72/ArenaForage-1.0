import { useState, useEffect } from "react";
import {
  Trophy,
  Swords,
  Award,
  Flame,
  Key,
  Copy,
  Check,
  Zap,
  Sparkles,
} from "lucide-react";
import { useAuth } from "../../context/AuthContext";

export default function DashboardStatsBar() {
  const { user } = useAuth();

  // Room Credentials Countdown (Simulated live countdown for upcoming match)
  const [timeLeft, setTimeLeft] = useState({ minutes: 14, seconds: 35 });
  const [copied, setCopied] = useState(false);
  const [unlocked, setUnlocked] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { minutes: prev.minutes - 1, seconds: 59 };
        } else {
          setUnlocked(true);
          clearInterval(timer);
          return { minutes: 0, seconds: 0 };
        }
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  function handleCopyRoomCode() {
    navigator.clipboard.writeText("ROOM-7829-PASS-9912");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  }

  return (
    <div className="w-full space-y-6">
      {/* Top Gamer Welcome Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-neutral-900 via-neutral-900/90 to-neutral-950 border border-white/10 p-6 sm:p-8 shadow-2xl">
        <div className="absolute top-0 right-0 w-96 h-96 rounded-full bg-amber-500/10 blur-[120px] pointer-events-none transform-gpu" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-2">
            <div className="flex flex-wrap items-center gap-2.5">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-500/20 border border-amber-500/30 text-amber-400 text-xs font-black uppercase tracking-widest">
                <Sparkles size={13} />
                Tier 1 Platinum Gamer
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-wider">
                <Flame size={13} />
                Pro Circuit Division
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-white leading-tight">
              Welcome Back,{" "}
              <span className="text-amber-400">
                {user?.username ?? "Competitor"}
              </span>
              !
            </h1>

            <p className="text-xs sm:text-sm text-neutral-400 max-w-xl">
              Your Esports Command Center is ready. Check your upcoming room
              access, live tournament brackets, and career standings.
            </p>
          </div>

          {/* Gamer Wallet & Quick Stats */}
          <div className="flex flex-wrap items-center gap-4 bg-black/40 border border-white/10 p-4 rounded-2xl backdrop-blur-md shrink-0">
            <div>
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-neutral-400 block">
                Prize Wallet
              </span>
              <span className="text-xl sm:text-2xl font-black text-amber-400">
                ₹1,250.00
              </span>
            </div>
            <div className="h-8 w-px bg-white/10 hidden sm:block" />
            <div>
              <span className="text-[11px] font-extrabold uppercase tracking-wider text-neutral-400 block">
                Active Entries
              </span>
              <span className="text-lg font-bold text-white flex items-center gap-1">
                <Zap size={16} className="text-emerald-400" />2 Brackets
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Live Room Access Notification Widget */}
      <div className="rounded-2xl border border-amber-500/30 bg-gradient-to-r from-amber-500/10 via-neutral-900 to-neutral-900 p-5 sm:p-6 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="flex items-start sm:items-center gap-4">
          <div className="p-3 rounded-xl bg-amber-500/20 border border-amber-500/40 text-amber-400 shrink-0">
            <Key size={24} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="h-2 w-2 rounded-full bg-red-500 animate-ping" />
              <h3 className="text-sm font-black uppercase tracking-wider text-white">
                Upcoming Match: Free Fire World Series Qualifier
              </h3>
            </div>
            <p className="text-xs text-neutral-300 mt-0.5">
              Room credentials will be automatically released to your dashboard
              15 mins before start time.
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          {unlocked ? (
            <button
              onClick={handleCopyRoomCode}
              className="inline-flex items-center gap-2 rounded-xl bg-amber-500 px-4 py-2.5 text-xs font-black uppercase tracking-wider text-black hover:bg-amber-400 transition-all cursor-pointer shadow-lg shadow-amber-500/20"
            >
              {copied ? <Check size={14} /> : <Copy size={14} />}
              {copied ? "Credentials Copied!" : "Copy Room ID & Password"}
            </button>
          ) : (
            <div className="flex items-center gap-2 bg-black/60 border border-white/10 px-4 py-2.5 rounded-xl font-mono text-xs font-bold text-amber-400">
              <span className="text-neutral-400 font-sans text-[11px]">
                Unlocks in:
              </span>
              <span>
                {String(timeLeft.minutes).padStart(2, "0")}:
                {String(timeLeft.seconds).padStart(2, "0")}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Career Quick Metrics Cards */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
        <div className="rounded-2xl bg-neutral-900/90 border border-white/10 p-4 sm:p-5 flex items-center gap-3.5 backdrop-blur-md">
          <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400">
            <Trophy size={20} />
          </div>
          <div>
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-neutral-400 block">
              Tournaments
            </span>
            <span className="text-lg sm:text-xl font-black text-white">
              24 Matches
            </span>
          </div>
        </div>

        <div className="rounded-2xl bg-neutral-900/90 border border-white/10 p-4 sm:p-5 flex items-center gap-3.5 backdrop-blur-md">
          <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
            <Flame size={20} />
          </div>
          <div>
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-neutral-400 block">
              Win Rate
            </span>
            <span className="text-lg sm:text-xl font-black text-white">
              68.4%
            </span>
          </div>
        </div>

        <div className="rounded-2xl bg-neutral-900/90 border border-white/10 p-4 sm:p-5 flex items-center gap-3.5 backdrop-blur-md">
          <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400">
            <Swords size={20} />
          </div>
          <div>
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-neutral-400 block">
              Total Kills
            </span>
            <span className="text-lg sm:text-xl font-black text-white">
              142 Kills
            </span>
          </div>
        </div>

        <div className="rounded-2xl bg-neutral-900/90 border border-white/10 p-4 sm:p-5 flex items-center gap-3.5 backdrop-blur-md">
          <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-400">
            <Award size={20} />
          </div>
          <div>
            <span className="text-[11px] font-extrabold uppercase tracking-wider text-neutral-400 block">
              Total Earnings
            </span>
            <span className="text-lg sm:text-xl font-black text-amber-400">
              ₹4,500
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
