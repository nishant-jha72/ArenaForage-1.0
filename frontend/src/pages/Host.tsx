import { useState, type FormEvent } from 'react'
import { Loader2, CheckCircle2, Trophy, ShieldAlert, PlusCircle } from 'lucide-react'
import { submitTournamentForHosting } from '../api/host'
import { getApiErrorMessage } from '../api/errors'

export default function Host() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success'>('idle')
  const [game, setGame] = useState('freefire')
  const [format, setFormat] = useState('squad')
  const [title, setTitle] = useState('')
  const [prize, setPrize] = useState('')
  const [entryFee, setEntryFee] = useState('200')
  const [date, setDate] = useState('')
  const [description, setDescription] = useState('')
  const [error, setError] = useState<string | null>(null)

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setError(null)

    if (!title.trim() || !prize || !date) {
      setError('Please complete all required fields.')
      return
    }

    if (Number(prize) < 0) {
      setError('Prize pool cannot be negative.')
      return
    }

    setStatus('submitting')
    try {
      await submitTournamentForHosting({
        game,
        format,
        title: title.trim(),
        prizePool: prize,
        entryFee,
        date,
        description: description.trim() || undefined,
      })
      setStatus('success')
    } catch (err) {
      setError(getApiErrorMessage(err, 'Failed to submit tournament. Please try again.'))
      setStatus('idle')
    }
  }

  function handleReset() {
    setStatus('idle')
    setTitle('')
    setPrize('')
    setEntryFee('200')
    setDate('')
    setDescription('')
    setError(null)
  }

  return (
    <div className="w-full min-h-[calc(100vh-5rem)] bg-neutral-950 text-white py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Page Header */}
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-black uppercase tracking-wider">
            <Trophy size={14} />
            Organizer Portal
          </div>
          <h1 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-white">
            Host Your Tournament
          </h1>
          <p className="text-sm text-neutral-400">
            Submit your Free Fire or PUBG tournament details. Once reviewed by our admin team, your event will go live on the official tournament board.
          </p>
        </div>

        {status === 'success' ? (
          <div className="rounded-3xl border border-emerald-500/30 bg-emerald-500/10 p-8 sm:p-12 text-center space-y-4">
            <CheckCircle2 size={48} className="mx-auto text-emerald-400" />
            <h2 className="text-2xl font-black uppercase tracking-tight text-white">
              Tournament Submitted for Approval
            </h2>
            <p className="max-w-md mx-auto text-sm text-neutral-300">
              Thank you for hosting on Arena Forage! Your listing <span className="font-bold text-white">"{title}"</span> is now in the review queue. We will notify you once live.
            </p>
            <div className="pt-4">
              <button
                onClick={handleReset}
                className="inline-flex items-center gap-2 rounded-xl bg-amber-500 px-6 py-3 text-sm font-black uppercase tracking-wider text-black hover:bg-amber-400 transition-all cursor-pointer shadow-lg shadow-amber-500/20"
              >
                <PlusCircle size={18} />
                Host Another Event
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="rounded-3xl border border-white/10 bg-neutral-900/90 p-6 sm:p-10 space-y-6 shadow-2xl backdrop-blur-xl">
            
            {error && (
              <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-xs font-semibold text-red-400 flex items-center gap-2">
                <ShieldAlert size={16} />
                {error}
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div>
                <label htmlFor="game" className="block text-xs font-bold uppercase tracking-wider text-neutral-300 mb-2">
                  Esports Game Title <span className="text-red-400">*</span>
                </label>
                <select
                  id="game"
                  value={game}
                  onChange={(e) => setGame(e.target.value)}
                  className="w-full rounded-xl border border-white/15 bg-black px-4 py-3 text-sm text-white focus:border-amber-500 focus:outline-none"
                >
                  <option value="freefire">Free Fire</option>
                  <option value="pubg">PUBG Mobile</option>
                </select>
              </div>

              <div>
                <label htmlFor="format" className="block text-xs font-bold uppercase tracking-wider text-neutral-300 mb-2">
                  Match Format <span className="text-red-400">*</span>
                </label>
                <select
                  id="format"
                  value={format}
                  onChange={(e) => setFormat(e.target.value)}
                  className="w-full rounded-xl border border-white/15 bg-black px-4 py-3 text-sm text-white focus:border-amber-500 focus:outline-none"
                >
                  <option value="solo">Solo</option>
                  <option value="duo">Duo</option>
                  <option value="squad">Squad</option>
                </select>
              </div>
            </div>

            <div>
              <label htmlFor="title" className="block text-xs font-bold uppercase tracking-wider text-neutral-300 mb-2">
                Tournament Title / Name <span className="text-red-400">*</span>
              </label>
              <input
                id="title"
                type="text"
                required
                placeholder="e.g. Booyah Nights — Solo Sniper Cup"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="w-full rounded-xl border border-white/15 bg-black px-4 py-3 text-sm text-white placeholder:text-neutral-600 focus:border-amber-500 focus:outline-none"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div>
                <label htmlFor="prize" className="block text-xs font-bold uppercase tracking-wider text-neutral-300 mb-2">
                  Prize Pool (₹) <span className="text-red-400">*</span>
                </label>
                <input
                  id="prize"
                  type="number"
                  min={0}
                  required
                  placeholder="50000"
                  value={prize}
                  onChange={(e) => setPrize(e.target.value)}
                  className="w-full rounded-xl border border-white/15 bg-black px-4 py-3 text-sm text-white placeholder:text-neutral-600 focus:border-amber-500 focus:outline-none"
                />
              </div>

              <div>
                <label htmlFor="entryFee" className="block text-xs font-bold uppercase tracking-wider text-neutral-300 mb-2">
                  Entry Fee (₹)
                </label>
                <input
                  id="entryFee"
                  type="text"
                  placeholder="200 or Free"
                  value={entryFee}
                  onChange={(e) => setEntryFee(e.target.value)}
                  className="w-full rounded-xl border border-white/15 bg-black px-4 py-3 text-sm text-white placeholder:text-neutral-600 focus:border-amber-500 focus:outline-none"
                />
              </div>

              <div>
                <label htmlFor="date" className="block text-xs font-bold uppercase tracking-wider text-neutral-300 mb-2">
                  Match Date <span className="text-red-400">*</span>
                </label>
                <input
                  id="date"
                  type="date"
                  required
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full rounded-xl border border-white/15 bg-black px-4 py-3 text-sm text-white focus:border-amber-500 focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label htmlFor="desc" className="block text-xs font-bold uppercase tracking-wider text-neutral-300 mb-2">
                Rules &amp; Description
              </label>
              <textarea
                id="desc"
                rows={4}
                placeholder="Specify map rotation, point system, lobby check-in requirements..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="w-full rounded-xl border border-white/15 bg-black px-4 py-3 text-sm text-white placeholder:text-neutral-600 focus:border-amber-500 focus:outline-none"
              />
            </div>

            <button
              type="submit"
              disabled={status === 'submitting'}
              className="w-full flex items-center justify-center gap-2 rounded-xl bg-amber-500 py-3.5 text-sm font-black uppercase tracking-wider text-black hover:bg-amber-400 disabled:opacity-60 transition-all cursor-pointer shadow-lg shadow-amber-500/20"
            >
              {status === 'submitting' && <Loader2 size={16} className="animate-spin" />}
              {status === 'submitting' ? 'Submitting Tournament…' : 'Submit Tournament for Listing'}
            </button>
          </form>
        )}

      </div>
    </div>
  )
}
