import { useEffect, useState } from 'react'
import { doc, onSnapshot } from 'firebase/firestore'
import { db } from '../firebase/config'

// Live-subscribes to a single document, e.g. content/hero
export function useFirestoreDoc(path) {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const ref = doc(db, path)
    const unsub = onSnapshot(ref, (snap) => {
      setData(snap.exists() ? snap.data() : null)
      setLoading(false)
    })
    return unsub
  }, [path])

  return { data, loading }
}
