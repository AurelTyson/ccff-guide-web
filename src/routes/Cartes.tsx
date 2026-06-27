import { useState } from 'react'
import ImageViewer from '../components/ImageViewer'
import { asset } from '../lib/asset'

interface MapItem {
  src: string
  title: string
  caption: string
}

const MAPS: MapItem[] = [
  {
    src: asset('maps/zones-meteo.jpg'),
    title: 'Les 8 zones météo de l’Hérault',
    caption:
      'Découpage 34-1 à 34-8 utilisé pour le niveau de risque quotidien.',
  },
  {
    src: asset('maps/carroyage-dfci.jpg'),
    title: 'Carroyage DFCI',
    caption: 'Coordonnées DFCI — échelle 1/25 000 (1 cm = 250 m).',
  },
]

export default function Cartes() {
  const [zoom, setZoom] = useState<MapItem | null>(null)

  return (
    <div className="page">
      <p className="lead">Touchez une carte pour l’agrandir.</p>

      {MAPS.map((m) => (
        <div key={m.src} className="map-card">
          <img
            className="map-card__img"
            src={m.src}
            alt={m.title}
            loading="lazy"
            onClick={() => setZoom(m)}
          />
          <div className="map-card__cap">
            <h3>{m.title}</h3>
            <p>{m.caption}</p>
          </div>
        </div>
      ))}

      {zoom && (
        <ImageViewer
          src={zoom.src}
          alt={zoom.title}
          onClose={() => setZoom(null)}
        />
      )}
    </div>
  )
}
