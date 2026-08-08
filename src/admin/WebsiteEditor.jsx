import { useState } from 'react'
import HeroEditor from './sections/HeroEditor'
import AboutEditor from './sections/AboutEditor'
import WhyUsEditor from './sections/WhyUsEditor'
import NewsEditor from './sections/NewsEditor'
import ClientsEditor from './sections/ClientsEditor'
import TestimonialsEditor from './sections/TestimonialsEditor'
import ProductsEditor from './sections/ProductsEditor'
import ContactEditor from './sections/ContactEditor'
import FooterEditor from './sections/FooterEditor'

const tabs = [
  { key: 'hero', label: 'Hero Section', Comp: HeroEditor },
  { key: 'about', label: 'About Us', Comp: AboutEditor },
  { key: 'whyUs', label: 'Why Us', Comp: WhyUsEditor },
  { key: 'news', label: 'News', Comp: NewsEditor },
  { key: 'clients', label: 'Clients', Comp: ClientsEditor },
  { key: 'testimonials', label: 'Testimonials', Comp: TestimonialsEditor },
  { key: 'products', label: 'Products', Comp: ProductsEditor },
  { key: 'contact', label: 'Contact Details', Comp: ContactEditor },
  { key: 'footer', label: 'Footer', Comp: FooterEditor },
]

export default function WebsiteEditor() {
  const [active, setActive] = useState('hero')
  const ActiveComp = tabs.find((t) => t.key === active)?.Comp

  return (
    <div>
      <div className="border-b border-line bg-white px-8 py-6">
        <h1 className="font-display text-2xl font-semibold">Website Content</h1>
        <p className="text-sm text-steel">Everything here updates the public site immediately after you save.</p>
      </div>

      <div className="flex gap-2 overflow-x-auto border-b border-line bg-white px-8 py-3">
        {tabs.map((t) => (
          <button
            key={t.key}
            onClick={() => setActive(t.key)}
            className={`whitespace-nowrap rounded-full px-4 py-2 font-mono text-xs uppercase tracking-widest transition ${
              active === t.key ? 'bg-ink text-paper' : 'border border-line text-steel hover:border-ink hover:text-ink'
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="p-8">
        {ActiveComp && <ActiveComp />}
      </div>
    </div>
  )
}
