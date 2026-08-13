import { Link } from 'react-router-dom'
import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { useFirestoreDoc } from '../hooks/useFirestoreDoc'
import { useFirestoreCollection } from '../hooks/useFirestoreCollection'

export default function Home() {
  const { data: hero } = useFirestoreDoc('content/hero')
  const { data: about } = useFirestoreDoc('content/about')
  const { data: whyUs } = useFirestoreDoc('content/whyUs')
  const { data: contact } = useFirestoreDoc('content/contact')
  const { items: news } = useFirestoreCollection('news', 'date')
  const { items: clients } = useFirestoreCollection('clients')
  const { items: testimonials } = useFirestoreCollection('testimonials')
  const { items: products } = useFirestoreCollection('products')

  return (
    <div className="bg-paper">
      {/* HERO */}
      <section className="relative overflow-hidden bg-ink text-paper">
        <Navbar dark />
        <div className="container-x relative z-10 flex min-h-[92vh] flex-col justify-center pt-24 pb-16">
          <div className="eyebrow mb-6">Production Equipment Rental</div>
          <h1 className="max-w-3xl font-display text-5xl font-semibold leading-[1.05] tracking-tight md:text-7xl">
            {hero?.headline || ''}
          </h1>
          <p className="mt-6 max-w-lg text-steel">
            {hero?.subheadline || ''}
          </p>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Link to="/booking" className="btn-primary">
              {hero?.ctaLabel || 'Book Equipment'} →
            </Link>
            <Link to="/about" className="btn-outline-dark">
              More About Us
            </Link>
          </div>
        </div>
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-ink via-transparent to-transparent" />
      </section>

      {/* ABOUT BRIEF */}
      <section className="container-x py-24 md:py-32">
        <div className="grid gap-10 md:grid-cols-12">
          <div className="md:col-span-4">
            <div className="eyebrow mb-4">About Us</div>
            <h2 className="font-display text-3xl font-semibold leading-tight">
              {about?.shortTitle || ''}
            </h2>
          </div>
          <div className="md:col-span-6 md:col-start-6">
            <p className="text-lg leading-relaxed text-steel">
              {about?.shortDescription ||
                'Kami Production started on real sets, solving real gear problems. Today we run a maintained inventory of cameras, lighting and grip equipment, ready for crews who can\u2019t afford downtime.'}
            </p>
            <Link to="/about" className="btn-outline mt-8 inline-flex">
              More About Us →
            </Link>
          </div>
        </div>
      </section>

      {/* NEWS */}
      {news.length > 0 && (
        <section className="border-y border-line bg-panel/[0.02] py-24">
          <div className="container-x">
            <div className="eyebrow mb-4">Info & Updates</div>
            <h2 className="mb-12 font-display text-3xl font-semibold">Latest from Kami</h2>
            <div className="grid gap-8 md:grid-cols-3">
              {news.slice(0, 3).map((n) => (
                <article key={n.id} className="frame-brackets p-1">
                  {n.imageUrl && (
                    <img src={n.imageUrl} alt={n.title} className="mb-4 aspect-[4/3] w-full object-cover" />
                  )}
                  <div className="eyebrow mb-2">{n.date}</div>
                  <h3 className="font-display text-lg font-semibold">{n.title}</h3>
                  <p className="mt-2 text-sm text-steel">{n.excerpt}</p>
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* WHY US */}
      <section className="container-x py-24 md:py-32">
        <div className="eyebrow mb-4">Why Us</div>
        <h2 className="mb-14 max-w-2xl font-display text-3xl font-semibold leading-tight">
          {whyUs?.title || 'Every unit checked before it leaves our shelf.'}
        </h2>
        <div className="grid gap-10 md:grid-cols-3">
          {(whyUs?.points || [
            { title: 'Maintained Gear', description: 'Every item is tested and cleaned between rentals.' },
            { title: 'Flexible Booking', description: 'Daily, weekly and project-based rental terms.' },
            { title: 'On-Set Support', description: 'Technical support reachable throughout your shoot.' },
          ]).map((p, i) => (
            <div key={i} className="border-t border-line pt-6">
              <div className="font-mono text-xs text-amber">{String(i + 1).padStart(2, '0')}</div>
              <h3 className="mt-3 font-display text-lg font-semibold">{p.title}</h3>
              <p className="mt-2 text-sm text-steel">{p.description}</p>
            </div>
          ))}
        </div>
      </section>

      {/* TESTIMONIALS & CLIENTS */}
      {(testimonials.length > 0 || clients.length > 0) && (
        <section className="bg-ink py-24 text-paper md:py-32">
          <div className="container-x">
            {testimonials.length > 0 && (
              <div className="mb-20 grid gap-10 md:grid-cols-2">
                {testimonials.slice(0, 2).map((t) => (
                  <div key={t.id} className="border-l-2 border-amber pl-6">
                    <p className="font-display text-xl leading-snug">“{t.quote}”</p>
                    <div className="eyebrow mt-4">{t.author}{t.role ? ` — ${t.role}` : ''}</div>
                  </div>
                ))}
              </div>
            )}
            {clients.length > 0 && (
              <div>
                <div className="eyebrow mb-8 text-steel">Trusted By</div>
                <div className="flex flex-wrap items-center gap-x-12 gap-y-6 opacity-80">
                  {clients.map((c) => (
                    <img key={c.id} src={c.logoUrl} alt={c.name} className="h-8 object-contain grayscale invert" />
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* PRODUCTS BRIEF */}
      {products.length > 0 && (
        <section className="container-x py-24 md:py-32">
          <div className="mb-12 flex items-end justify-between">
            <div>
              <div className="eyebrow mb-4">Equipment</div>
              <h2 className="font-display text-3xl font-semibold">A sample of our inventory</h2>
            </div>
            <Link to="/booking" className="btn-outline hidden md:inline-flex">More Products →</Link>
          </div>
          <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4">
            {products.slice(0, 4).map((p) => (
              <div key={p.id} className="frame-brackets p-1">
                {p.imageUrl && <img src={p.imageUrl} alt={p.name} className="aspect-square w-full object-cover" />}
                <div className="mt-3 font-mono text-[11px] uppercase tracking-widest text-steel">{p.category}</div>
                <h3 className="font-display text-base font-semibold">{p.name}</h3>
              </div>
            ))}
          </div>
          <Link to="/booking" className="btn-outline mt-10 inline-flex md:hidden">More Products →</Link>
        </section>
      )}

      {/* CONTACT / BOOKING CTA */}
      <section className="border-t border-line bg-panel/[0.03] py-24 md:py-32">
        <div className="container-x flex flex-col items-start justify-between gap-8 md:flex-row md:items-end">
          <div>
            <div className="eyebrow mb-4">Get In Touch</div>
            <h2 className="max-w-lg font-display text-3xl font-semibold leading-tight">
              Ready for your next shoot? Reserve your gear today.
            </h2>
          </div>
          <div className="flex flex-wrap gap-4">
            {contact?.whatsapp && (
              <a
                href={`https://wa.me/${contact.whatsapp.replace(/\D/g, '')}`}
                target="_blank" rel="noreferrer"
                className="btn-primary"
              >
                WhatsApp Us →
              </a>
            )}
            <Link to="/booking" className="btn-outline">Go to Booking Portal</Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  )
}
