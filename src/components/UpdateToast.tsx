import { useRegisterSW } from 'virtual:pwa-register/react'

export default function UpdateToast() {
  const {
    offlineReady: [offlineReady, setOfflineReady],
    needRefresh: [needRefresh, setNeedRefresh],
    updateServiceWorker,
  } = useRegisterSW({
    immediate: true,
    // Installed PWAs (esp. iOS) only re-check the service worker on a fresh
    // launch otherwise. Check periodically and whenever the app returns to the
    // foreground so updates land without a manual close-and-reopen.
    onRegisteredSW(_swUrl, registration) {
      if (!registration) return
      const HOUR = 60 * 60 * 1000
      setInterval(() => void registration.update(), HOUR)
      let last = 0
      document.addEventListener('visibilitychange', () => {
        if (document.visibilityState !== 'visible') return
        const now = Date.now()
        if (now - last < 60 * 1000) return // throttle to once a minute
        last = now
        void registration.update()
      })
    },
  })

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
