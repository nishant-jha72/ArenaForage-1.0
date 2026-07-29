import { useState, type FormEvent } from 'react'
import { NavLink, useLocation, useNavigate } from 'react-router-dom'
import { Loader2 } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { getApiErrorMessage } from '../api/errors'

export default function Login() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const location = useLocation()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const redirectTo = (location.state as { from?: string } | null)?.from ?? '/'

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)
    setIsSubmitting(true)
    try {
      await login({ email, password })

      navigate(redirectTo, { replace: true })
    } catch (err) {
      setError(getApiErrorMessage(err, 'Could not log in. Please try again.'))
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="w-full flex-1 flex flex-col items-center justify-center min-h-[calc(100vh-5rem)] px-4 py-12 sm:px-6">
      <div className="w-full max-w-md rounded-2xl border border-white/10 bg-white/90 dark:bg-ink-800/90 p-8 shadow-2xl backdrop-blur-xl">
        <h1 className="font-display text-3xl font-bold text-ink-900 dark:text-white">Log in</h1>
        <p className="mt-2 text-sm text-ink-700 dark:text-slate-400">
          Access your squad dashboard and registered tournaments.
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

          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="block text-sm font-semibold text-ink-900 dark:text-white">
                Password
              </label>
              <NavLink
                to="/forgot-password"
                className="text-xs font-semibold text-amber-500 hover:underline dark:text-amber-400"
              >
                Forgot password?
              </NavLink>
            </div>
            <input
              id="password"
              type="password"
              autoComplete="current-password"
              required
              minLength={6}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-2 w-full rounded-lg border border-ink-900/15 bg-white px-3 py-2.5 text-sm text-ink-900 focus:border-amber-500 focus:outline-none dark:border-white/15 dark:bg-ink-900 dark:text-white dark:focus:border-amber-500"
            />
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="flex w-full items-center justify-center gap-2 rounded-xl bg-amber-500 py-3 text-sm font-bold text-black shadow-lg transition-all hover:bg-amber-400 disabled:opacity-70 cursor-pointer"
          >
            {isSubmitting && <Loader2 size={16} className="animate-spin" />}
            {isSubmitting ? 'Logging in…' : 'Log in'}
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-ink-700 dark:text-slate-400">
          Don't have an account?{' '}
          <NavLink to="/register" className="font-semibold text-amber-500 hover:underline dark:text-amber-400">
            Sign up
          </NavLink>
        </p>
      </div>
    </section>
  )
}
