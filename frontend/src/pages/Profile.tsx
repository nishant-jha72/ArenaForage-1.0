import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import {
  User as UserIcon,
  Mail,
  Phone,
  Shield,
  Trophy,
  Swords,
  Award,
  LogOut,
  Calendar,
  CheckCircle2,
  Lock,
} from 'lucide-react'
import { useAuth } from '../context/AuthContext'
import { usePastTournaments } from '../hooks/usePastTournaments'
import { changePassword } from '../api/profile'
import { getApiErrorMessage } from '../api/errors'

export default function Profile() {
  const { user, logout } = useAuth()
  const { history } = usePastTournaments()

  const [activeTab, setActiveTab] = useState<'overview' | 'security'>('overview')
  const [oldPassword, setOldPassword] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [passMessage, setPassMessage] = useState<string | null>(null)
  const [passError, setPassError] = useState<string | null>(null)
  const [isUpdatingPass, setIsUpdatingPass] = useState(false)

  // Calculate career statistics from match history
  const totalMatches = history.length
  const totalKills = history.reduce((sum, item) => sum + (item.kills || 0), 0)
  const totalPrizes = history.filter((item) => item.prizeWon !== '—').length

  async function handlePasswordChange(e: React.FormEvent) {
    e.preventDefault()
    setPassMessage(null)
    setPassError(null)

    if (!oldPassword || !newPassword) {
      setPassError('Please complete all password fields.')
      return
    }

    setIsUpdatingPass(true)
    try {
      await changePassword({ oldPassword, newPassword })
      setPassMessage('Password updated successfully.')
      setOldPassword('')
      setNewPassword('')
    } catch (err) {
      setPassError(getApiErrorMessage(err, 'Failed to update password. Please try again.'))
    } finally {
      setIsUpdatingPass(false)
    }
  }

  return (
    <div className="w-full min-h-[calc(100vh-5rem)] bg-neutral-950 text-white py-10 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto space-y-8">
        
        {/* Profile Banner & Header */}
        <div className="relative rounded-3xl bg-neutral-900 border border-white/10 p-6 sm:p-10 shadow-2xl overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 rounded-full bg-amber-500/10 blur-[100px] pointer-events-none" />

          <div className="relative z-10 flex flex-col sm:flex-row items-center sm:items-start gap-6 text-center sm:text-left">
            <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-3xl bg-gradient-to-br from-amber-400 to-amber-600 text-black font-black text-4xl shadow-xl shadow-amber-500/20 border-2 border-white/20">
              {user?.username?.[0]?.toUpperCase() ?? 'A'}
            </div>

            <div className="space-y-2 flex-1">
              <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2.5">
                <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-tight text-white">
                  {user?.username ?? 'Gamer'}
                </h1>
                <span className="px-3 py-0.5 rounded-full bg-amber-500/20 border border-amber-500/30 text-amber-400 text-xs font-black uppercase tracking-wider">
                  {user?.role ?? 'USER'}
                </span>
                <span className="px-3 py-0.5 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-wider flex items-center gap-1">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
                  {user?.status ?? 'ACTIVE'}
                </span>
              </div>

              <p className="text-sm text-neutral-400 flex items-center justify-center sm:justify-start gap-2">
                <Mail size={14} className="text-amber-500" />
                {user?.email ?? 'user@arenaforage.gg'}
              </p>

              <p className="text-xs text-neutral-500 flex items-center justify-center sm:justify-start gap-2">
                <Calendar size={13} className="text-neutral-400" />
                Member since September 2026
              </p>
            </div>

            {/* Logout Button */}
            <button
              onClick={() => logout()}
              className="inline-flex items-center gap-2 rounded-xl bg-white/5 hover:bg-red-500/20 border border-white/10 hover:border-red-500/40 px-4 py-2.5 text-xs font-extrabold uppercase tracking-wider text-neutral-300 hover:text-red-400 transition-all cursor-pointer"
            >
              <LogOut size={15} />
              Logout
            </button>
          </div>
        </div>

        {/* Tab Navigation */}
        <div className="flex items-center gap-3 border-b border-white/10 pb-3">
          <button
            onClick={() => setActiveTab('overview')}
            className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-extrabold uppercase tracking-wider transition-all cursor-pointer ${
              activeTab === 'overview'
                ? 'bg-amber-500 text-black shadow-lg shadow-amber-500/20'
                : 'bg-white/5 text-neutral-400 hover:text-white hover:bg-white/10'
            }`}
          >
            Career Overview
          </button>
          <button
            onClick={() => setActiveTab('security')}
            className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-extrabold uppercase tracking-wider transition-all cursor-pointer ${
              activeTab === 'security'
                ? 'bg-amber-500 text-black shadow-lg shadow-amber-500/20'
                : 'bg-white/5 text-neutral-400 hover:text-white hover:bg-white/10'
            }`}
          >
            Security Settings
          </button>
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' ? (
          <div className="space-y-8">
            
            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
              <div className="rounded-2xl bg-neutral-900 border border-white/10 p-6 flex items-center gap-4">
                <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400">
                  <Trophy size={24} />
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-neutral-400 block">Tournaments Played</span>
                  <span className="text-2xl font-black text-white">{totalMatches}</span>
                </div>
              </div>

              <div className="rounded-2xl bg-neutral-900 border border-white/10 p-6 flex items-center gap-4">
                <div className="p-3.5 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-400">
                  <Swords size={24} />
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-neutral-400 block">Total Kills</span>
                  <span className="text-2xl font-black text-white">{totalKills}</span>
                </div>
              </div>

              <div className="rounded-2xl bg-neutral-900 border border-white/10 p-6 flex items-center gap-4">
                <div className="p-3.5 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-400">
                  <Award size={24} />
                </div>
                <div>
                  <span className="text-xs font-bold uppercase tracking-wider text-neutral-400 block">Prizes Claimed</span>
                  <span className="text-2xl font-black text-white">{totalPrizes}</span>
                </div>
              </div>
            </div>

            {/* User Account Info Details */}
            <div className="rounded-2xl bg-neutral-900 border border-white/10 p-6 sm:p-8 space-y-6">
              <h2 className="text-lg font-bold uppercase tracking-wider text-white flex items-center gap-2">
                <UserIcon className="text-amber-400" size={20} />
                Account Credentials
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                  <span className="text-xs font-semibold text-neutral-400 block mb-1">Username</span>
                  <p className="font-bold text-white">{user?.username}</p>
                </div>

                <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                  <span className="text-xs font-semibold text-neutral-400 block mb-1">Email Address</span>
                  <p className="font-bold text-white">{user?.email}</p>
                </div>

                <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                  <span className="text-xs font-semibold text-neutral-400 mb-1 flex items-center gap-1.5">
                    <Phone size={13} className="text-amber-500" />
                    Phone Number
                  </span>
                  <p className="font-bold text-white">
                    {user?.phone ? String(user.phone) : 'Not specified'}
                  </p>
                </div>

                <div className="p-4 rounded-xl bg-white/5 border border-white/5">
                  <span className="text-xs font-semibold text-neutral-400 block mb-1">Account Role</span>
                  <p className="font-bold text-amber-400">{user?.role ?? 'USER'}</p>
                </div>
              </div>
            </div>

            {/* Quick Action Banner */}
            <div className="rounded-2xl bg-gradient-to-r from-amber-500/10 via-amber-500/5 to-transparent border border-amber-500/20 p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div>
                <h3 className="font-bold text-white text-base">Ready for your next tournament?</h3>
                <p className="text-xs text-neutral-400">Browse live Free Fire and PUBG brackets open for entry right now.</p>
              </div>
              <NavLink
                to="/tournaments"
                className="inline-flex items-center gap-2 rounded-xl bg-amber-500 px-5 py-2.5 text-xs font-black uppercase tracking-wider text-black hover:bg-amber-400 transition-all shrink-0"
              >
                Browse Tournaments
              </NavLink>
            </div>
          </div>
        ) : (
          /* Security Tab */
          <div className="rounded-2xl bg-neutral-900 border border-white/10 p-6 sm:p-8 space-y-6 max-w-xl">
            <h2 className="text-lg font-bold uppercase tracking-wider text-white flex items-center gap-2">
              <Lock className="text-amber-400" size={20} />
              Change Password
            </h2>

            {passMessage && (
              <div className="rounded-xl border border-emerald-500/30 bg-emerald-500/10 p-4 text-xs font-semibold text-emerald-400 flex items-center gap-2">
                <CheckCircle2 size={16} />
                {passMessage}
              </div>
            )}

            {passError && (
              <div className="rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-xs font-semibold text-red-400 flex items-center gap-2">
                <Shield size={16} />
                {passError}
              </div>
            )}

            <form onSubmit={handlePasswordChange} className="space-y-4">
              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-300 mb-1">
                  Current Password
                </label>
                <input
                  type="password"
                  required
                  value={oldPassword}
                  onChange={(e) => setOldPassword(e.target.value)}
                  className="w-full rounded-xl border border-white/15 bg-black px-4 py-3 text-sm text-white focus:border-amber-500 focus:outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase tracking-wider text-neutral-300 mb-1">
                  New Password
                </label>
                <input
                  type="password"
                  required
                  minLength={6}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  className="w-full rounded-xl border border-white/15 bg-black px-4 py-3 text-sm text-white focus:border-amber-500 focus:outline-none"
                />
              </div>

              <button
                type="submit"
                disabled={isUpdatingPass}
                className="w-full flex items-center justify-center gap-2 rounded-xl bg-amber-500 py-3 text-xs font-black uppercase tracking-wider text-black hover:bg-amber-400 disabled:opacity-60 transition-all cursor-pointer"
              >
                <Shield size={16} />
                {isUpdatingPass ? 'Updating…' : 'Update Password'}
              </button>
            </form>
          </div>
        )}

      </div>
    </div>
  )
}