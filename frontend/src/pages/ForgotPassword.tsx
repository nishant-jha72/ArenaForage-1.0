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
      <section className="w-full flex-1 flex flex-col items-center justify-center min-h-[calc(100vh-5rem)] px-4 py-12 sm:px-6">
        <div className="w-full max-w-md rounded-2xl border border-white/10 bg-white/90 dark:bg-ink-800/90 p-8 shadow-2xl backdrop-blur-xl text-center flex flex-col items-center">
          <MailCheck size={36} className="text-amber-500" />
          <h1 className="mt-4 font-display text-2xl font-bold text-ink-900 dark:text-white">
            Check your inbox
          </h1>
          <p className="mt-2 text-sm text-ink-700 dark:text-slate-400">
            If an account exists for <span className="font-semibold">{email}</span>, we've sent a
            link to reset your password.
          </p>
          <NavLink to="/login" className="mt-6 text-sm font-semibold text-amber-500 hover:underline dark:text-amber-400">
            Back to login
          </NavLink>
        </div>
      </section>
    )
  }

  return (
    <section className="w-full flex-1 flex flex-col items-center justify-center min-h-[calc(100vh-5rem)] px-4 py-12 sm:px-6">
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-white/90 dark:bg-ink-800/90 p-8 shadow-2xl backdrop-blur-xl">
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
              className="mt-2 w-full rounded-lg border border-ink-900/15 bg-white px-3 py-2.5 text-sm text-ink-900 focus:border-amber-500 focus:outline-none dark:border-white/15 dark:bg-ink-900 dark:text-white dark:focus:border-amber-500"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-amber-500 py-3 text-sm font-bold text-black shadow-lg transition-all hover:bg-amber-400 disabled:opacity-70 cursor-pointer"
          >
            {isSubmitting && <Loader2 size={16} className="animate-spin" />}
            {isSubmitting ? 'Sending…' : 'Send reset link'}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-ink-700 dark:text-slate-400">
          <NavLink to="/login" className="font-semibold text-amber-500 hover:underline dark:text-amber-400">
            Back to login
          </NavLink>
        </p>
      </div>
    </section>
  )
}
