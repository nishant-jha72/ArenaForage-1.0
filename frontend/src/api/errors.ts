import { AxiosError } from 'axios'

export function getApiErrorMessage(error: unknown, fallback: string): string {
  if (error instanceof AxiosError) {
    const data = error.response?.data as
      | { message?: string | string[]; errors?: string[] | Array<{ message?: string; msg?: string }> }
      | undefined

    if (data?.errors && Array.isArray(data.errors) && data.errors.length > 0) {
      const parsedErrors = data.errors
        .map((err) => (typeof err === 'string' ? err : err?.message || err?.msg))
        .filter(Boolean)
      if (parsedErrors.length > 0) {
        return parsedErrors.join(', ')
      }
    }

    if (data?.message) {
      return Array.isArray(data.message) ? data.message.join(', ') : data.message
    }

    if (error.code === 'ERR_NETWORK') return "Can't reach the server. Is the API running?"
  }
  return fallback
}

