import { useEffect, useState } from 'react'
import {
  canPromptInstall,
  getPlatform,
  isStandalone,
  promptInstall,
  subscribeInstall,
  type Platform,
} from '../lib/install'

const STEPS: Record<Platform, { title: string; steps: string[] }> = {
  ios: {
    title: 'Sur iPhone / iPad',
    steps: [
      'Ouvrez cette page dans Safari.',
      'Touchez le bouton Partager (le carré avec une flèche vers le haut), en bas de l’écran.',
      'Faites défiler et choisissez « Sur l’écran d’accueil ».',
      'Touchez « Ajouter » en haut à droite.',
    ],
  },
  android: {
    title: 'Sur Android',
    steps: [
      'Ouvrez cette page dans Chrome.',
      'Touchez le menu ⋮ en haut à droite.',
      'Choisissez « Installer l’application » (ou « Ajouter à l’écran d’accueil »).',
      'Confirmez avec « Installer ».',
    ],
  },
  desktop: {
    title: 'Sur ordinateur',
    steps: [
      'Dans la barre d’adresse (Chrome ou Edge), cliquez sur l’icône d’installation à droite.',
      'Ou ouvrez le menu ⋮ puis « Installer Guide CCFF… ».',
      'Cliquez sur « Installer ».',
    ],
  },
}

function StepCard({ title, steps }: { title: string; steps: string[] }) {
  return (
    <div className="step">
      <span className="step__label">{title}</span>
      <ol>
        {steps.map((s, i) => (
          <li key={i}>{s}</li>
        ))}
      </ol>
    </div>
  )
}

export default function Installer() {
  const [, bump] = useState(0)
  useEffect(() => {
    const unsub = subscribeInstall(() => bump((n) => n + 1))
    return () => {
      unsub()
    }
  }, [])

  if (isStandalone()) {
    return (
      <div className="page">
        <div className="callout callout--info">
          <div className="callout__title">✓ Application installée</div>
          <p>
            Le guide est déjà ajouté à votre écran d’accueil et fonctionne
            hors-ligne. Bonne patrouille&nbsp;!
          </p>
        </div>
      </div>
    )
  }

  const platform = getPlatform()
  const others = (Object.keys(STEPS) as Platform[]).filter((p) => p !== platform)

  return (
    <div className="page">
      <p className="lead">
        Installez le guide sur votre appareil pour l’ouvrir d’un seul geste,
        même sans réseau, et en plein écran.
      </p>

      {canPromptInstall() && (
        <button
          className="btn-primary btn-block"
          onClick={() => void promptInstall()}
        >
          📲 Installer l’application
        </button>
      )}

      <div className="steps">
        <StepCard title={STEPS[platform].title} steps={STEPS[platform].steps} />
      </div>

      <details className="disclosure">
        <summary>Un autre appareil&nbsp;?</summary>
        <div className="steps" style={{ marginTop: 'var(--sp-3)' }}>
          {others.map((p) => (
            <StepCard key={p} title={STEPS[p].title} steps={STEPS[p].steps} />
          ))}
        </div>
      </details>

      <div className="callout callout--info">
        <div className="callout__title">💡 Pourquoi l’installer&nbsp;?</div>
        <ul>
          <li>Accès en un geste depuis l’écran d’accueil.</li>
          <li>Fonctionne <strong>hors-ligne</strong>, sans réseau sur le terrain.</li>
          <li>S’ouvre en plein écran, sans la barre du navigateur.</li>
        </ul>
      </div>
    </div>
  )
}
