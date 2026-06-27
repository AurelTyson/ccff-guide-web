import { useEffect, useState } from 'react'
import {
  getSettings,
  setSettings,
  subscribeSettings,
  type Contrast,
  type TextSize,
} from '../lib/settings'

const TEXT_OPTIONS: { value: TextSize; label: string }[] = [
  { value: 'normal', label: 'Normal' },
  { value: 'large', label: 'Grand' },
  { value: 'xl', label: 'Très grand' },
]

const CONTRAST_OPTIONS: { value: Contrast; label: string }[] = [
  { value: 'normal', label: 'Normal' },
  { value: 'high', label: 'Élevé' },
]

export default function Reglages() {
  const [settings, setLocal] = useState(getSettings())
  useEffect(() => {
    const unsub = subscribeSettings(() => setLocal(getSettings()))
    return () => {
      unsub()
    }
  }, [])

  return (
    <div className="page">
      <p className="lead">
        Adaptez l’affichage pour une lecture confortable, y compris en plein
        soleil. Les réglages sont mémorisés sur cet appareil.
      </p>

      <div className="setting">
        <div className="setting__label">Taille du texte</div>
        <div className="segmented" role="group" aria-label="Taille du texte">
          {TEXT_OPTIONS.map((o) => (
            <button
              key={o.value}
              className={settings.text === o.value ? 'is-active' : ''}
              aria-pressed={settings.text === o.value}
              onClick={() => setSettings({ text: o.value })}
            >
              {o.label}
            </button>
          ))}
        </div>
      </div>

      <div className="setting">
        <div className="setting__label">Contraste</div>
        <div className="segmented" role="group" aria-label="Contraste">
          {CONTRAST_OPTIONS.map((o) => (
            <button
              key={o.value}
              className={settings.contrast === o.value ? 'is-active' : ''}
              aria-pressed={settings.contrast === o.value}
              onClick={() => setSettings({ contrast: o.value })}
            >
              {o.label}
            </button>
          ))}
        </div>
        <p className="note">
          Le mode « Élevé » renforce les contrastes pour la lecture en extérieur.
        </p>
      </div>

      <div className="callout callout--info">
        <div className="callout__title">Aperçu</div>
        <p>
          Ce texte et toute l’application s’adaptent immédiatement à vos
          réglages. <strong>Numéro d’urgence : 18.</strong>
        </p>
      </div>
    </div>
  )
}
