import { useState } from 'react'
import { useParams, NavLink, useNavigate } from 'react-router-dom'
import {
  ArrowLeft,
  Trophy,
  Calendar,
  Users,
  ShieldCheck,
  CheckCircle2,
  Gamepad2,
  AlertCircle,
  Sparkles,
  Award,
} from 'lucide-react'
import { useAllTournaments } from '../hooks/useAllTournaments'
import { useAuth } from '../context/AuthContext'
import type { TournamentAd } from '../types/tournament'

export default function TournamentDetail() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { tournaments, isLoading } = useAllTournaments()
  const { isAuthenticated } = useAuth()

  const [inGameId, setInGameId] = useState('')
  const [squadName, setSquadName] = useState('')
  const [registered, setRegistered] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [regError, setRegError] = useState<string | null>(null)

  // Find tournament by ID or fallback to standard structure
  const tournament: TournamentAd | undefined = tournaments.find((t) => t.id === id) ?? (
    id
      ? {
          id,
          game: id.includes('pubg') ? 'PUBG' : 'FreeFire',
          title: `Arena Forage Tournament #${id.toUpperCase()}`,
          prizePool: '₹1,00,000',
          date: 'Upcoming Weekend',
          slotsLeft: 16,
          status: 'registration-open',
          accent: '#F59E0B',
          format: 'Squad',
          entryFee: '₹200',
        }
      : undefined
  )

  function handleRegisterSubmit(e: React.FormEvent) {
    e.preventDefault()
    setRegError(null)

    if (!isAuthenticated) {
      navigate('/login', { state: { from: `/tournaments/${id}` } })
      return
    }

    if (!inGameId.trim()) {
      setRegError('Please provide your In-Game ID (UID).')
      return
    }

    setIsSubmitting(true)
    setTimeout(() => {
      setIsSubmitting(false)
      setRegistered(true)
    }, 800)
  }

  if (isLoading) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center gap-4 bg-white dark:bg-ink-900">
        <Sparkles className="h-8 w-8 animate-spin text-amber-500" />
        <p className="text-sm font-semibold text-neutral-400">Loading tournament details…</p>
      </div>
    )
  }

  if (!tournament) {
    return (
      <section className="max-w-4xl mx-auto px-4 py-16 text-center">
        <AlertCircle className="mx-auto h-12 w-12 text-red-500" />
        <h1 className="mt-4 font-display text-2xl font-bold text-ink-900 dark:text-white">
          Tournament Not Found
        </h1>
        <p className="mt-2 text-sm text-neutral-400">
          The requested tournament standard bracket could not be located.
        </p>
        <NavLink
          to="/tournaments"
          className="mt-6 inline-flex items-center gap-2 rounded-xl bg-amber-500 px-6 py-3 text-sm font-bold text-black hover:bg-amber-400 transition-all"
        >
          <ArrowLeft size={16} />
          Back to Tournaments
        </NavLink>
      </section>
    )
  }

  return (
    <div className="w-full min-h-[calc(100vh-5rem)] bg-neutral-950 text-white py-8 sm:py-12">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Navigation back link */}
        <NavLink
          to="/tournaments"
          className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold uppercase tracking-wider text-amber-400 hover:text-amber-300 transition-colors mb-6"
        >
          <ArrowLeft size={16} />
          Back to all tournaments
        </NavLink>

        {/* Hero Header */}
        <div className="relative rounded-3xl bg-gradient-to-br from-neutral-900 via-neutral-900/90 to-neutral-950 border border-white/10 p-6 sm:p-10 shadow-2xl overflow-hidden">
          <div
            className="absolute top-0 right-0 w-96 h-96 rounded-full blur-[120px] pointer-events-none opacity-20"
            style={{ backgroundColor: tournament.accent || '#F59E0B' }}
          />

          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div className="space-y-4 max-w-2xl">
              <div className="flex flex-wrap items-center gap-2.5">
                <span className="px-3.5 py-1 rounded-full bg-amber-500/20 border border-amber-500/30 text-amber-400 text-xs font-black uppercase tracking-widest">
                  {tournament.game}
                </span>
                <span className="px-3.5 py-1 rounded-full bg-white/10 border border-white/15 text-neutral-300 text-xs font-extrabold uppercase tracking-wider">
                  {tournament.format}
                </span>
                {tournament.status === 'live' && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-500/20 border border-red-500/40 text-red-400 text-xs font-black uppercase tracking-widest animate-pulse">
                    <span className="h-2 w-2 rounded-full bg-red-500" />
                    Live
                  </span>
                )}
              </div>

              <h1 className="text-2xl sm:text-4xl font-black uppercase tracking-tight text-white leading-tight">
                {tournament.title}
              </h1>

              <p className="text-sm text-neutral-300">
                Official competitive bracket. All matches are monitored live by certified admins to guarantee fair play and fast payout distribution.
              </p>
            </div>

            {/* Quick Stats Box */}
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:flex lg:flex-col gap-3 bg-white/5 border border-white/10 p-4 sm:p-6 rounded-2xl backdrop-blur-md min-w-[240px]">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-neutral-400 block">Prize Pool</span>
                <span className="text-xl sm:text-2xl font-black text-amber-400 flex items-center gap-1">
                  <Trophy size={20} />
                  {tournament.prizePool}
                </span>
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-neutral-400 block">Entry Fee</span>
                <span className="text-lg font-bold text-white">{tournament.entryFee}</span>
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-neutral-400 block">Slots Remaining</span>
                <span className="text-lg font-bold text-emerald-400">{tournament.slotsLeft} Open</span>
              </div>
            </div>
          </div>
        </div>

        {/* Content Layout */}
        <div className="mt-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column: Details, Schedule, Prizes */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Overview / Schedule */}
            <div className="rounded-2xl bg-neutral-900/80 border border-white/10 p-6 sm:p-8 space-y-6">
              <h2 className="text-xl font-bold uppercase tracking-wider text-white flex items-center gap-2">
                <Calendar className="text-amber-400" size={22} />
                Tournament Overview &amp; Schedule
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                <div className="p-4 rounded-xl bg-white/5 border border-white/5 space-y-1">
                  <span className="text-xs font-semibold text-neutral-400">Match Date &amp; Time</span>
                  <p className="font-bold text-white">{tournament.date}</p>
                </div>
                <div className="p-4 rounded-xl bg-white/5 border border-white/5 space-y-1">
                  <span className="text-xs font-semibold text-neutral-400">Format &amp; Mode</span>
                  <p className="font-bold text-white">{tournament.format} • Battle Royale</p>
                </div>
                <div className="p-4 rounded-xl bg-white/5 border border-white/5 space-y-1">
                  <span className="text-xs font-semibold text-neutral-400">Map Rotation</span>
                  <p className="font-bold text-white">
                    {tournament.game === 'FreeFire' ? 'Bermuda ➔ Purgatory ➔ Kalahari' : 'Erangel ➔ Miramar ➔ Sanhok'}
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-white/5 border border-white/5 space-y-1">
                  <span className="text-xs font-semibold text-neutral-400">Lobby Check-in</span>
                  <p className="font-bold text-white">15 Minutes Before Start Time</p>
                </div>
              </div>
            </div>

            {/* Prize Distribution */}
            <div className="rounded-2xl bg-neutral-900/80 border border-white/10 p-6 sm:p-8 space-y-6">
              <h2 className="text-xl font-bold uppercase tracking-wider text-white flex items-center gap-2">
                <Award className="text-amber-400" size={22} />
                Prize Pool Breakdown
              </h2>

              <div className="space-y-3">
                <div className="flex items-center justify-between p-4 rounded-xl bg-amber-500/10 border border-amber-500/30">
                  <div className="flex items-center gap-3">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-500 text-black font-black text-sm">
                      1st
                    </span>
                    <div>
                      <p className="font-bold text-white">Champion Winner</p>
                      <p className="text-xs text-neutral-400">50% of total pool + Trophy Badge</p>
                    </div>
                  </div>
                  <span className="font-black text-amber-400 text-lg">Winner Take</span>
                </div>

                <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5">
                  <div className="flex items-center gap-3">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-neutral-300 text-black font-black text-sm">
                      2nd
                    </span>
                    <div>
                      <p className="font-bold text-white">Runner Up</p>
                      <p className="text-xs text-neutral-400">30% of total pool</p>
                    </div>
                  </div>
                  <span className="font-bold text-neutral-200">Runner Up</span>
                </div>

                <div className="flex items-center justify-between p-4 rounded-xl bg-white/5 border border-white/5">
                  <div className="flex items-center gap-3">
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-amber-800 text-white font-black text-sm">
                      3rd
                    </span>
                    <div>
                      <p className="font-bold text-white">3rd Place</p>
                      <p className="text-xs text-neutral-400">20% of total pool</p>
                    </div>
                  </div>
                  <span className="font-bold text-neutral-200">3rd Place</span>
                </div>
              </div>
            </div>

            {/* Rules */}
            <div className="rounded-2xl bg-neutral-900/80 border border-white/10 p-6 sm:p-8 space-y-4">
              <h2 className="text-xl font-bold uppercase tracking-wider text-white flex items-center gap-2">
                <ShieldCheck className="text-amber-400" size={22} />
                Rules &amp; Regulations
              </h2>
              <ul className="list-disc list-inside space-y-2 text-sm text-neutral-300 leading-relaxed">
                <li>All players must join using the registered In-Game UID. Impersonation results in disqualification.</li>
                <li>Cheating, emulation hacks, or unauthorized third-party mods lead to an instant permanent ban.</li>
                <li>Room ID &amp; Password will be displayed in your squad dashboard 15 minutes prior to match launch.</li>
                <li>Match results and kill proofs must be saved via screenshot in case of disputed placement claims.</li>
              </ul>
            </div>
          </div>

          {/* Right Column: Registration Card */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 rounded-2xl bg-neutral-900 border border-white/15 p-6 sm:p-8 shadow-2xl space-y-6">
              
              <h3 className="text-xl font-black uppercase tracking-wider text-white flex items-center gap-2">
                <Gamepad2 className="text-amber-400" size={22} />
                Entry Registration
              </h3>

              {registered ? (
                <div className="flex flex-col items-center gap-3 rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-6 text-center">
                  <CheckCircle2 size={44} className="text-emerald-400" />
                  <h4 className="font-bold text-lg text-white">Registration Confirmed!</h4>
                  <p className="text-xs text-neutral-300">
                    Your spot is secured for <span className="font-semibold text-white">{tournament.title}</span>.
                  </p>
                  <p className="text-xs text-amber-400 font-medium">
                    Room credentials will be revealed 15 minutes before the match start.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleRegisterSubmit} className="space-y-4">
                  {regError && (
                    <div className="rounded-lg border border-red-500/30 bg-red-500/10 p-3 text-xs font-semibold text-red-400">
                      {regError}
                    </div>
                  )}

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-neutral-300 mb-1">
                      In-Game UID / Player ID <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. 5184920491"
                      value={inGameId}
                      onChange={(e) => setInGameId(e.target.value)}
                      className="w-full rounded-xl border border-white/15 bg-black px-4 py-3 text-sm text-white placeholder:text-neutral-600 focus:border-amber-500 focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-neutral-300 mb-1">
                      Squad / Team Name (Optional)
                    </label>
                    <input
                      type="text"
                      placeholder="e.g. Total Gaming Alpha"
                      value={squadName}
                      onChange={(e) => setSquadName(e.target.value)}
                      className="w-full rounded-xl border border-white/15 bg-black px-4 py-3 text-sm text-white placeholder:text-neutral-600 focus:border-amber-500 focus:outline-none"
                    />
                  </div>

                  <div className="pt-2">
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full flex items-center justify-center gap-2 rounded-xl bg-amber-500 py-3.5 text-sm font-black uppercase tracking-wider text-black hover:bg-amber-400 disabled:opacity-60 transition-all cursor-pointer shadow-lg shadow-amber-500/20"
                    >
                      {isSubmitting ? (
                        <span>Processing…</span>
                      ) : (
                        <>
                          <Users size={16} />
                          <span>Confirm &amp; Join Bracket</span>
                        </>
                      )}
                    </button>
                  </div>

                  {!isAuthenticated && (
                    <p className="text-center text-xs text-neutral-400">
                      Note: You will be prompted to log in if not already signed in.
                    </p>
                  )}
                </form>
              )}
            </div>
          </div>

        </div>

      </div>
    </div>
  )
}
