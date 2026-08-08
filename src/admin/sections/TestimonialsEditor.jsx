import { useState } from 'react'
import { addDoc, collection, deleteDoc, doc, updateDoc } from 'firebase/firestore'
import { db } from '../../firebase/config'
import { useFirestoreCollection } from '../../hooks/useFirestoreCollection'

const empty = { quote: '', author: '', role: '' }

export default function TestimonialsEditor() {
  const { items, loading } = useFirestoreCollection('testimonials')
  const [form, setForm] = useState(empty)
  const [editingId, setEditingId] = useState(null)
  const [status, setStatus] = useState('')

  async function handleSave(e) {
    e.preventDefault()
    setStatus('Saving…')
    if (editingId) {
      await updateDoc(doc(db, 'testimonials', editingId), form)
    } else {
      await addDoc(collection(db, 'testimonials'), form)
    }
    setForm(empty)
    setEditingId(null)
    setStatus('Saved ✓')
    setTimeout(() => setStatus(''), 2000)
  }

  function startEdit(item) {
    setForm({ quote: item.quote || '', author: item.author || '', role: item.role || '' })
    setEditingId(item.id)
  }

  async function handleDelete(id) {
    if (!confirm('Delete this testimonial?')) return
    await deleteDoc(doc(db, 'testimonials', id))
    if (editingId === id) { setForm(empty); setEditingId(null) }
  }

  return (
    <div className="grid gap-10 lg:grid-cols-2">
      <form onSubmit={handleSave} className="flex flex-col gap-4">
        <h2 className="font-display text-lg font-semibold">{editingId ? 'Edit Testimonial' : 'Add Testimonial'}</h2>
        <div>
          <label className="eyebrow mb-2 block">Quote</label>
          <textarea rows={4} value={form.quote} onChange={(e) => setForm({ ...form, quote: e.target.value })}
            className="w-full border border-line px-4 py-3 outline-none focus:border-ink" />
        </div>
        <div>
          <label className="eyebrow mb-2 block">Author Name</label>
          <input value={form.author} onChange={(e) => setForm({ ...form, author: e.target.value })}
            className="w-full border border-line px-4 py-3 outline-none focus:border-ink" />
        </div>
        <div>
          <label className="eyebrow mb-2 block">Role / Company (optional)</label>
          <input value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })}
            className="w-full border border-line px-4 py-3 outline-none focus:border-ink" />
        </div>
        <div className="flex items-center gap-4">
          <button type="submit" className="btn-primary">{editingId ? 'Update' : 'Add'}</button>
          {editingId && <button type="button" onClick={() => { setForm(empty); setEditingId(null) }} className="btn-outline">Cancel</button>}
          {status && <span className="text-sm text-steel">{status}</span>}
        </div>
      </form>

      <div>
        <h2 className="mb-4 font-display text-lg font-semibold">Testimonials ({items.length})</h2>
        {loading ? <p className="text-sm text-steel">Loading…</p> : (
          <div className="flex flex-col gap-3">
            {items.map((t) => (
              <div key={t.id} className="border border-line p-3">
                <p className="text-sm">"{t.quote}"</p>
                <p className="mt-1 text-xs text-steel">{t.author}{t.role ? ` — ${t.role}` : ''}</p>
                <div className="mt-2 flex gap-3 text-xs">
                  <button onClick={() => startEdit(t)} className="hover:underline">Edit</button>
                  <button onClick={() => handleDelete(t.id)} className="text-red-600 hover:underline">Delete</button>
                </div>
              </div>
            ))}
            {items.length === 0 && <p className="text-sm text-steel">No testimonials yet.</p>}
          </div>
        )}
      </div>
    </div>
  )
}
