import { useEffect, useState } from 'react'
import { collection, onSnapshot, orderBy, query } from 'firebase/firestore'
import { db } from '../firebase/config'

// Live-subscribes to a collection, optionally ordered by a field
export function useFirestoreCollection(path, orderField) {
  const [items, setItems] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const ref = collection(db, path)
    const q = orderField ? query(ref, orderBy(orderField, 'desc')) : ref
    const unsub = onSnapshot(q, (snap) => {
      setItems(snap.docs.map((d) => ({ id: d.id, ...d.data() })))
      setLoading(false)
    })
    return unsub
  }, [path, orderField])

  return { items, loading }
}
