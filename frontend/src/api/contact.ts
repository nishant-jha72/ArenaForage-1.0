import { apiClient } from './client'

interface ApiEnvelope<T> {
  success: boolean
  message: string
  data: T
}

export interface ContactPayload {
  name: string
  email: string
  message: string
}

/** POST /contact — submit a contact-us message */
export function submitContactMessage(payload: ContactPayload) {
  return apiClient
    .post<ApiEnvelope<{ ticketId: string }>>('/contact', payload)
    .then((res) => res.data)
}
