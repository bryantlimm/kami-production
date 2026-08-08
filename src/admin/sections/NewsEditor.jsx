import { useState } from 'react'
import { addDoc, collection, deleteDoc, doc, updateDoc } from 'firebase/firestore'
import { db } from '../../firebase/config'
import { useFirestoreCollection } from '../../hooks/useFirestoreCollection'
import ImageUploader from '../components/ImageUploader'

const empty = { title: '', excerpt: '', date: '', imageUrl: '' }

export default function NewsEditor() {
  const { items, loading } = useFirestoreCollection('news', 'date')
  const [form, setForm] = useState(empty)
  const [editingId, setEditingId] = useState(null)
  const [status, setStatus] = useState('')

  async function handleSave(e) {
    e.preventDefault()
    setStatus('Saving…')
    if (editingId) {
      await updateDoc(doc(db, 'news', editingId), form)
    } else {
      await addDoc(collection(db, 'news'), form)
    }
    setForm(empty)
    setEditingId(null)
    setStatus('Saved ✓')
    setTimeout(() => setStatus(''), 2000)
  }

  function startEdit(item) {
    setForm({ title: item.title || '', excerpt: item.excerpt || '', date: item.date || '', imageUrl: item.imageUrl || '' })
    setEditingId(item.id)
  }

  async function handleDelete(id) {
    if (!confirm('Delete this news item?')) return
    await deleteDoc(doc(db, 'news', id))
    if (editingId === id) { setForm(empty); setEditingId(null) }
  }

  return (
    <div className="grid gap-10 lg:grid-cols-2">
      <form onSubmit={handleSave} className="flex flex-col gap-4">
        <h2 className="font-display text-lg font-semibold">{editingId ? 'Edit News Item' : 'Add News Item'}</h2>
        <div>
          <label className="eyebrow mb-2 block">Title</label>
          <input value={form.title} onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="w-full border border-line px-4 py-3 outline-none focus:border-ink" />
        </div>
        <div>
          <label className="eyebrow mb-2 block">Date</label>
          <input type="date" value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })}
            className="w-full border border-line px-4 py-3 outline-none focus:border-ink" />
        </div>
        <div>
          <label className="eyebrow mb-2 block">Excerpt</label>
          <textarea rows={3} value={form.excerpt} onChange={(e) => setForm({ ...form, excerpt: e.target.value })}
            className="w-full border border-line px-4 py-3 outline-none focus:border-ink" />
        </div>
        <ImageUploader folder="news" currentUrl={form.imageUrl} label="Cover Image" onUploaded={(url) => setForm({ ...form, imageUrl: url })} />
        <div className="flex items-center gap-4">
          <button type="submit" className="btn-primary">{editingId ? 'Update' : 'Add'} News</button>
          {editingId && <button type="button" onClick={() => { setForm(empty); setEditingId(null) }} className="btn-outline">Cancel</button>}
          {status && <span className="text-sm text-steel">{status}</span>}
        </div>
      </form>

      <div>
        <h2 className="mb-4 font-display text-lg font-semibold">Published ({items.length})</h2>
        {loading ? <p className="text-sm text-steel">Loading…</p> : (
          <div className="flex flex-col gap-3">
            {items.map((n) => (
              <div key={n.id} className="flex items-center justify-between gap-4 border border-line p-3">
                <div>
                  <p className="font-medium">{n.title}</p>
                  <p className="text-xs text-steel">{n.date}</p>
                </div>
                <div className="flex gap-3 text-xs">
                  <button onClick={() => startEdit(n)} className="hover:underline">Edit</button>
                  <button onClick={() => handleDelete(n.id)} className="text-red-600 hover:underline">Delete</button>
                </div>
              </div>
            ))}
            {items.length === 0 && <p className="text-sm text-steel">No news yet.</p>}
          </div>
        )}
      </div>
    </div>
  )
}
