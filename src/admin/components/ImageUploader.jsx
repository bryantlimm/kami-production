import { useState } from 'react'
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage'
import { storage } from '../../firebase/config'

// Uploads a single image to Storage under the given folder, calls onUploaded(url)
export default function ImageUploader({ folder, currentUrl, onUploaded, label = 'Image' }) {
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState('')

  async function handleFile(e) {
    const file = e.target.files?.[0]
    if (!file) return
    setError('')
    setUploading(true)
    try {
      const path = `${folder}/${Date.now()}-${file.name}`
      const storageRef = ref(storage, path)
      await uploadBytes(storageRef, file)
      const url = await getDownloadURL(storageRef)
      onUploaded(url)
    } catch (err) {
      setError('Upload failed. Check Storage rules and try again.')
      console.error(err)
    } finally {
      setUploading(false)
    }
  }

  return (
    <div>
      <label className="eyebrow mb-2 block">{label}</label>
      {currentUrl && (
        <img src={currentUrl} alt="" className="mb-3 h-32 w-32 rounded object-cover border border-line" />
      )}
      <input type="file" accept="image/*" onChange={handleFile} disabled={uploading} className="text-sm" />
      {uploading && <p className="mt-1 text-xs text-steel">Uploading…</p>}
      {error && <p className="mt-1 text-xs text-red-600">{error}</p>}
    </div>
  )
}
