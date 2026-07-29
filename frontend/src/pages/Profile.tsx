import { useAuth } from '../context/AuthContext'

export default function Profile() {
  const { user } = useAuth()

  return (
    <section className="w-full flex-1 flex flex-col items-center justify-center min-h-[calc(100vh-5rem)] px-4 py-12 text-center sm:px-6">
      <span className="flex h-16 w-16 items-center justify-center rounded-full bg-brand-blue/10 font-display text-2xl font-bold text-brand-blue dark:bg-brand-cyan/10 dark:text-brand-cyan">
        {user?.username?.[0]?.toUpperCase() ?? '?'}
      </span>
      <h1 className="mt-4 font-display text-2xl font-bold text-ink-900 dark:text-white">
        {user?.username ?? 'Your profile'}
      </h1>
      <p className="mt-1 text-sm text-ink-700 dark:text-slate-400">{user?.email}</p>
      <p className="mt-6 max-w-sm text-sm text-ink-700 dark:text-slate-400">
        Profile settings, stats, and squad management are coming soon.
      </p>
    </section>
  )
}