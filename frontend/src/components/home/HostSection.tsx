import { NavLink } from 'react-router-dom'
import { ArrowRight, ShieldCheck, Wallet, BarChart3 } from 'lucide-react'

const PERKS = [
  {
    icon: ShieldCheck,
    title: 'Verified brackets',
    desc: 'Anti-cheat checks and admin tools built for FreeFire & PUBG lobbies.',
  },
  {
    icon: Wallet,
    title: 'Instant payouts',
    desc: 'Collect entry fees and pay winners directly — no manual reconciliation.',
  },
  {
    icon: BarChart3,
    title: 'Live analytics',
    desc: 'Track registrations, kill counts, and standings in real time.',
  },
]

export default function HostSection() {
  return (
    <section className="clip-panel-rev bg-brand-navy py-16 text-white sm:py-20">
      <div className="w-full px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-center lg:gap-16">
          <div>
            <span className="inline-flex w-fit items-center gap-2 rounded-full border border-brand-cyan/30 bg-brand-cyan/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-brand-cyan">
              For organizers
            </span>
            <h2 className="mt-4 font-display text-3xl font-bold leading-tight sm:text-4xl">
              Run your own FreeFire or PUBG tournament
            </h2>
            <p className="mt-4 max-w-md text-sm leading-relaxed text-slate-300 sm:text-base">
              Set your format, entry fee, and prize pool — Arena Circuit handles registration,
              brackets, and payouts so you can focus on the match.
            </p>
            <NavLink
              to="/host"
              className="mt-7 inline-flex items-center gap-2 rounded-md bg-brand-cyan px-6 py-3 text-sm font-semibold text-ink-900 transition-colors hover:bg-brand-cyan/80"
            >
              Host a Tournament
              <ArrowRight size={16} />
            </NavLink>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-3 lg:grid-cols-1">
            {PERKS.map((perk) => (
              <div
                key={perk.title}
                className="rounded-lg border border-white/10 bg-white/5 p-5 backdrop-blur-sm"
              >
                <perk.icon size={20} className="text-brand-cyan" />
                <h3 className="mt-3 font-display text-base font-semibold">{perk.title}</h3>
                <p className="mt-1 text-sm text-slate-400">{perk.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
