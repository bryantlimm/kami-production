import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function ProtectedRoute({ children }) {
  const { user, isAdmin, loading } = useAuth()

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-ink text-paper font-mono text-xs uppercase tracking-widest">
        Loading…
      </div>
    )
  }

  // Must be signed in AND present in the admins collection — a booking-portal
  // account is signed in but is not an admin, so it gets sent back to /admin.
  if (!user || !isAdmin) return <Navigate to="/admin" replace />

  return children
}
