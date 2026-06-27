import { useEffect, useState } from 'react'
import { asset } from '../lib/asset'

const VIGILANCE_URL = 'https://www.risque-prevention-incendie.fr/herault/'
const DFCI_MAP = asset('maps/carroyage-dfci.jpg')

export default function Cartes() {
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
    <div className="page">
      <section>
        <h2>Vigilance incendie de forêt</h2>
        <p className="note">
          Information journalière des services de l’État de l’Hérault (mise à
          jour vers 18 h).{' '}
          <a href={VIGILANCE_URL} target="_blank" rel="noopener noreferrer">
            Ouvrir le site officiel ↗
          </a>
        </p>
        {online ? (
          <div className="map-embed">
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
              Cette carte est mise à jour en direct et nécessite une connexion
              internet.
            </p>
          </div>
        )}
      </section>

      <section>
        <h2>Carroyage DFCI</h2>
        <a
          className="map-card"
          href={DFCI_MAP}
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            className="map-card__img"
            src={DFCI_MAP}
            alt="Carroyage DFCI — échelle 1/25 000"
            loading="lazy"
          />
          <div className="map-card__cap">
            <h3>Carroyage DFCI</h3>
            <p>
              Coordonnées DFCI — échelle 1/25 000 (1 cm = 250 m). Touchez pour
              ouvrir en plein écran (zoomable).
            </p>
          </div>
        </a>
      </section>
    </div>
  )
}
