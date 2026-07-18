import { useEffect, useState } from 'react'
import type { TournamentAd } from '../types/tournament'

/**
 * In production this calls your backend, e.g.:
 *   const res = await fetch('/api/tournaments/featured')
 *   const data: TournamentAd[] = await res.json()
 *
 * The shape below is what the API is expected to return, so swapping
 * the mock for a real fetch is a one-line change.
 */
async function fetchFeaturedTournaments(): Promise<TournamentAd[]> {
  await new Promise((resolve) => setTimeout(resolve, 600))

  return [
    {
      id: 't-ff-001',
      game: 'FreeFire',
      title: 'Arena Circuit — FreeFire Squad Showdown',
      prizePool: '₹1,50,000',
      date: 'July 26, 2026',
      slotsLeft: 12,
      status: 'live',
      accent: 'from-brand-blue to-brand-cyan',
    },
    {
      id: 't-pubg-014',
      game: 'PUBG',
      title: 'Chicken Dinner Championship — Season 4',
      prizePool: '₹2,00,000',
      date: 'August 2, 2026',
      slotsLeft: 28,
      status: 'registration-open',
      accent: 'from-brand-navy to-brand-blue',
    },
    {
      id: 't-ff-002',
      game: 'FreeFire',
      title: 'Booyah Nights — Solo Sniper Cup',
      prizePool: '₹75,000',
      date: 'August 9, 2026',
      slotsLeft: 40,
      status: 'upcoming',
      accent: 'from-brand-cyan to-brand-blue',
    },
  ]
}

interface UseTournamentAdsResult {
  ads: TournamentAd[]
  isLoading: boolean
  error: string | null
}

export function useTournamentAds(): UseTournamentAdsResult {
  const [ads, setAds] = useState<TournamentAd[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false

    fetchFeaturedTournaments()
      .then((data) => {
        if (!cancelled) setAds(data)
      })
      .catch(() => {
        if (!cancelled) setError('Could not load tournaments right now. Pull to refresh.')
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [])

  return { ads, isLoading, error }
}
