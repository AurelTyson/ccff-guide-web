import { useEffect, useRef, useState } from 'react'
import * as L from 'leaflet'
import 'leaflet/dist/leaflet.css' // loaded with this lazy route, not the shell
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

    // Lambert (m) → [lat, lon] for Leaflet
    const P = (x: number, y: number): [number, number] => {
      const p = lambert2eToWgs84(x, y)
      return [p.lat, p.lon]
    }
    const lineOpts = {
      color: '#c1121f',
      weight: 1,
      opacity: 0.5,
      dashArray: '3',
      interactive: false,
    }
    const labelMarker = (x: number, y: number, html: string, cls: string) =>
      L.marker(P(x, y), {
        interactive: false,
        icon: L.divIcon({ className: cls, html, iconSize: [44, 14] }),
      }).addTo(grid)

    // The 5 "chasse" sub-zones of a 2 km cell: centre square (5) + 4 corners.
    const drawSubZones = (cx: number, cy: number) => {
      const lo = 500
      const hi = 1500
      const m = 1000
      L.polygon(
        [P(cx + lo, cy + lo), P(cx + hi, cy + lo), P(cx + hi, cy + hi), P(cx + lo, cy + hi)],
        { ...lineOpts, fill: false },
      ).addTo(grid)
      // mid lines, only outside the centre square
      L.polyline([P(cx + m, cy), P(cx + m, cy + lo)], lineOpts).addTo(grid)
      L.polyline([P(cx + m, cy + hi), P(cx + m, cy + 2000)], lineOpts).addTo(grid)
      L.polyline([P(cx, cy + m), P(cx + lo, cy + m)], lineOpts).addTo(grid)
      L.polyline([P(cx + hi, cy + m), P(cx + 2000, cy + m)], lineOpts).addTo(grid)
      labelMarker(cx + 300, cy + 1700, '1', 'dfci-sub-label')
      labelMarker(cx + 1700, cy + 1700, '2', 'dfci-sub-label')
      labelMarker(cx + 1700, cy + 300, '3', 'dfci-sub-label')
      labelMarker(cx + 300, cy + 300, '4', 'dfci-sub-label')
      labelMarker(cx + m, cy + m, '5', 'dfci-sub-label')
    }

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
      const subZ = step === 2000 && z >= 15 && nx * ny <= 25

      for (let i = 0; i < nx; i++) {
        for (let j = 0; j < ny; j++) {
          const cx = x0 + i * step
          const cy = y0 + j * step
          L.polygon(
            [P(cx, cy), P(cx + step, cy), P(cx + step, cy + step), P(cx, cy + step)],
            {
              color: '#c1121f',
              weight: step === 2000 ? 1.5 : 1,
              opacity: 0.6,
              fill: false,
              interactive: false,
            },
          ).addTo(grid)

          if (subZ) drawSubZones(cx, cy)

          if (showLabels) {
            const code = lambertToDFCI(cx + step / 2, cy + step / 2)
            if (code) {
              const txt =
                step === 2000 ? code.code2km.slice(4) : code.code2km.slice(0, 4)
              // at sub-zone zoom, lift the cell code to the top edge so it
              // doesn't collide with the centre "5"
              if (subZ) labelMarker(cx + step / 2, cy + 1880, txt, 'dfci-cell-label')
              else labelMarker(cx + step / 2, cy + step / 2, txt, 'dfci-cell-label')
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
