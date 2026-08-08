import Navbar from '../components/Navbar'
import Footer from '../components/Footer'
import { useFirestoreDoc } from '../hooks/useFirestoreDoc'

export default function About() {
  const { data } = useFirestoreDoc('content/about')

  const paragraphs = (data?.body || `Kami Production is a production equipment rental service supplying camera, lighting and grip gear to film, photo and event crews.

We started on real sets, fixing real gear problems — a missing adapter, a light that died mid-shoot, a rental house that didn't answer the phone. That experience shaped how we run: every unit is checked before and after every booking, our team knows the gear well enough to help you choose the right kit, and support stays reachable while your production runs.

Today we work with independent filmmakers, agencies and event teams who need equipment they can rely on, on terms that fit how they actually shoot.`).split('\n\n')

  return (
    <div className="bg-paper">
      <section className="relative bg-ink text-paper">
        <Navbar dark />
        <div className="container-x flex min-h-[50vh] flex-col justify-end pb-16 pt-32">
          <div className="eyebrow mb-4">About Us</div>
          <h1 className="max-w-2xl font-display text-4xl font-semibold leading-tight md:text-6xl">
            {data?.heading || 'The people and process behind the gear.'}
          </h1>
        </div>
      </section>

      <section className="container-x grid gap-12 py-20 md:grid-cols-12 md:py-28">
        <div className="frame-brackets p-1 md:col-span-5">
          <img
            src={data?.photoUrl || 'https://images.unsplash.com/photo-1522199755839-a2bacb67c546?w=900&q=80'}
            alt="Kami Production team on set"
            className="aspect-[4/5] w-full object-cover"
          />
        </div>
        <div className="md:col-span-6 md:col-start-7">
          {paragraphs.map((p, i) => (
            <p key={i} className="mb-6 text-lg leading-relaxed text-steel">
              {p}
            </p>
          ))}
        </div>
      </section>

      <Footer />
    </div>
  )
}
