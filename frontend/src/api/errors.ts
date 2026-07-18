import { AxiosError } from 'axios'

export function getApiErrorMessage(error: unknown, fallback: string): string {
  if (error instanceof AxiosError) {
    const data = error.response?.data as { message?: string | string[] } | undefined
    if (data?.message) {
      return Array.isArray(data.message) ? data.message.join(', ') : data.message
    }
    if (error.response?.status === 409) return 'That email or username is already taken.'
    if (error.response?.status === 400) return 'Please check your details and try again.'
    if (error.response?.status === 401) return 'Incorrect email or password.'
    if (error.code === 'ERR_NETWORK') return "Can't reach the server. Is the API running?"
  }
  return fallback
}
