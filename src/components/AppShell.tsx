import { useEffect } from 'react'
import { Outlet, useLocation, useNavigate } from 'react-router-dom'
import BottomNav from './BottomNav'
import UpdateToast from './UpdateToast'
import { titleForPath } from '../content/sections'

export default function AppShell() {
  const location = useLocation()
  const navigate = useNavigate()
  const isHome = location.pathname === '/' || location.pathname === ''
  const title = isHome
    ? 'Guide du Bénévole CCFF'
    : (titleForPath(location.pathname) ?? 'Guide CCFF')

  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location.pathname])

  return (
    <div className="app">
      <header className="header">
        <div className="header__bar">
          {!isHome && (
            <button
              className="header__back"
              onClick={() => navigate(-1)}
              aria-label="Retour"
            >
              ‹
            </button>
          )}
          <span className="header__title">{title}</span>
        </div>
      </header>

      <main className="main">
        <Outlet />
      </main>

      <UpdateToast />
      <BottomNav />
    </div>
  )
}
