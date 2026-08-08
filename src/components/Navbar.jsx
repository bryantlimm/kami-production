import { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import whiteLogo from './assets/White_Logo.png';

const links = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About Us' },
  { to: '/booking', label: 'Booking' },
]

export default function Navbar({ dark = true }) {
  const [open, setOpen] = useState(false)
  const base = dark ? 'text-paper' : 'text-ink'

  return (
    <header className={`absolute inset-x-0 top-0 z-40 ${base}`}>
      <nav className="container-x flex items-center justify-between py-6">
        <Link to="/" className="flex items-center">
          <img
            src={whiteLogo}
            alt="Kami Production"
            className="h-10 w-auto"
          />
        </Link>

        <div className="hidden items-center gap-10 md:flex">
          {links.map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              className={({ isActive }) =>
                `font-mono text-xs uppercase tracking-widest transition hover:text-amber ${isActive ? 'text-amber' : ''}`
              }
            >
              {l.label}
            </NavLink>
          ))}
          <Link to="/booking" className={dark ? 'btn-outline-dark' : 'btn-outline'}>
            Book Equipment
          </Link>
        </div>

        <button
          className="flex flex-col gap-1.5 md:hidden"
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
        >
          <span className={`h-0.5 w-6 ${dark ? 'bg-paper' : 'bg-ink'}`} />
          <span className={`h-0.5 w-6 ${dark ? 'bg-paper' : 'bg-ink'}`} />
        </button>
      </nav>

      {open && (
        <div className={`md:hidden ${dark ? 'bg-ink' : 'bg-paper'} px-6 pb-6`}>
          <div className="flex flex-col gap-4">
            {links.map((l) => (
              <Link key={l.to} to={l.to} onClick={() => setOpen(false)} className="font-mono text-sm uppercase tracking-widest">
                {l.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </header>
  )
}
