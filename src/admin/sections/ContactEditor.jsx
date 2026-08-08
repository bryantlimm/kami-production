import { useEffect, useState } from 'react'
import { doc, setDoc } from 'firebase/firestore'
import { db } from '../../firebase/config'
import { useFirestoreDoc } from '../../hooks/useFirestoreDoc'

export default function ContactEditor() {
  const { data, loading } = useFirestoreDoc('content/contact')
  const [form, setForm] = useState({ whatsapp: '', instagram: '' })
  const [status, setStatus] = useState('')

  useEffect(() => {
    if (data) setForm({ whatsapp: data.whatsapp || '', instagram: data.instagram || '' })
  }, [data])

  async function handleSave(e) {
    e.preventDefault()
    setStatus('Saving…')
    await setDoc(doc(db, 'content/contact'), form, { merge: true })
    setStatus('Saved ✓')
    setTimeout(() => setStatus(''), 2000)
  }

  if (loading) return <p className="text-sm text-steel">Loading…</p>

  return (
    <form onSubmit={handleSave} className="max-w-xl flex flex-col gap-5">
      <div>
        <label className="eyebrow mb-2 block">WhatsApp Number</label>
        <input
          value={form.whatsapp} onChange={(e) => setForm({ ...form, whatsapp: e.target.value })}
          placeholder="+62 812 3456 7890"
          className="w-full border border-line px-4 py-3 outline-none focus:border-ink"
        />
        <p className="mt-1 text-xs text-steel">Include country code. Used to build your "Chat on WhatsApp" links.</p>
      </div>
      <div>
        <label className="eyebrow mb-2 block">Instagram Username</label>
        <input
          value={form.instagram} onChange={(e) => setForm({ ...form, instagram: e.target.value })}
          placeholder="@kamiproduction"
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
