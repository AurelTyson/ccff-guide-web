import { useEffect, useState } from 'react'

const VIGILANCE_URL = 'https://www.risque-prevention-incendie.fr/herault/'

export default function Vigilance() {
  const [online, setOnline] = useState(
    typeof navigator === 'undefined' ? true : navigator.onLine,
  )

  useEffect(() => {
    const goOnline = () => setOnline(true)
    const goOffline = () => setOnline(false)
    window.addEventListener('online', goOnline)
    window.addEventListener('offline', goOffline)
    return () => {
      window.removeEventListener('online', goOnline)
      window.removeEventListener('offline', goOffline)
    }
  }, [])

  return (
    <div className="embed-page">
      <p className="embed-note">
        Information journalière des services de l’État de l’Hérault (mise à jour
        vers 18 h).{' '}
        <a href={VIGILANCE_URL} target="_blank" rel="noopener noreferrer">
          Ouvrir le site officiel ↗
        </a>
      </p>

      {online ? (
        <div className="embed-frame">
          <iframe
            src={VIGILANCE_URL}
            title="Carte de vigilance incendie de forêt — Hérault"
            loading="lazy"
          />
        </div>
      ) : (
        <div className="callout callout--warn">
          <div className="callout__title">📡 Connexion requise</div>
          <p>
            Cette information est mise à jour en direct et nécessite une
            connexion internet. Reconnectez-vous, puis rouvrez cette page.
          </p>
        </div>
      )}
    </div>
  )
}
