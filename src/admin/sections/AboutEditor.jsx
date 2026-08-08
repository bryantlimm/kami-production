import { useEffect, useState } from 'react'
import { doc, setDoc } from 'firebase/firestore'
import { db } from '../../firebase/config'
import { useFirestoreDoc } from '../../hooks/useFirestoreDoc'
import ImageUploader from '../components/ImageUploader'

export default function AboutEditor() {
  const { data, loading } = useFirestoreDoc('content/about')
  const [form, setForm] = useState({ shortTitle: '', shortDescription: '', heading: '', body: '', photoUrl: '' })
  const [status, setStatus] = useState('')

  useEffect(() => {
    if (data) setForm({
      shortTitle: data.shortTitle || '',
      shortDescription: data.shortDescription || '',
      heading: data.heading || '',
      body: data.body || '',
      photoUrl: data.photoUrl || '',
    })
  }, [data])

  async function handleSave(e) {
    e.preventDefault()
    setStatus('Saving…')
    await setDoc(doc(db, 'content/about'), form, { merge: true })
    setStatus('Saved ✓')
    setTimeout(() => setStatus(''), 2000)
  }

  if (loading) return <p className="text-sm text-steel">Loading…</p>

  return (
    <form onSubmit={handleSave} className="max-w-2xl flex flex-col gap-6">
      <p className="text-sm text-steel">"Short" fields appear on the Home page. "Heading" and "Body" appear on the full About Us page.</p>

      <div>
        <label className="eyebrow mb-2 block">Home Page — Short Title</label>
        <input value={form.shortTitle} onChange={(e) => setForm({ ...form, shortTitle: e.target.value })}
          className="w-full border border-line px-4 py-3 outline-none focus:border-ink" />
      </div>
      <div>
        <label className="eyebrow mb-2 block">Home Page — Short Description</label>
        <textarea rows={3} value={form.shortDescription} onChange={(e) => setForm({ ...form, shortDescription: e.target.value })}
          className="w-full border border-line px-4 py-3 outline-none focus:border-ink" />
      </div>

      <hr className="border-line" />

      <div>
        <label className="eyebrow mb-2 block">About Page — Heading</label>
        <input value={form.heading} onChange={(e) => setForm({ ...form, heading: e.target.value })}
          className="w-full border border-line px-4 py-3 outline-none focus:border-ink" />
      </div>
      <div>
        <label className="eyebrow mb-2 block">About Page — Body Text (separate paragraphs with a blank line)</label>
        <textarea rows={10} value={form.body} onChange={(e) => setForm({ ...form, body: e.target.value })}
          className="w-full border border-line px-4 py-3 outline-none focus:border-ink" />
      </div>

      <ImageUploader
        folder="about" currentUrl={form.photoUrl} label="About Page Photo"
        onUploaded={(url) => setForm({ ...form, photoUrl: url })}
      />

      <div className="flex items-center gap-4">
        <button type="submit" className="btn-primary">Save Changes</button>
        {status && <span className="text-sm text-steel">{status}</span>}
      </div>
    </form>
  )
}
