import { useEffect, useState } from 'react'
import { toDFCI } from '../lib/dfci'
import { getPlatform } from '../lib/install'

type Status = 'unsupported' | 'locating' | 'ready' | 'error'

interface Fix {
  lat: number
  lon: number
  accuracy: number
}

const ERR: Record<number, string> = {
  1: 'Accès à la position refusé. Autorisez la localisation pour ce site dans les réglages, puis réessayez.',
  2: 'Position indisponible. Vérifiez que la localisation de l’appareil est activée.',
  3: 'Délai dépassé. Réessayez, de préférence à découvert.',
}

function mapsUrl(lat: number, lon: number): string {
  const p = getPlatform()
  if (p === 'ios') return `https://maps.apple.com/?ll=${lat},${lon}&q=Ma%20position`
  if (p === 'android') return `geo:${lat},${lon}?q=${lat},${lon}(Ma position)`
  return `https://www.google.com/maps?q=${lat},${lon}`
}

export default function Position() {
  const supported =
    typeof navigator !== 'undefined' && 'geolocation' in navigator
  const [status, setStatus] = useState<Status>(
    supported ? 'locating' : 'unsupported',
  )
  const [fix, setFix] = useState<Fix | null>(null)
  const [errCode, setErrCode] = useState(0)
  const [copied, setCopied] = useState(false)
  const [retryKey, setRetryKey] = useState(0)

  useEffect(() => {
    if (!supported) return
    setStatus('locating')
    const id = navigator.geolocation.watchPosition(
      (pos) => {
        setFix({
          lat: pos.coords.latitude,
          lon: pos.coords.longitude,
          accuracy: pos.coords.accuracy,
        })
        setStatus('ready')
      },
      (err) => {
        setErrCode(err.code)
        setStatus('error')
      },
      { enableHighAccuracy: true, maximumAge: 0, timeout: 20000 },
    )
    return () => navigator.geolocation.clearWatch(id)
  }, [supported, retryKey])

  const dfci = fix ? toDFCI(fix.lat, fix.lon) : null
  const canShare = typeof navigator !== 'undefined' && !!navigator.share

  const summary = fix
    ? [
        'Position CCFF',
        dfci ? `DFCI : ${dfci.full}` : null,
        `GPS : ${fix.lat.toFixed(5)}, ${fix.lon.toFixed(5)} (± ${Math.round(fix.accuracy)} m)`,
        `https://www.google.com/maps?q=${fix.lat},${fix.lon}`,
      ]
        .filter(Boolean)
        .join('\n')
    : ''

  function copy() {
    if (!summary || !navigator.clipboard) return
    navigator.clipboard
      .writeText(summary)
      .then(() => {
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
      })
      .catch(() => {})
  }

  function share() {
    if (summary && navigator.share)
      navigator.share({ title: 'Position CCFF', text: summary }).catch(() => {})
  }

  return (
    <div className="page">
      {status === 'unsupported' && (
        <div className="callout callout--warn">
          <div className="callout__title">Géolocalisation indisponible</div>
          <p>Cet appareil ou ce navigateur ne fournit pas la position.</p>
        </div>
      )}

      {status === 'locating' && (
        <p className="empty">
          📍 Localisation en cours…
          <br />
          Autorisez l’accès à la position si elle est demandée.
        </p>
      )}

      {status === 'error' && (
        <div className="callout callout--alert">
          <div className="callout__title">Position indisponible</div>
          <p>{ERR[errCode] ?? 'Erreur de localisation.'}</p>
          <button
            className="btn-primary"
            style={{ marginTop: 'var(--sp-3)' }}
            onClick={() => setRetryKey((k) => k + 1)}
          >
            Réessayer
          </button>
        </div>
      )}

      {status === 'ready' && fix && (
        <>
          <div className="pos-dfci">
            <div className="pos-dfci__label">Carreau DFCI</div>
            <div className="pos-dfci__code">
              {dfci
                ? `${dfci.code2km.slice(0, 4)} ${dfci.code2km.slice(4)}${dfci.subZone ? `.${dfci.subZone}` : ''}`
                : '—'}
            </div>
            {!dfci && (
              <div className="pos-dfci__label">Hors zone couverte</div>
            )}
          </div>

          <div className="pos-coords">
            <div className="pos-row">
              <span>Latitude</span>
              <strong>{fix.lat.toFixed(5)}</strong>
            </div>
            <div className="pos-row">
              <span>Longitude</span>
              <strong>{fix.lon.toFixed(5)}</strong>
            </div>
            <div className="pos-row">
              <span>Précision</span>
              <strong>± {Math.round(fix.accuracy)} m</strong>
            </div>
          </div>

          {fix.accuracy > 50 && (
            <div className="callout callout--warn">
              <div className="callout__title">⚠️ Précision faible</div>
              <p>
                Position à ± {Math.round(fix.accuracy)} m. Patientez ou
                placez-vous à découvert. Près d’une limite de carreau, le carreau
                DFCI peut différer — fiez-vous aux coordonnées GPS.
              </p>
            </div>
          )}

          <div className="pos-actions">
            <button className="btn-primary" onClick={copy}>
              {copied ? '✓ Copié' : '📋 Copier'}
            </button>
            {canShare && (
              <button className="btn-primary" onClick={share}>
                ↗ Partager
              </button>
            )}
            <a
              className="btn-secondary"
              href={mapsUrl(fix.lat, fix.lon)}
              target="_blank"
              rel="noopener noreferrer"
            >
              🗺️ Ouvrir dans Plans
            </a>
            <a
              className="btn-secondary"
              href={`https://www.geoportail.gouv.fr/carte?c=${fix.lon},${fix.lat}&z=16`}
              target="_blank"
              rel="noopener noreferrer"
            >
              Vérifier sur Géoportail
            </a>
          </div>

          <p className="note">
            Carreau DFCI calculé depuis le GPS ; les coordonnées GPS font foi.
          </p>
        </>
      )}
    </div>
  )
}
