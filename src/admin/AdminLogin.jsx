import { useState } from 'react'
import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function AdminLogin() {
  const { user, loading, login } = useAuth()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  if (!loading && user) return <Navigate to="/admin/website" replace />

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setSubmitting(true)
    try {
      await login(email, password)
    } catch (err) {
      setError('Invalid email or password.')
    } finally {
      setSubmitting(false)
    }
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
