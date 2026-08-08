import { Link } from 'react-router-dom'
import { useFirestoreDoc } from '../hooks/useFirestoreDoc'

export default function Footer() {
  const { data } = useFirestoreDoc('content/footer')
  const { data: contact } = useFirestoreDoc('content/contact')

  const companyName = data?.companyName || 'Kami Production'
  const tagline = data?.tagline || 'Camera, lighting and grip equipment for every production.'
  const address = data?.address || ''
  const year = new Date().getFullYear()

  return (
    <footer className="border-t border-line bg-ink text-paper">
      <div className="container-x grid gap-10 py-16 md:grid-cols-4">
        <div className="md:col-span-2">
          <div className="font-display text-lg font-semibold">
            KAMI<span className="text-amber">.</span>PRODUCTION
          </div>
          <p className="mt-3 max-w-sm text-sm text-steel">{tagline}</p>
        </div>

        <div>
          <div className="eyebrow mb-4">Navigate</div>
          <div className="flex flex-col gap-2 text-sm">
            <Link to="/" className="hover:text-amber">Home</Link>
            <Link to="/about" className="hover:text-amber">About Us</Link>
            <Link to="/booking" className="hover:text-amber">Booking</Link>
          </div>
        </div>

        <div>
          <div className="eyebrow mb-4">Contact</div>
          <div className="flex flex-col gap-2 text-sm text-steel">
            {contact?.whatsapp && (
              <a className="hover:text-amber" href={`https://wa.me/${contact.whatsapp.replace(/\D/g, '')}`} target="_blank" rel="noreferrer">
                WhatsApp: {contact.whatsapp}
              </a>
            )}
            {contact?.instagram && (
              <a className="hover:text-amber" href={`https://instagram.com/${contact.instagram.replace('@', '')}`} target="_blank" rel="noreferrer">
                Instagram: {contact.instagram}
              </a>
            )}
            {address && <p>{address}</p>}
          </div>
        </div>
      </div>

      <div className="container-x flex flex-col items-center justify-between gap-2 border-t border-line py-6 text-xs text-steel md:flex-row">
        <p>© {year} {companyName}. All rights reserved.</p>
        <Link to="/admin" className="hover:text-amber">Admin</Link>
      </div>
    </footer>
  )
}
