import { apiClient } from './client'
import type { TournamentAd } from '../types/tournament'
import type { PastTournamentResult } from '../types/pasttournament'

/** Shared API envelope used by the backend ApiResponse helper. */
interface ApiEnvelope<T> {
  success: boolean
  message: string
  data: T
}

/** GET /tournaments — all tournaments */
export function getAllTournaments() {
  return apiClient
    .get<ApiEnvelope<TournamentAd[]>>('/tournaments')
    .then((res) => res.data.data)
}

/** GET /tournaments/featured — featured / promoted tournaments shown on the homepage carousel */
export function getFeaturedTournaments() {
  return apiClient
    .get<ApiEnvelope<TournamentAd[]>>('/tournaments/featured')
    .then((res) => res.data.data)
}

/** GET /tournaments/:id — single tournament details */
export function getTournamentById(id: string) {
  return apiClient
    .get<ApiEnvelope<TournamentAd>>(`/tournaments/${id}`)
    .then((res) => res.data.data)
}

/** POST /tournaments/:id/register — register a player for a tournament */
export function registerForTournament(
  tournamentId: string,
  payload: { inGameId: string; squadName?: string },
) {
  return apiClient
    .post<ApiEnvelope<{ registrationId: string }>>(`/tournaments/${tournamentId}/register`, payload)
    .then((res) => res.data)
}

/** GET /users/me/tournaments/history — past tournament results for the authenticated user */
export function getMyTournamentHistory() {
  return apiClient
    .get<ApiEnvelope<PastTournamentResult[]>>('/users/me/tournaments/history')
    .then((res) => res.data.data)
}
