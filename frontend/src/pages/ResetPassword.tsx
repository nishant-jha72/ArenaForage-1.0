import { useState, type FormEvent } from 'react'
import { NavLink, useNavigate, useSearchParams } from 'react-router-dom'
import { Loader2, CheckCircle2, AlertTriangle } from 'lucide-react'
import { resetPassword } from '../api/auth'
import { getApiErrorMessage } from '../api/errors'

export default function ResetPassword() {
  const [searchParams] = useSearchParams()
  const navigate = useNavigate()
  const token = searchParams.get('token')

  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [done, setDone] = useState(false)

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)

    if (!token) {
      setError('This reset link is missing or invalid.')
      return
    }
    if (password !== confirmPassword) {
      setError("Passwords don't match.")
      return
    }

    setIsSubmitting(true)
    try {
      await resetPassword(token, password)
      setDone(true)
      setTimeout(() => navigate('/login', { replace: true }), 1500)
    } catch (err) {
      setError(getApiErrorMessage(err, 'Could not reset your password. The link may have expired.'))
    } finally {
      setIsSubmitting(false)
    }
  }

  if (!token) {
    return (
      <section className="mx-auto flex max-w-md flex-col items-center justify-center px-4 py-16 text-center sm:px-6">
        <AlertTriangle size={32} className="text-red-500" />
        <h1 className="mt-4 font-display text-2xl font-bold text-ink-900 dark:text-white">
          Invalid reset link
        </h1>
        <p className="mt-2 text-sm text-ink-700 dark:text-slate-400">
          This link is missing its token. Request a new one from the forgot password page.
        </p>
        <NavLink
          to="/forgot-password"
          className="mt-6 text-sm font-semibold text-brand-blue hover:underline dark:text-brand-cyan"
        >
          Request new link
        </NavLink>
      </section>
    )
  }

  if (done) {
    return (
      <section className="mx-auto flex max-w-md flex-col items-center justify-center px-4 py-16 text-center sm:px-6">
        <CheckCircle2 size={32} className="text-brand-blue dark:text-brand-cyan" />
        <h1 className="mt-4 font-display text-2xl font-bold text-ink-900 dark:text-white">
          Password reset
        </h1>
        <p className="mt-2 text-sm text-ink-700 dark:text-slate-400">Taking you to login…</p>
      </section>
    )
  }

  return (
    <section className="mx-auto flex max-w-md flex-col justify-center px-4 py-16 sm:px-6">
      <h1 className="font-display text-3xl font-bold text-ink-900 dark:text-white">
        Choose a new password
      </h1>

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
          <label htmlFor="password" className="block text-sm font-semibold text-ink-900 dark:text-white">
            New password
          </label>
          <input
            id="password"
            type="password"
            autoComplete="new-password"
            required
            minLength={6}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-2 w-full rounded-md border border-ink-900/15 bg-white px-3 py-2.5 text-sm text-ink-900 focus:border-brand-blue dark:border-white/15 dark:bg-ink-800 dark:text-white dark:focus:border-brand-cyan"
          />
        </div>
        <div>
          <label htmlFor="confirm" className="block text-sm font-semibold text-ink-900 dark:text-white">
            Confirm password
          </label>
          <input
            id="confirm"
            type="password"
            autoComplete="new-password"
            required
            minLength={6}
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="mt-2 w-full rounded-md border border-ink-900/15 bg-white px-3 py-2.5 text-sm text-ink-900 focus:border-brand-blue dark:border-white/15 dark:bg-ink-800 dark:text-white dark:focus:border-brand-cyan"
          />
        </div>

        <button
          type="submit"
          disabled={isSubmitting}
          className="flex w-full items-center justify-center gap-2 rounded-md bg-brand-blue py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-blue-hover disabled:opacity-70 dark:bg-brand-cyan dark:text-ink-900 dark:hover:bg-brand-cyan/80"
        >
          {isSubmitting && <Loader2 size={16} className="animate-spin" />}
          {isSubmitting ? 'Saving…' : 'Reset password'}
        </button>
      </form>
    </section>
  )
}
