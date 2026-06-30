import { Link } from 'react-router-dom'
import { asset } from '../lib/asset'

const VIGILANCE_URL = 'https://www.risque-prevention-incendie.fr/herault/'
const VIGILANCE_IMG = asset('maps/carte-prevention-incendie.webp')
const DFCI_MAP = asset('maps/carroyage-dfci.webp')

export default function Cartes() {
  return (
    <div className="page">
      <section>
        <h2>Vigilance incendie de forêt</h2>
        <a
          className="map-card"
          href={VIGILANCE_URL}
          target="_blank"
          rel="noopener noreferrer"
        >
          <img
            className="map-card__img"
            src={VIGILANCE_IMG}
            alt="Carte de vigilance incendie de forêt — Hérault"
            loading="lazy"
          />
          <div className="map-card__cap">
            <h3>Information journalière (Hérault)</h3>
            <p>
              Carte indicative. Touchez pour la vigilance du jour — risque et
              accès aux massifs — sur le site officiel (mise à jour vers 18 h) ↗
            </p>
          </div>
        </a>
      </section>

      <section>
        <h2>Carte DFCI interactive</h2>
        <Link className="map-link" to="/carte-dfci">
          <span className="map-link__icon" aria-hidden>
            🧭
          </span>
          <span className="map-link__body">
            <span className="map-link__title">Trouver un carreau sur la carte</span>
            <span className="map-link__desc">
              Lisez le carreau DFCI de n’importe quel point. Carte en ligne (IGN).
            </span>
          </span>
          <span className="map-link__go" aria-hidden>
            ›
          </span>
        </Link>
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
