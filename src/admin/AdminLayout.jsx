import { NavLink, Outlet } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function AdminLayout() {
  const { user, logout } = useAuth()

  return (
    <div className="flex min-h-screen bg-paper">
      <aside className="flex w-64 flex-col justify-between border-r border-line bg-ink text-paper">
        <div>
          <div className="border-b border-white/10 px-6 py-6">
            <div className="font-display text-base font-semibold">
              KAMI<span className="text-amber">.</span>PRODUCTION
            </div>
            <p className="eyebrow mt-1">Admin</p>
          </div>
          <nav className="flex flex-col gap-1 p-3">
            <NavLink
              to="/admin/website"
              className={({ isActive }) =>
                `rounded px-3 py-2 font-mono text-xs uppercase tracking-widest transition ${
                  isActive ? 'bg-amber text-ink' : 'text-steel hover:bg-white/5 hover:text-paper'
                }`
              }
            >
              Website
            </NavLink>
          </nav>
        </div>
        <div className="border-t border-white/10 p-4">
          <p className="mb-3 truncate text-xs text-steel">{user?.email}</p>
          <button onClick={logout} className="btn-outline-dark w-full justify-center text-xs">
            Sign Out
          </button>
        </div>
      </aside>

      <main className="flex-1 overflow-y-auto">
        <Outlet />
      </main>
    </div>
  )
}
