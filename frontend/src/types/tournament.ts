export type GameTitle = 'FreeFire' | 'PUBG'

export type TournamentStatus = 'live' | 'upcoming' | 'registration-open'

export interface TournamentAd {
  id: string
  game: GameTitle
  title: string
  prizePool: string
  date: string
  slotsLeft: number
  status: TournamentStatus
  accent: string
}
