import { useEffect, useState, type FormEvent } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { Loader2, Check, X } from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { checkUsernameAvailable } from '../api/auth'
import { getApiErrorMessage } from '../api/errors'

type UsernameStatus = 'idle' | 'checking' | 'available' | 'taken'

export default function Register() {
  const { register } = useAuth()
  const navigate = useNavigate()

  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [phoneNumber, setPhoneNumber] = useState('')
  const [usernameStatus, setUsernameStatus] = useState<UsernameStatus>('idle')
  const [error, setError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Debounce the username availability check (300–500ms, per the API guide).
  useEffect(() => {
    if (username.trim().length < 3) {
      setUsernameStatus('idle')
      return
    }
    setUsernameStatus('checking')
    const handle = setTimeout(async () => {
      try {
        const { available } = await checkUsernameAvailable(username.trim())
        setUsernameStatus(available ? 'taken' : 'available')
      } catch {
        setUsernameStatus('idle')
      }
    }, 400)
    return () => clearTimeout(handle)
  }, [username])

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)

    if (usernameStatus === 'taken') {
      setError('That username is already taken.')
      return
    }

    setIsSubmitting(true)
    try {
      await register({ username: username.trim(), email , phone: parseInt(phoneNumber), password })
      navigate('/login', { replace: true })
    } catch (err) {
      setError(getApiErrorMessage(err, 'Could not create your account. Please try again.'))
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="mx-auto flex max-w-md flex-col justify-center px-4 py-16 sm:px-6">
      <h1 className="font-display text-3xl font-bold text-ink-900 dark:text-white">
        Create your account
      </h1>
      <p className="mt-2 text-sm text-ink-700 dark:text-slate-400">
        Register a squad account to enter and host tournaments.
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
          <label htmlFor="username" className="block text-sm font-semibold text-ink-900 dark:text-white">
            Username
          </label>
          <div className="relative mt-2">
            <input
              id="username"
              type="text"
              autoComplete="username"
              required
              minLength={3}
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full rounded-md border border-ink-900/15 bg-white px-3 py-2.5 pr-9 text-sm text-ink-900 focus:border-brand-blue dark:border-white/15 dark:bg-ink-800 dark:text-white dark:focus:border-brand-cyan"
            />
            <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2">
              {usernameStatus === 'checking' && (
                <Loader2 size={16} className="animate-spin text-ink-700/50 dark:text-slate-500" />
              )}
              {usernameStatus === 'available' && <Check size={16} className="text-green-500" />}
              {usernameStatus === 'taken' && <X size={16} className="text-red-500" />}
            </span>
          </div>
          {usernameStatus === 'taken' && (
            <p className="mt-1.5 text-xs font-medium text-red-500">Username is already taken.</p>
          )}
          {usernameStatus === 'available' && (
            <p className="mt-1.5 text-xs font-medium text-green-600 dark:text-green-500">
              Username is available.
            </p>
          )}
        </div>

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

         <div>
          <label htmlFor="PhoneNumber" className="block text-sm font-semibold text-ink-900 dark:text-white">
            Phone Number
          </label>
          <input
            id="phoneNumber"
            type="Number"
            required
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
            className="mt-2 w-full rounded-md border border-ink-900/15 bg-white px-3 py-2.5 text-sm text-ink-900 focus:border-brand-blue dark:border-white/15 dark:bg-ink-800 dark:text-white dark:focus:border-brand-cyan"
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm font-semibold text-ink-900 dark:text-white">
            Password
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
          <p className="mt-1.5 text-xs text-ink-700/70 dark:text-slate-500">At least 6 characters.</p>
        </div>

        <button
          type="submit"
          disabled={isSubmitting || usernameStatus === 'taken'}
          className="flex w-full items-center justify-center gap-2 rounded-md bg-brand-blue py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-blue-hover disabled:opacity-70 dark:bg-brand-cyan dark:text-ink-900 dark:hover:bg-brand-cyan/80"
        >
          {isSubmitting && <Loader2 size={16} className="animate-spin" />}
          {isSubmitting ? 'Creating account…' : 'Create account'}
        </button>
      </form>

      <p className="mt-6 text-center text-sm text-ink-700 dark:text-slate-400">
        Already have an account?{' '}
        <NavLink to="/login" className="font-semibold text-brand-blue hover:underline dark:text-brand-cyan">
          Log in
        </NavLink>
      </p>
    </section>
  )
}
