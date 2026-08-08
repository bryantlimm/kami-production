import { useState } from 'react'
import { addDoc, collection, deleteDoc, doc, updateDoc } from 'firebase/firestore'
import { db } from '../../firebase/config'
import { useFirestoreCollection } from '../../hooks/useFirestoreCollection'
import ImageUploader from '../components/ImageUploader'

const empty = { name: '', category: '', imageUrl: '' }

export default function ProductsEditor() {
  const { items, loading } = useFirestoreCollection('products')
  const [form, setForm] = useState(empty)
  const [editingId, setEditingId] = useState(null)
  const [status, setStatus] = useState('')

  async function handleSave(e) {
    e.preventDefault()
    setStatus('Saving…')
    if (editingId) {
      await updateDoc(doc(db, 'products', editingId), form)
    } else {
      await addDoc(collection(db, 'products'), form)
    }
    setForm(empty)
    setEditingId(null)
    setStatus('Saved ✓')
    setTimeout(() => setStatus(''), 2000)
  }

  function startEdit(item) {
    setForm({ name: item.name || '', category: item.category || '', imageUrl: item.imageUrl || '' })
    setEditingId(item.id)
  }

  async function handleDelete(id) {
    if (!confirm('Delete this product?')) return
    await deleteDoc(doc(db, 'products', id))
    if (editingId === id) { setForm(empty); setEditingId(null) }
  }

  return (
    <div className="grid gap-10 lg:grid-cols-2">
      <form onSubmit={handleSave} className="flex flex-col gap-4">
        <h2 className="font-display text-lg font-semibold">{editingId ? 'Edit Product' : 'Add Product'}</h2>
        <p className="text-xs text-steel">This is the equipment list shown on the Home page (not the full booking catalog yet).</p>
        <div>
          <label className="eyebrow mb-2 block">Name</label>
          <input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
            placeholder="Sony FX6 Camera" className="w-full border border-line px-4 py-3 outline-none focus:border-ink" />
        </div>
        <div>
          <label className="eyebrow mb-2 block">Category</label>
          <input value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}
            placeholder="Camera" className="w-full border border-line px-4 py-3 outline-none focus:border-ink" />
        </div>
        <ImageUploader folder="products" currentUrl={form.imageUrl} label="Photo" onUploaded={(url) => setForm({ ...form, imageUrl: url })} />
        <div className="flex items-center gap-4">
          <button type="submit" className="btn-primary">{editingId ? 'Update' : 'Add'}</button>
          {editingId && <button type="button" onClick={() => { setForm(empty); setEditingId(null) }} className="btn-outline">Cancel</button>}
          {status && <span className="text-sm text-steel">{status}</span>}
        </div>
      </form>

      <div>
        <h2 className="mb-4 font-display text-lg font-semibold">Products ({items.length})</h2>
        {loading ? <p className="text-sm text-steel">Loading…</p> : (
          <div className="grid grid-cols-2 gap-3">
            {items.map((p) => (
              <div key={p.id} className="border border-line p-3">
                {p.imageUrl && <img src={p.imageUrl} alt={p.name} className="mb-2 aspect-square w-full object-cover" />}
                <p className="text-sm font-medium">{p.name}</p>
                <p className="text-xs text-steel">{p.category}</p>
                <div className="mt-2 flex gap-3 text-xs">
                  <button onClick={() => startEdit(p)} className="hover:underline">Edit</button>
                  <button onClick={() => handleDelete(p.id)} className="text-red-600 hover:underline">Delete</button>
                </div>
              </div>
            ))}
            {items.length === 0 && <p className="text-sm text-steel">No products yet.</p>}
          </div>
        )}
      </div>
    </div>
  )
}
