import { useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { Menu, X, Moon, Sun, Swords, User as UserIcon } from 'lucide-react'
import { useTheme } from '../context/ThemeContext'
import { useAuth } from '../context/AuthContext'

const NAV_LINKS = [
  { label: 'Home', to: '/' },
  { label: 'Tournaments', to: '/tournaments' },
  { label: 'Host', to: '/host' },
  { label: 'Contact', to: '/contact' },
]

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const { theme, toggleTheme } = useTheme()
  const { user, isAuthenticated, isLoading, logout } = useAuth()
  const navigate = useNavigate()

  async function handleAuthClick() {
    if (isAuthenticated) {
      await logout()
      navigate('/')
    } else {
      navigate('/login')
    }
  }

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `text-sm font-semibold uppercase tracking-wide transition-colors ${
      isActive
        ? 'text-brand-blue dark:text-brand-cyan'
        : 'text-ink-700 hover:text-brand-blue dark:text-slate-300 dark:hover:text-brand-cyan'
    }`

  return (
    <header className="sticky top-0 z-50 border-b border-ink-900/5 bg-white/90 backdrop-blur-md dark:border-white/5 dark:bg-ink-900/90">
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <NavLink to="/" className="flex items-center gap-2" onClick={() => setIsOpen(false)}>
          <span className="flex h-9 w-9 items-center justify-center rounded-md bg-brand-blue text-white">
            <Swords size={18} strokeWidth={2.5} />
          </span>
          <span className="font-display text-xl font-bold tracking-wider text-ink-900 dark:text-white">
            ARENA<span className="text-brand-blue dark:text-brand-cyan">CIRCUIT</span>
          </span>
        </NavLink>

        {/* Desktop links */}
        <div className="hidden items-center gap-8 md:flex">
          {NAV_LINKS.map((link) => (
            <NavLink key={link.to} to={link.to} className={linkClass} end={link.to === '/'}>
              {link.label}
            </NavLink>
          ))}
        </div>

        {/* Desktop actions */}
        <div className="hidden items-center gap-3 md:flex">
          <button
            onClick={toggleTheme}
            aria-label="Toggle dark theme"
            className="flex h-9 w-9 items-center justify-center rounded-md border border-ink-900/10 text-ink-700 transition-colors hover:border-brand-blue hover:text-brand-blue dark:border-white/10 dark:text-slate-300 dark:hover:border-brand-cyan dark:hover:text-brand-cyan"
          >
            {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
          </button>

          {isAuthenticated && (
            <span className="flex items-center gap-1.5 text-sm font-medium text-ink-700 dark:text-slate-300">
              <UserIcon size={14} />
              {user?.username}
            </span>
          )}

          <button
            onClick={handleAuthClick}
            disabled={isLoading}
            className="rounded-md bg-brand-blue px-4 py-2 text-sm font-semibold text-white transition-colors hover:bg-brand-blue-hover disabled:opacity-60 dark:bg-brand-cyan dark:text-ink-900 dark:hover:bg-brand-cyan/80"
          >
            {isAuthenticated ? 'Logout' : 'Login'}
          </button>
        </div>

        {/* Mobile: theme toggle + hamburger */}
        <div className="flex items-center gap-2 md:hidden">
          <button
            onClick={toggleTheme}
            aria-label="Toggle dark theme"
            className="flex h-10 w-10 items-center justify-center rounded-md text-ink-700 dark:text-slate-300"
          >
            {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
          </button>
          <button
            onClick={() => setIsOpen((v) => !v)}
            aria-label="Toggle menu"
            aria-expanded={isOpen}
            className="flex h-10 w-10 items-center justify-center rounded-md text-ink-900 dark:text-white"
          >
            {isOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu panel */}
      {isOpen && (
        <div className="border-t border-ink-900/5 bg-white px-4 pb-6 pt-2 md:hidden dark:border-white/5 dark:bg-ink-900">
          <div className="flex flex-col gap-1">
            {NAV_LINKS.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                onClick={() => setIsOpen(false)}
                className={({ isActive }) =>
                  `rounded-md px-3 py-3 text-base font-semibold uppercase tracking-wide ${
                    isActive
                      ? 'bg-brand-blue/10 text-brand-blue dark:bg-brand-cyan/10 dark:text-brand-cyan'
                      : 'text-ink-700 dark:text-slate-300'
                  }`
                }
                end={link.to === '/'}
              >
                {link.label}
              </NavLink>
            ))}
          </div>

          {isAuthenticated && (
            <p className="mt-4 flex items-center gap-1.5 px-3 text-sm font-medium text-ink-700 dark:text-slate-300">
              <UserIcon size={14} />
              Signed in as {user?.username}
            </p>
          )}

          <button
            onClick={async () => {
              await handleAuthClick()
              setIsOpen(false)
            }}
            disabled={isLoading}
            className="mt-4 w-full rounded-md bg-brand-blue py-3 text-base font-semibold text-white disabled:opacity-60 dark:bg-brand-cyan dark:text-ink-900"
          >
            {isAuthenticated ? 'Logout' : 'Login'}
          </button>
        </div>
      )}
    </header>
  )
}
