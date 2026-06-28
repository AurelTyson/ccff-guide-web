import { useEffect, useRef, useState } from 'react'
import * as L from 'leaflet'
import {
  lambert2eToWgs84,
  lambertToDFCI,
  toDFCI,
  wgs84ToLambert2e,
} from '../lib/dfci'

const IGN_TILES =
  'https://data.geopf.fr/wmts?SERVICE=WMTS&REQUEST=GetTile&VERSION=1.0.0' +
  '&LAYER=GEOGRAPHICALGRIDSYSTEMS.PLANIGNV2&STYLE=normal&TILEMATRIXSET=PM' +
  '&FORMAT=image/png&TILEMATRIX={z}&TILEROW={y}&TILECOL={x}'

function formatCode(lat: number, lon: number): string {
  const d = toDFCI(lat, lon)
  if (!d) return 'hors zone'
  return `${d.code2km.slice(0, 4)} ${d.code2km.slice(4)}${d.subZone ? `.${d.subZone}` : ''}`
}

export default function CarteDfci() {
  const elRef = useRef<HTMLDivElement | null>(null)
  const mapRef = useRef<L.Map | null>(null)
  const gridRef = useRef<L.LayerGroup | null>(null)
  const meRef = useRef<L.CircleMarker | null>(null)
  const [carreau, setCarreau] = useState('—')
  const [online, setOnline] = useState(
    typeof navigator === 'undefined' ? true : navigator.onLine,
  )

  useEffect(() => {
    if (!elRef.current || mapRef.current) return
    const map = L.map(elRef.current, {
      center: [43.6, 3.43],
      zoom: 10,
      zoomControl: false,
      minZoom: 6,
      maxZoom: 18,
    })
    mapRef.current = map

    L.tileLayer(IGN_TILES, {
      attribution: 'IGN-F / Géoportail',
      maxZoom: 18,
    }).addTo(map)

    const grid = L.layerGroup().addTo(map)
    gridRef.current = grid

    const drawGrid = () => {
      grid.clearLayers()
      const z = map.getZoom()
      const step = z >= 13 ? 2000 : z >= 10 ? 20000 : 0
      if (!step) return

      const b = map.getBounds()
      const ll = [
        [b.getSouth(), b.getWest()],
        [b.getSouth(), b.getEast()],
        [b.getNorth(), b.getWest()],
        [b.getNorth(), b.getEast()],
      ].map(([la, lo]) => wgs84ToLambert2e(la, lo))
      const xs = ll.map((c) => c.x)
      const ys = ll.map((c) => c.y)
      const minX = Math.min(...xs) - step
      const maxX = Math.max(...xs) + step
      const minY = Math.min(...ys) - step
      const maxY = Math.max(...ys) + step
      const x0 = Math.floor(minX / step) * step
      const y0 = Math.floor(minY / step) * step
      const nx = Math.ceil((maxX - x0) / step)
      const ny = Math.ceil((maxY - y0) / step)
      if (nx * ny > 400) return // safety cap
      const showLabels = nx * ny <= 220

      for (let i = 0; i < nx; i++) {
        for (let j = 0; j < ny; j++) {
          const cx = x0 + i * step
          const cy = y0 + j * step
          const c1 = lambert2eToWgs84(cx, cy)
          const c2 = lambert2eToWgs84(cx + step, cy)
          const c3 = lambert2eToWgs84(cx + step, cy + step)
          const c4 = lambert2eToWgs84(cx, cy + step)
          L.polygon(
            [
              [c1.lat, c1.lon],
              [c2.lat, c2.lon],
              [c3.lat, c3.lon],
              [c4.lat, c4.lon],
            ],
            { color: '#c1121f', weight: 1, opacity: 0.55, fill: false, interactive: false },
          ).addTo(grid)

          if (showLabels) {
            const code = lambertToDFCI(cx + step / 2, cy + step / 2)
            if (code) {
              const ctr = lambert2eToWgs84(cx + step / 2, cy + step / 2)
              const txt =
                step === 2000 ? code.code2km.slice(4) : code.code2km.slice(0, 4)
              L.marker([ctr.lat, ctr.lon], {
                interactive: false,
                icon: L.divIcon({
                  className: 'dfci-cell-label',
                  html: txt,
                  iconSize: [44, 14],
                }),
              }).addTo(grid)
            }
          }
        }
      }
    }

    const updateReadout = () => {
      const c = map.getCenter()
      setCarreau(formatCode(c.lat, c.lng))
    }

    map.on('moveend', () => {
      drawGrid()
      updateReadout()
    })
    map.on('move', updateReadout)
    requestAnimationFrame(() => {
      map.invalidateSize()
      drawGrid()
      updateReadout()
    })

    return () => {
      map.remove()
      mapRef.current = null
      gridRef.current = null
      meRef.current = null
    }
  }, [])

  useEffect(() => {
    const on = () => setOnline(true)
    const off = () => setOnline(false)
    window.addEventListener('online', on)
    window.addEventListener('offline', off)
    return () => {
      window.removeEventListener('online', on)
      window.removeEventListener('offline', off)
    }
  }, [])

  function locate() {
    const map = mapRef.current
    if (!map || !navigator.geolocation) return
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const ll: [number, number] = [pos.coords.latitude, pos.coords.longitude]
        map.setView(ll, Math.max(map.getZoom(), 14))
        if (meRef.current) meRef.current.remove()
        meRef.current = L.circleMarker(ll, {
          radius: 7,
          color: '#1c7ed6',
          weight: 3,
          fillColor: '#fff',
          fillOpacity: 1,
        }).addTo(map)
      },
      () => {},
      { enableHighAccuracy: true, timeout: 15000 },
    )
  }

  return (
    <div className="map-full">
      <div className="map-readout">
        <span>Carreau au centre</span>
        <strong>{carreau}</strong>
        <button className="btn-secondary" onClick={locate}>
          📍 Me localiser
        </button>
      </div>
      {!online && (
        <div className="map-banner">
          Hors-ligne : fond de carte indisponible (carte en ligne).
        </div>
      )}
      <div className="map-canvas" ref={elRef} />
      <div className="map-crosshair" aria-hidden>
        ✛
      </div>
    </div>
  )
}
