import { useRegisterSW } from 'virtual:pwa-register/react'

export default function UpdateToast() {
  const {
    offlineReady: [offlineReady, setOfflineReady],
    needRefresh: [needRefresh, setNeedRefresh],
    updateServiceWorker,
  } = useRegisterSW({ immediate: true })

  if (needRefresh) {
    return (
      <div className="update-toast" role="alert">
        <span>Nouvelle version disponible.</span>
        <button onClick={() => updateServiceWorker(true)}>Mettre à jour</button>
        <button onClick={() => setNeedRefresh(false)} aria-label="Plus tard">
          ✕
        </button>
      </div>
    )
  }

  if (offlineReady) {
    return (
      <div className="update-toast" role="status">
        <span>✓ Prêt pour une utilisation hors-ligne.</span>
        <button onClick={() => setOfflineReady(false)}>OK</button>
      </div>
    )
  }

  return null
}
