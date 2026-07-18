import { NavLink } from 'react-router-dom'
import { Swords, Instagram, Youtube, MessageCircle } from 'lucide-react'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-white/5 bg-ink-900 text-slate-300">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-10 sm:grid-cols-2 lg:grid-cols-4">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1">
            <div className="flex items-center gap-2">
              <span className="flex h-9 w-9 items-center justify-center rounded-md bg-brand-blue text-white">
                <Swords size={18} strokeWidth={2.5} />
              </span>
              <span className="font-display text-lg font-bold tracking-wider text-white">
                ARENA<span className="text-brand-cyan">CIRCUIT</span>
              </span>
            </div>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-slate-400">
              Competitive FreeFire and PUBG tournaments — find a match, host your own, and climb
              the regional leaderboard.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <h3 className="font-display text-sm font-semibold uppercase tracking-widest text-white">
              Quick Links
            </h3>
            <ul className="mt-4 space-y-3 text-sm">
              <li>
                <NavLink to="/" className="hover:text-brand-cyan">
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink to="/tournaments" className="hover:text-brand-cyan">
                  Tournaments
                </NavLink>
              </li>
              <li>
                <NavLink to="/host" className="hover:text-brand-cyan">
                  Host a Tournament
                </NavLink>
              </li>
              <li>
                <NavLink to="/contact" className="hover:text-brand-cyan">
                  Contact
                </NavLink>
              </li>
            </ul>
          </div>

          {/* Games */}
          <div>
            <h3 className="font-display text-sm font-semibold uppercase tracking-widest text-white">
              Games
            </h3>
            <ul className="mt-4 space-y-3 text-sm">
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-brand-blue" /> Free Fire
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-brand-cyan" /> PUBG Mobile
              </li>
            </ul>
          </div>

          {/* Social + legal */}
          <div>
            <h3 className="font-display text-sm font-semibold uppercase tracking-widest text-white">
              Stay Updated
            </h3>
            <div className="mt-4 flex gap-3">
              <a
                href="#"
                aria-label="Instagram"
                className="flex h-9 w-9 items-center justify-center rounded-md border border-white/10 hover:border-brand-cyan hover:text-brand-cyan"
              >
                <Instagram size={16} />
              </a>
              <a
                href="#"
                aria-label="YouTube"
                className="flex h-9 w-9 items-center justify-center rounded-md border border-white/10 hover:border-brand-cyan hover:text-brand-cyan"
              >
                <Youtube size={16} />
              </a>
              <a
                href="#"
                aria-label="Discord"
                className="flex h-9 w-9 items-center justify-center rounded-md border border-white/10 hover:border-brand-cyan hover:text-brand-cyan"
              >
                <MessageCircle size={16} />
              </a>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-col gap-3 border-t border-white/5 pt-6 text-xs text-slate-500 sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} Arena Circuit. All rights reserved.</p>
          <p>
            A product of{' '}
            <span className="font-semibold text-slate-300">Awadh Technology</span> — built by the
            Awadh Technology team.
          </p>
        </div>
      </div>
    </footer>
  )
}
