import { useState, type FormEvent } from 'react'
import { Loader2, CheckCircle2 } from 'lucide-react'

export default function Host() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle')

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setStatus('submitting')
    // Replace with: await fetch('/api/tournaments', { method: 'POST', body: ... })
    setTimeout(() => setStatus('success'), 1200)
  }

  return (
    <section className="mx-auto max-w-3xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="font-display text-3xl font-bold text-ink-900 sm:text-4xl dark:text-white">
        Host a tournament
      </h1>
      <p className="mt-2 text-sm text-ink-700 dark:text-slate-400">
        Fill in your tournament details and we'll list it once it's approved.
      </p>

      {status === 'success' ? (
        <div className="mt-8 flex flex-col items-center gap-3 rounded-xl border border-brand-blue/20 bg-brand-blue/5 p-10 text-center dark:border-brand-cyan/20 dark:bg-brand-cyan/5">
          <CheckCircle2 size={36} className="text-brand-blue dark:text-brand-cyan" />
          <h2 className="font-display text-xl font-bold text-ink-900 dark:text-white">
            Submitted for review
          </h2>
          <p className="max-w-sm text-sm text-ink-700 dark:text-slate-400">
            We'll email you once your tournament is approved and live on the tournaments page.
          </p>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="mt-8 space-y-5">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="game" className="block text-sm font-semibold text-ink-900 dark:text-white">
                Game
              </label>
              <select
                id="game"
                required
                className="mt-2 w-full rounded-md border border-ink-900/15 bg-white px-3 py-2.5 text-sm text-ink-900 focus:border-brand-blue dark:border-white/15 dark:bg-ink-800 dark:text-white dark:focus:border-brand-cyan"
              >
                <option value="freefire">Free Fire</option>
                <option value="pubg">PUBG Mobile</option>
              </select>
            </div>
            <div>
              <label htmlFor="format" className="block text-sm font-semibold text-ink-900 dark:text-white">
                Format
              </label>
              <select
                id="format"
                required
                className="mt-2 w-full rounded-md border border-ink-900/15 bg-white px-3 py-2.5 text-sm text-ink-900 focus:border-brand-blue dark:border-white/15 dark:bg-ink-800 dark:text-white dark:focus:border-brand-cyan"
              >
                <option value="solo">Solo</option>
                <option value="duo">Duo</option>
                <option value="squad">Squad</option>
              </select>
            </div>
          </div>

          <div>
            <label htmlFor="title" className="block text-sm font-semibold text-ink-900 dark:text-white">
              Tournament name
            </label>
            <input
              id="title"
              type="text"
              required
              placeholder="e.g. Booyah Nights — Solo Sniper Cup"
              className="mt-2 w-full rounded-md border border-ink-900/15 bg-white px-3 py-2.5 text-sm text-ink-900 placeholder:text-ink-700/40 focus:border-brand-blue dark:border-white/15 dark:bg-ink-800 dark:text-white dark:placeholder:text-slate-500 dark:focus:border-brand-cyan"
            />
          </div>

          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            <div>
              <label htmlFor="prize" className="block text-sm font-semibold text-ink-900 dark:text-white">
                Prize pool (₹)
              </label>
              <input
                id="prize"
                type="number"
                min={0}
                required
                placeholder="50000"
                className="mt-2 w-full rounded-md border border-ink-900/15 bg-white px-3 py-2.5 text-sm text-ink-900 placeholder:text-ink-700/40 focus:border-brand-blue dark:border-white/15 dark:bg-ink-800 dark:text-white dark:placeholder:text-slate-500 dark:focus:border-brand-cyan"
              />
            </div>
            <div>
              <label htmlFor="date" className="block text-sm font-semibold text-ink-900 dark:text-white">
                Date
              </label>
              <input
                id="date"
                type="date"
                required
                className="mt-2 w-full rounded-md border border-ink-900/15 bg-white px-3 py-2.5 text-sm text-ink-900 focus:border-brand-blue dark:border-white/15 dark:bg-ink-800 dark:text-white dark:focus:border-brand-cyan"
              />
            </div>
          </div>

          <div>
            <label htmlFor="desc" className="block text-sm font-semibold text-ink-900 dark:text-white">
              Rules & description
            </label>
            <textarea
              id="desc"
              rows={4}
              placeholder="Map rotation, point system, check-in time..."
              className="mt-2 w-full rounded-md border border-ink-900/15 bg-white px-3 py-2.5 text-sm text-ink-900 placeholder:text-ink-700/40 focus:border-brand-blue dark:border-white/15 dark:bg-ink-800 dark:text-white dark:placeholder:text-slate-500 dark:focus:border-brand-cyan"
            />
          </div>

          <button
            type="submit"
            disabled={status === 'submitting'}
            className="flex w-full items-center justify-center gap-2 rounded-md bg-brand-blue py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-blue-hover disabled:opacity-70 dark:bg-brand-cyan dark:text-ink-900 dark:hover:bg-brand-cyan/80"
          >
            {status === 'submitting' && <Loader2 size={16} className="animate-spin" />}
            {status === 'submitting' ? 'Submitting…' : 'Submit tournament'}
          </button>
        </form>
      )}
    </section>
  )
}
