import { useEffect, useState } from 'react'
import type { TournamentAd } from '../types/tournament'
import { gameAccent, tournamentDialogue } from '../theme/tournament.dialogue'

const accents = tournamentDialogue.accentVariants

/**
 * In production this calls your backend, e.g.:
 *   const res = await fetch('/api/tournaments')
 *   const data: TournamentAd[] = await res.json()
 *
 * Swap the mock list below for the real fetch once the Tournament API exists —
 * the shape returned must match TournamentAd.
 */
async function fetchAllTournaments(): Promise<TournamentAd[]> {
  await new Promise((resolve) => setTimeout(resolve, 500))

  return [
    {
      id: 't-ff-001',
      game: 'FreeFire',
      title: 'Arena Forage — FreeFire Squad Showdown',
      prizePool: '₹1,50,000',
      date: 'July 26, 2026',
      slotsLeft: 12,
      status: 'live',
      accent: gameAccent('FreeFire'),
      format: 'Squad',
      entryFee: '₹200',
    },
    {
      id: 't-pubg-014',
      game: 'PUBG',
      title: 'Chicken Dinner Championship — Season 4',
      prizePool: '₹2,00,000',
      date: 'August 2, 2026',
      slotsLeft: 28,
      status: 'registration-open',
      accent: gameAccent('PUBG'),
      format: 'Squad',
      entryFee: '₹300',
    },
    {
      id: 't-ff-002',
      game: 'FreeFire',
      title: 'Booyah Nights — Solo Sniper Cup',
      prizePool: '₹75,000',
      date: 'August 9, 2026',
      slotsLeft: 40,
      status: 'upcoming',
      accent: accents[2],
      format: 'Solo',
      entryFee: 'Free',
    },
    {
      id: 't-pubg-015',
      game: 'PUBG',
      title: 'Erangel Elite Duo Clash',
      prizePool: '₹60,000',
      date: 'August 12, 2026',
      slotsLeft: 18,
      status: 'registration-open',
      accent: accents[3],
      format: 'Duo',
      entryFee: '₹150',
    },
    {
      id: 't-ff-003',
      game: 'FreeFire',
      title: 'Rampage Rumble — Squad Series',
      prizePool: '₹1,00,000',
      date: 'August 15, 2026',
      slotsLeft: 9,
      status: 'live',
      accent: accents[4],
      format: 'Squad',
      entryFee: '₹250',
    },
    {
      id: 't-pubg-016',
      game: 'PUBG',
      title: 'Miramar Masters Solo Cup',
      prizePool: '₹40,000',
      date: 'August 18, 2026',
      slotsLeft: 55,
      status: 'upcoming',
      accent: accents[5],
      format: 'Solo',
      entryFee: 'Free',
    },
    {
      id: 't-ff-004',
      game: 'FreeFire',
      title: 'Clash Squad Clutch Cup',
      prizePool: '₹85,000',
      date: 'August 21, 2026',
      slotsLeft: 24,
      status: 'registration-open',
      accent: accents[0],
      format: 'Squad',
      entryFee: '₹100',
    },
    {
      id: 't-pubg-017',
      game: 'PUBG',
      title: 'Sanhok Sprint Duo Series',
      prizePool: '₹55,000',
      date: 'August 24, 2026',
      slotsLeft: 32,
      status: 'upcoming',
      accent: accents[2],
      format: 'Duo',
      entryFee: '₹150',
    },
    {
      id: 't-ff-005',
      game: 'FreeFire',
      title: 'Booyah League — Regional Qualifier',
      prizePool: '₹3,00,000',
      date: 'August 28, 2026',
      slotsLeft: 6,
      status: 'live',
      accent: gameAccent('PUBG'),
      format: 'Squad',
      entryFee: '₹500',
    },
    {
      id: 't-pubg-018',
      game: 'PUBG',
      title: 'Vikendi Vanguard Solo Showdown',
      prizePool: '₹35,000',
      date: 'September 1, 2026',
      slotsLeft: 60,
      status: 'registration-open',
      accent: accents[3],
      format: 'Solo',
      entryFee: 'Free',
    },
    {
      id: 't-ff-006',
      game: 'FreeFire',
      title: 'Firestorm Friday — Duo Frenzy',
      prizePool: '₹45,000',
      date: 'September 4, 2026',
      slotsLeft: 20,
      status: 'upcoming',
      accent: accents[4],
      format: 'Duo',
      entryFee: '₹100',
    },
    {
      id: 't-pubg-019',
      game: 'PUBG',
      title: 'Chicken Dinner Championship — Regional Finals',
      prizePool: '₹2,50,000',
      date: 'September 8, 2026',
      slotsLeft: 14,
      status: 'registration-open',
      accent: accents[5],
      format: 'Squad',
      entryFee: '₹300',
    },
    {
      id: 't-ff-007',
      game: 'FreeFire',
      title: 'Grandmaster Gauntlet Solo Cup',
      prizePool: '₹30,000',
      date: 'September 11, 2026',
      slotsLeft: 48,
      status: 'upcoming',
      accent: accents[0],
      format: 'Solo',
      entryFee: 'Free',
    },
  ]
}

interface UseAllTournamentsResult {
  tournaments: TournamentAd[]
  isLoading: boolean
  error: string | null
}

export function useAllTournaments(): UseAllTournamentsResult {
  const [tournaments, setTournaments] = useState<TournamentAd[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false

    fetchAllTournaments()
      .then((data) => {
        if (!cancelled) setTournaments(data)
      })
      .catch(() => {
        if (!cancelled) setError('Could not load tournaments right now.')
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [])

  return { tournaments, isLoading, error }
}