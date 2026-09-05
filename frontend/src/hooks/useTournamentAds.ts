import { useEffect, useState } from 'react'
import type { TournamentAd } from '../types/tournament'
import { getFeaturedTournaments } from '../api/tournaments'

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

    getFeaturedTournaments()
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