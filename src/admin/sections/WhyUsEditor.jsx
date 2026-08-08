import { useEffect, useState } from 'react'
import { doc, setDoc } from 'firebase/firestore'
import { db } from '../../firebase/config'
import { useFirestoreDoc } from '../../hooks/useFirestoreDoc'

const emptyPoint = { title: '', description: '' }

export default function WhyUsEditor() {
  const { data, loading } = useFirestoreDoc('content/whyUs')
  const [title, setTitle] = useState('')
  const [points, setPoints] = useState([{ ...emptyPoint }])
  const [status, setStatus] = useState('')

  useEffect(() => {
    if (data) {
      setTitle(data.title || '')
      setPoints(data.points?.length ? data.points : [{ ...emptyPoint }])
    }
  }, [data])

  function updatePoint(i, key, value) {
    const next = [...points]
    next[i] = { ...next[i], [key]: value }
    setPoints(next)
  }

  function addPoint() {
    setPoints([...points, { ...emptyPoint }])
  }

  function removePoint(i) {
    setPoints(points.filter((_, idx) => idx !== i))
  }

  async function handleSave(e) {
    e.preventDefault()
    setStatus('Saving…')
    await setDoc(doc(db, 'content/whyUs'), { title, points }, { merge: true })
    setStatus('Saved ✓')
    setTimeout(() => setStatus(''), 2000)
  }

  if (loading) return <p className="text-sm text-steel">Loading…</p>

  return (
    <form onSubmit={handleSave} className="max-w-2xl flex flex-col gap-6">
      <div>
        <label className="eyebrow mb-2 block">Section Title</label>
        <input value={title} onChange={(e) => setTitle(e.target.value)}
          className="w-full border border-line px-4 py-3 outline-none focus:border-ink" />
      </div>

      <div className="flex flex-col gap-4">
        {points.map((p, i) => (
          <div key={i} className="border border-line p-4">
            <div className="mb-3 flex items-center justify-between">
              <span className="eyebrow">Point {i + 1}</span>
              <button type="button" onClick={() => removePoint(i)} className="text-xs text-red-600 hover:underline">Remove</button>
            </div>
            <input
              value={p.title} onChange={(e) => updatePoint(i, 'title', e.target.value)}
              placeholder="Title" className="mb-2 w-full border border-line px-3 py-2 outline-none focus:border-ink"
            />
            <textarea
              value={p.description} onChange={(e) => updatePoint(i, 'description', e.target.value)}
              placeholder="Description" rows={2} className="w-full border border-line px-3 py-2 outline-none focus:border-ink"
            />
          </div>
        ))}
        <button type="button" onClick={addPoint} className="btn-outline self-start">+ Add Point</button>
      </div>

      <div className="flex items-center gap-4">
        <button type="submit" className="btn-primary">Save Changes</button>
        {status && <span className="text-sm text-steel">{status}</span>}
      </div>
    </form>
  )
}
