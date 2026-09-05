import { useEffect, useState } from 'react'
import type { TournamentAd } from '../types/tournament'
import { getAllTournaments } from '../api/tournaments'

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

    getAllTournaments()
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