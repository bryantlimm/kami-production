import { useState, useEffect } from 'react'
import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from 'firebase/auth'
import { auth } from '../firebase/config'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'

export default function Booking() {
  const [user, setUser] = useState(null)
  const [checking, setChecking] = useState(true)
  const [mode, setMode] = useState('signin') // signin | signup
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    const unsub = onAuthStateChanged(auth, (u) => {
      setUser(u)
      setChecking(false)
    })
    return unsub
  }, [])

  async function handleSubmit(e) {
    e.preventDefault()
    setError('')
    setSubmitting(true)
    try {
      if (mode === 'signin') {
        await signInWithEmailAndPassword(auth, email, password)
      } else {
        await createUserWithEmailAndPassword(auth, email, password)
      }
    } catch (err) {
      setError(err.message.replace('Firebase: ', ''))
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="bg-paper">
      <section className="relative bg-ink text-paper">
        <Navbar dark />
        <div className="container-x flex min-h-[40vh] flex-col justify-end pb-14 pt-32">
          <div className="eyebrow mb-4">Booking Portal</div>
          <h1 className="max-w-2xl font-display text-4xl font-semibold leading-tight md:text-5xl">
            Reserve your equipment
          </h1>
        </div>
      </section>

      <section className="container-x py-20 md:py-28">
        {checking ? (
          <p className="font-mono text-xs uppercase tracking-widest text-steel">Loading…</p>
        ) : user ? (
          <div className="frame-brackets max-w-xl p-8">
            <div className="eyebrow mb-4">Signed In</div>
            <h2 className="font-display text-2xl font-semibold">Welcome, {user.email}</h2>
            <p className="mt-4 text-steel">
              Our online booking system is coming soon. In the meantime, reach out to us directly via
              WhatsApp or Instagram for further assistant or click "Book Now" to reserve equipment.
            </p>
            
            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href="https://sewahtkami.sewascale.com"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-primary"
              >
                Book Now
              </a>
              <button onClick={() => signOut(auth)} className="btn-outline">
                Sign Out
              </button>
            </div>

          </div>
        ) : (
          <div className="max-w-md">
            <div className="mb-8 flex gap-2 font-mono text-xs uppercase tracking-widest">
              <button
                onClick={() => setMode('signin')}
                className={`border-b-2 pb-2 ${mode === 'signin' ? 'border-amber text-ink' : 'border-transparent text-steel'}`}
              >
                Sign In
              </button>
              <span className="text-steel">/</span>
              <button
                onClick={() => setMode('signup')}
                className={`border-b-2 pb-2 ${mode === 'signup' ? 'border-amber text-ink' : 'border-transparent text-steel'}`}
              >
                Create Account
              </button>
            </div>

            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <div>
                <label className="eyebrow mb-2 block">Email</label>
                <input
                  type="email" required value={email} onChange={(e) => setEmail(e.target.value)}
                  className="w-full border border-line bg-transparent px-4 py-3 outline-none focus:border-ink"
                />
              </div>
              <div>
                <label className="eyebrow mb-2 block">Password</label>
                <input
                  type="password" required minLength={6} value={password} onChange={(e) => setPassword(e.target.value)}
                  className="w-full border border-line bg-transparent px-4 py-3 outline-none focus:border-ink"
                />
              </div>
              {error && <p className="text-sm text-red-600">{error}</p>}
              <button type="submit" disabled={submitting} className="btn-primary mt-2 justify-center disabled:opacity-50">
                {submitting ? 'Please wait…' : mode === 'signin' ? 'Sign In' : 'Create Account'}
              </button>
            </form>
          </div>
        )}
      </section>

      <Footer />
    </div>
  )
}
