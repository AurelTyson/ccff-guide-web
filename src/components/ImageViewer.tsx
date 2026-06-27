import { useEffect } from 'react'

export default function ImageViewer({
  src,
  alt,
  onClose,
}: {
  src: string
  alt: string
  onClose: () => void
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', onKey)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = prev
    }
  }, [onClose])

  return (
    <div
      className="viewer"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-label={alt}
    >
      <button className="viewer__close" onClick={onClose} aria-label="Fermer">
        ✕
      </button>
      <img
        className="viewer__img"
        src={src}
        alt={alt}
        onClick={(e) => e.stopPropagation()}
      />
    </div>
  )
}
