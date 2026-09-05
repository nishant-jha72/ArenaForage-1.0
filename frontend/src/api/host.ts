import { apiClient } from './client'

interface ApiEnvelope<T> {
  success: boolean
  message: string
  data: T
}

export interface HostTournamentPayload {
  game: string
  format: string
  title: string
  prizePool: string
  entryFee: string
  date: string
  description?: string
}

/** POST /tournaments/host — submit a new tournament for admin review */
export function submitTournamentForHosting(payload: HostTournamentPayload) {
  return apiClient
    .post<ApiEnvelope<{ tournamentId: string }>>('/tournaments/host', payload)
    .then((res) => res.data)
}
