import { useEffect, useState } from 'react'
import type { PastTournamentResult } from '../types/pasttournament'
import { getMyTournamentHistory } from '../api/tournaments'

interface UsePastTournamentsResult {
  history: PastTournamentResult[]
  isLoading: boolean
  error: string | null
}

export function usePastTournaments(): UsePastTournamentsResult {
  const [history, setHistory] = useState<PastTournamentResult[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false

    getMyTournamentHistory()
      .then((data) => {
        if (!cancelled) setHistory(data)
      })
      .catch(() => {
        if (!cancelled) setError('Could not load your tournament history right now.')
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [])

  return { history, isLoading, error }
}