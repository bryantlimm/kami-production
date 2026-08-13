import { useState } from 'react'
import { Navigate } from 'react-router-dom'
import { doc, getDoc } from 'firebase/firestore'
import { db } from '../firebase/config'
import { useAuth } from '../context/AuthContext'

export default function AdminLogin() {
  const { user, isAdmin, loading, login, logout } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  // Already signed in as a confirmed admin — go straight to the dashboard.
  if (!loading && user && isAdmin) return <Navigate to="/admin/website" replace />

  // Signed in (e.g. from the booking portal in another tab) but NOT an admin —
  // don't show the login form, since they're already authenticated as the wrong account.
  if (!loading && user && !isAdmin) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-ink px-6 text-paper">
        <div className="w-full max-w-sm text-center">
          <div className="font-display text-lg font-semibold">
            KAMI<span className="text-amber">.</span>PRODUCTION
          </div>
          <p className="eyebrow mt-2 mb-6">Admin Portal</p>
          <p className="mb-6 text-sm text-steel">
            The account <span className="text-paper">{user.email}</span> doesn't have admin access.
          </p>
          <button onClick={logout} className="btn-outline-dark">
            Sign Out
          </button>
        </div>
      </div>
    )
  }

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setSubmitting(true)
    try {
      const credential = await login(email, password)
      const adminSnap = await getDoc(doc(db, 'admins', credential.user.uid))
      if (!adminSnap.exists()) {
        await logout()
        setError('This account does not have admin access.')
      }
      // If it IS an admin, AuthContext picks up the new state and the
      // redirect above takes over on the next render.
    } catch (err) {
      setError('Invalid email or password.')
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-ink text-paper font-mono text-xs uppercase tracking-widest">
        Loading…
      </div>
    )
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-ink px-6 text-paper">
      <div className="w-full max-w-sm">
        <div className="mb-8 text-center">
          <div className="font-display text-lg font-semibold">
            KAMI<span className="text-amber">.</span>PRODUCTION
          </div>
          <p className="eyebrow mt-2">Admin Portal</p>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <div>
            <label className="eyebrow mb-2 block">Email</label>
            <input
              type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
              className="w-full border border-white/20 bg-transparent px-4 py-3 outline-none focus:border-amber"
            />
          </div>
          <div>
            <label className="eyebrow mb-2 block">Password</label>
            <input
              type="password" required value={password} onChange={(e) => setPassword(e.target.value)}
              className="w-full border border-white/20 bg-transparent px-4 py-3 outline-none focus:border-amber"
            />
          </div>
          {error && <p className="text-sm text-red-400">{error}</p>}
          <button type="submit" disabled={submitting} className="btn-primary mt-2 justify-center disabled:opacity-50">
            {submitting ? 'Signing in…' : 'Sign In'}
          </button>
        </form>
      </div>
    </div>
  )
}
