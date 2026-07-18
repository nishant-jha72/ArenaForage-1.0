import { useState, type FormEvent } from 'react'
import { Mail, MessageSquare, MapPin } from 'lucide-react'

export default function Contact() {
  const [sent, setSent] = useState(false)

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault()
    setSent(true)
  }

  return (
    <section className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8">
      <h1 className="font-display text-3xl font-bold text-ink-900 sm:text-4xl dark:text-white">
        Get in touch
      </h1>
      <p className="mt-2 max-w-xl text-sm text-ink-700 dark:text-slate-400">
        Questions about a tournament, a payout, or partnering with Arena Circuit? Reach out.
      </p>

      <div className="mt-10 grid grid-cols-1 gap-10 lg:grid-cols-3">
        <div className="space-y-6 lg:col-span-1">
          <div className="flex items-start gap-3">
            <Mail size={18} className="mt-0.5 text-brand-blue dark:text-brand-cyan" />
            <div>
              <p className="text-sm font-semibold text-ink-900 dark:text-white">Email</p>
              <p className="text-sm text-ink-700 dark:text-slate-400">support@arenacircuit.gg</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <MessageSquare size={18} className="mt-0.5 text-brand-blue dark:text-brand-cyan" />
            <div>
              <p className="text-sm font-semibold text-ink-900 dark:text-white">Discord</p>
              <p className="text-sm text-ink-700 dark:text-slate-400">discord.gg/arenacircuit</p>
            </div>
          </div>
          <div className="flex items-start gap-3">
            <MapPin size={18} className="mt-0.5 text-brand-blue dark:text-brand-cyan" />
            <div>
              <p className="text-sm font-semibold text-ink-900 dark:text-white">Studio</p>
              <p className="text-sm text-ink-700 dark:text-slate-400">
                Awadh Technology, Lucknow, India
              </p>
            </div>
          </div>
        </div>

        <div className="lg:col-span-2">
          {sent ? (
            <div className="rounded-xl border border-brand-blue/20 bg-brand-blue/5 p-8 text-center dark:border-brand-cyan/20 dark:bg-brand-cyan/5">
              <p className="font-display text-lg font-bold text-ink-900 dark:text-white">
                Message sent
              </p>
              <p className="mt-1 text-sm text-ink-700 dark:text-slate-400">
                We'll reply within 24 hours.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
                <div>
                  <label htmlFor="name" className="block text-sm font-semibold text-ink-900 dark:text-white">
                    Name
                  </label>
                  <input
                    id="name"
                    type="text"
                    required
                    className="mt-2 w-full rounded-md border border-ink-900/15 bg-white px-3 py-2.5 text-sm text-ink-900 focus:border-brand-blue dark:border-white/15 dark:bg-ink-800 dark:text-white dark:focus:border-brand-cyan"
                  />
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-semibold text-ink-900 dark:text-white">
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    required
                    className="mt-2 w-full rounded-md border border-ink-900/15 bg-white px-3 py-2.5 text-sm text-ink-900 focus:border-brand-blue dark:border-white/15 dark:bg-ink-800 dark:text-white dark:focus:border-brand-cyan"
                  />
                </div>
              </div>
              <div>
                <label htmlFor="message" className="block text-sm font-semibold text-ink-900 dark:text-white">
                  Message
                </label>
                <textarea
                  id="message"
                  rows={5}
                  required
                  className="mt-2 w-full rounded-md border border-ink-900/15 bg-white px-3 py-2.5 text-sm text-ink-900 focus:border-brand-blue dark:border-white/15 dark:bg-ink-800 dark:text-white dark:focus:border-brand-cyan"
                />
              </div>
              <button
                type="submit"
                className="w-full rounded-md bg-brand-blue py-3 text-sm font-semibold text-white transition-colors hover:bg-brand-blue-hover sm:w-auto sm:px-8 dark:bg-brand-cyan dark:text-ink-900 dark:hover:bg-brand-cyan/80"
              >
                Send message
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}
