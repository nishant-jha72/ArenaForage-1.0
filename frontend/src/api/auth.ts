import { apiClient } from './client'
import type { User } from '../types/user'

export interface RegisterPayload {
  username: string
  phoneNumber: Number
  email: string
  password: string
}

export interface LoginPayload {
  email: string
  password: string
}

export interface AuthResponse {
  accessToken: string
  refreshToken: string
  user: User
}

/** POST /auth/register — 201 Created, 400 validation failed, 409 duplicate email/username */
export function registerUser(payload: RegisterPayload) {
  return apiClient.post<User>('/auth/register', payload).then((res) => res.data)
}

/** POST /auth/login */
export function loginUser(payload: LoginPayload) {
  return apiClient.post<AuthResponse>('/auth/login', payload).then((res) => res.data)
}

/** POST /auth/logout */
export function logoutUser(refreshToken: string) {
  return apiClient.post('/auth/logout', { refreshToken })
}

/** POST /auth/forgot-password */
export function forgotPassword(email: string) {
  return apiClient.post('/auth/forgot-password', { email })
}

/** POST /auth/reset-password */
export function resetPassword(token: string, password: string) {
  return apiClient.post('/auth/reset-password', { token, password })
}

/** GET /users/me — requires bearer token */
export function getCurrentUser() {
  return apiClient.get<User>('/users/me').then((res) => res.data)
}

/** GET /users/check-username?username=... — debounce 300–500ms on the caller side */
export function checkUsernameAvailable(username: string) {
  return apiClient
    .get<{ available: boolean }>('/users/check-username', { params: { username } })
    .then((res) => res.data)
}
