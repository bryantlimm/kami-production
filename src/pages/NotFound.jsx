import { Link } from 'react-router-dom'

export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center gap-4 bg-ink text-paper">
      <div className="eyebrow">404</div>
      <h1 className="font-display text-3xl font-semibold">Page not found</h1>
      <Link to="/" className="btn-outline-dark mt-4">Back to Home</Link>
    </div>
  )
}
