import { useState, type FormEvent } from 'react'
import { NavLink } from 'react-router-dom'
import { Loader2, MailCheck } from 'lucide-react'
import { forgotPassword } from '../api/auth'
import { getApiErrorMessage } from '../api/errors'

export default function ForgotPassword() {
  const [email, setEmail] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [sent, setSent] = useState(false)

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)
    setIsSubmitting(true)
    try {
      await forgotPassword(email)
      setSent(true)
    } catch (err) {
      setError(getApiErrorMessage(err, 'Could not send the reset email. Please try again.'))
    } finally {
      setIsSubmitting(false)
    }
  }

  if (sent) {
    return (
      <section className="mx-auto flex max-w-md flex-col items-center justify-center px-4 py-16 text-center sm:px-6">
        <MailCheck size={36} className="text-brand-blue dark:text-brand-cyan" />
        <h1 className="mt-4 font-display text-2xl font-bold text-ink-900 dark:text-white">
          Check your inbox
        </h1>
        <p className="mt-2 text-sm text-ink-700 dark:text-slate-400">
          If an account exists for <span className="font-semibold">{email}</span>, we've sent a
          link to reset your password.
        </p>
        <NavLink to="/login" className="mt-6 text-sm font-semibold text-brand-blue hover:underline dark:text-brand-cyan">
          Back to login
        </NavLink>
      </section>
    )
  }

  return (
    <section className="mx-auto flex max-w-md flex-col justify-center px-4 py-16 sm:px-6">
      <h1 className="font-display text-3xl font-bold text-ink-900 dark:text-white">
        Reset your password
      </h1>
      <p className="mt-2 text-sm text-ink-700 dark:text-slate-400">
        Enter your account email and we'll send you a reset link.
      </p>

      {error && (
        <p
          role="alert"
          className="mt-6 rounded-md border border-red-500/30 bg-red-500/10 px-4 py-3 text-sm font-medium text-red-600 dark:text-red-400"
        >
          {error}
        </p>
      )}

      <form onSubmit={handleSubmit} className="mt-8 space-y-5" noValidate>
        <div>
          <label htmlFor="email" className="block text-sm font-semibold text-ink-900 dark:text-white">
            Email
          </label>
          <input
            id="email"
            type="email"
            autoComplete="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-2 w-full rounded-md border border-ink-900/15 bg-white px-3 py-2.5 text-sm text-ink-900 focus:border-brand-blue dark:border-white/15 dark:bg-ink-800 dark:text-white dark:focus:border-brand-cyan"
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="flex w-full items-center justify-center gap-2 rounded-md bg-brand-blue py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-blue-hover disabled:opacity-70 dark:bg-brand-cyan dark:text-ink-900 dark:hover:bg-brand-cyan/80"
        >
          {isSubmitting && <Loader2 size={16} className="animate-spin" />}
          {isSubmitting ? 'Sending…' : 'Send reset link'}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-ink-700 dark:text-slate-400">
        <NavLink to="/login" className="font-semibold text-brand-blue hover:underline dark:text-brand-cyan">
          Back to login
        </NavLink>
      </p>
    </section>
  )
}
