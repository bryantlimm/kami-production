import { useEffect, useState } from 'react'
import { doc, setDoc } from 'firebase/firestore'
import { db } from '../../firebase/config'
import { useFirestoreDoc } from '../../hooks/useFirestoreDoc'

export default function FooterEditor() {
  const { data, loading } = useFirestoreDoc('content/footer')
  const [form, setForm] = useState({ companyName: '', tagline: '', address: '' })
  const [status, setStatus] = useState('')

  useEffect(() => {
    if (data) setForm({ companyName: data.companyName || '', tagline: data.tagline || '', address: data.address || '' })
  }, [data])

  async function handleSave(e) {
    e.preventDefault()
    setStatus('Saving…')
    await setDoc(doc(db, 'content/footer'), form, { merge: true })
    setStatus('Saved ✓')
    setTimeout(() => setStatus(''), 2000)
  }

  if (loading) return <p className="text-sm text-steel">Loading…</p>

  return (
    <form onSubmit={handleSave} className="max-w-xl flex flex-col gap-5">
      <div>
        <label className="eyebrow mb-2 block">Company Name</label>
        <input value={form.companyName} onChange={(e) => setForm({ ...form, companyName: e.target.value })}
          placeholder="Kami Production" className="w-full border border-line px-4 py-3 outline-none focus:border-ink" />
      </div>
      <div>
        <label className="eyebrow mb-2 block">Tagline</label>
        <textarea rows={2} value={form.tagline} onChange={(e) => setForm({ ...form, tagline: e.target.value })}
          className="w-full border border-line px-4 py-3 outline-none focus:border-ink" />
      </div>
      <div>
        <label className="eyebrow mb-2 block">Address (optional)</label>
        <textarea rows={2} value={form.address} onChange={(e) => setForm({ ...form, address: e.target.value })}
          className="w-full border border-line px-4 py-3 outline-none focus:border-ink" />
      </div>
      <div className="flex items-center gap-4">
        <button type="submit" className="btn-primary">Save Changes</button>
        {status && <span className="text-sm text-steel">{status}</span>}
      </div>
    </form>
  )
}
