import { NavLink } from 'react-router-dom'

interface NavItem {
  to: string
  label: string
  icon: string
  end?: boolean
  alert?: boolean
}

const ITEMS: NavItem[] = [
  { to: '/', label: 'Accueil', icon: '🏠', end: true },
  { to: '/urgence', label: 'Urgence', icon: '🚨', alert: true },
  { to: '/cartes', label: 'Cartes', icon: '🗺️' },
  { to: '/recherche', label: 'Recherche', icon: '🔎' },
]

export default function BottomNav() {
  return (
    <nav className="nav" aria-label="Navigation principale">
      <div className="nav__inner">
        {ITEMS.map((it) => (
          <NavLink
            key={it.to}
            to={it.to}
            end={it.end}
            className={({ isActive }) =>
              [
                'nav__item',
                it.alert ? 'nav__item--alert' : '',
                isActive ? 'is-active' : '',
              ]
                .filter(Boolean)
                .join(' ')
            }
          >
            <span className="nav__icon" aria-hidden>
              {it.icon}
            </span>
            <span>{it.label}</span>
          </NavLink>
        ))}
      </div>
    </nav>
  )
}
