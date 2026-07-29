import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Homepage/default-homepage/Home'
import DashboardHome from './pages/Homepage/after-login/dashboardHome'
import Tournaments from './pages/Tournaments'
import Host from './pages/Host'
import Contact from './pages/Contact'
import Login from './pages/Login'
import Register from './pages/Register'
import ForgotPassword from './pages/ForgotPassword'
import ResetPassword from './pages/ResetPassword'
import Profile from './pages/Profile'
import TournamentDetail from './pages/TournamentDetails'
import { useAuth } from './context/AuthContext'
function HomeRoute() {
  const { isAuthenticated, isLoading } = useAuth()
  // Avoid a flash of the marketing page while we check for a stored session.
  if (isLoading) {
    return <div className="h-[60vh] bg-white dark:bg-ink-900" />
  }

  return isAuthenticated ? <DashboardHome /> : <Home />
}

export default function App() {
  return (
    <div className="flex flex-col bg-white dark:bg-ink-900">
      <Navbar />
      <main className="flex-1 pt-20">
        <Routes>
          <Route path="/" element={<HomeRoute />} />
          <Route path="/tournaments" element={<Tournaments />} />
          <Route path="/host" element={<Host />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/tournaments/:id" element={<TournamentDetail />} />
        </Routes>
      </main>
      <Footer />
    </div>
  )
}