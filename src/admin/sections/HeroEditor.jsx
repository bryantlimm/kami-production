import { useEffect, useState } from 'react'
import { doc, setDoc } from 'firebase/firestore'
import { db } from '../../firebase/config'
import { useFirestoreDoc } from '../../hooks/useFirestoreDoc'

export default function HeroEditor() {
  const { data, loading } = useFirestoreDoc('content/hero')
  const [form, setForm] = useState({ headline: '', subheadline: '', ctaLabel: '' })
  const [status, setStatus] = useState('')

  useEffect(() => {
    if (data) setForm({ headline: data.headline || '', subheadline: data.subheadline || '', ctaLabel: data.ctaLabel || '' })
  }, [data])

  async function handleSave(e) {
    e.preventDefault()
    setStatus('Saving…')
    await setDoc(doc(db, 'content/hero'), form, { merge: true })
    setStatus('Saved ✓')
    setTimeout(() => setStatus(''), 2000)
  }

  if (loading) return <p className="text-sm text-steel">Loading…</p>

  return (
    <form onSubmit={handleSave} className="max-w-xl flex flex-col gap-5">
      <div>
        <label className="eyebrow mb-2 block">Headline</label>
        <input
          value={form.headline} onChange={(e) => setForm({ ...form, headline: e.target.value })}
          placeholder=""
          className="w-full border border-line px-4 py-3 outline-none focus:border-ink"
        />
      </div>
      <div>
        <label className="eyebrow mb-2 block">Subheadline</label>
        <textarea
          value={form.subheadline} onChange={(e) => setForm({ ...form, subheadline: e.target.value })}
          rows={3}
          className="w-full border border-line px-4 py-3 outline-none focus:border-ink"
        />
      </div>
      <div>
        <label className="eyebrow mb-2 block">Button Label</label>
        <input
          value={form.ctaLabel} onChange={(e) => setForm({ ...form, ctaLabel: e.target.value })}
          placeholder="Book Equipment"
          className="w-full border border-line px-4 py-3 outline-none focus:border-ink"
        />
      </div>
      <div className="flex items-center gap-4">
        <button type="submit" className="btn-primary">Save Changes</button>
        {status && <span className="text-sm text-steel">{status}</span>}
      </div>
    </form>
  )
}
