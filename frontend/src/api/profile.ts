import { apiClient } from './client'

interface ApiEnvelope<T> {
  success: boolean
  message: string
  data: T
}

/** PUT /users/me/password — change the authenticated user's password */
export function changePassword(payload: { oldPassword: string; newPassword: string }) {
  return apiClient
    .put<ApiEnvelope<null>>('/users/me/password', payload)
    .then((res) => res.data)
}
