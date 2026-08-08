import { useState } from 'react'
import { addDoc, collection, deleteDoc, doc } from 'firebase/firestore'
import { db } from '../../firebase/config'
import { useFirestoreCollection } from '../../hooks/useFirestoreCollection'
import ImageUploader from '../components/ImageUploader'

const empty = { name: '', logoUrl: '' }

export default function ClientsEditor() {
  const { items, loading } = useFirestoreCollection('clients')
  const [form, setForm] = useState(empty)
  const [status, setStatus] = useState('')

  async function handleSave(e) {
    e.preventDefault()
    if (!form.logoUrl) { setStatus('Upload a logo first'); return }
    setStatus('Saving…')
    await addDoc(collection(db, 'clients'), form)
    setForm(empty)
    setStatus('Saved ✓')
    setTimeout(() => setStatus(''), 2000)
  }

  async function handleDelete(id) {
    if (!confirm('Remove this client logo?')) return
    await deleteDoc(doc(db, 'clients', id))
  }

  return (
    <div className="grid gap-10 lg:grid-cols-2">
      <form onSubmit={handleSave} className="flex flex-col gap-4">
        <h2 className="font-display text-lg font-semibold">Add Client Logo</h2>
        <div>
          <label className="eyebrow mb-2 block">Client Name</label>
          <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="w-full border border-line px-4 py-3 outline-none focus:border-ink" />
        </div>
        <ImageUploader folder="clients" currentUrl={form.logoUrl} label="Logo" onUploaded={(url) => setForm({ ...form, logoUrl: url })} />
        <div className="flex items-center gap-4">
          <button type="submit" className="btn-primary">Add Client</button>
          {status && <span className="text-sm text-steel">{status}</span>}
        </div>
      </form>

      <div>
        <h2 className="mb-4 font-display text-lg font-semibold">Clients ({items.length})</h2>
        {loading ? <p className="text-sm text-steel">Loading…</p> : (
          <div className="grid grid-cols-2 gap-3">
            {items.map((c) => (
              <div key={c.id} className="flex flex-col items-center gap-2 border border-line p-4">
                <img src={c.logoUrl} alt={c.name} className="h-10 object-contain" />
                <p className="text-xs">{c.name}</p>
                <button onClick={() => handleDelete(c.id)} className="text-xs text-red-600 hover:underline">Delete</button>
              </div>
            ))}
            {items.length === 0 && <p className="text-sm text-steel">No clients yet.</p>}
          </div>
        )}
      </div>
    </div>
  )
}
