export type UserRole = 'SUPER_ADMIN' | 'ADMIN' | 'USER'
export type UserStatus = 'ACTIVE' | 'SUSPENDED' | 'BANNED'

export interface User {
  id: string
  username: string
  email: string
  role: UserRole
  status: UserStatus
  createdAt?: string
}
