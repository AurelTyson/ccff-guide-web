import { Link } from 'react-router-dom'
import type { RouteMeta } from '../content/sections'

export default function SectionCard({
  section,
  wide = false,
}: {
  section: RouteMeta
  wide?: boolean
}) {
  if (wide) {
    return (
      <Link
        className="tile tile--wide"
        to={`/${section.path}`}
        data-accent={section.accent}
      >
        <span className="tile__icon" aria-hidden>
          {section.icon}
        </span>
        <span className="tile__text">
          <span className="tile__title">{section.title}</span>
          <span className="tile__desc">{section.summary}</span>
        </span>
      </Link>
    )
  }

  return (
    <Link className="tile" to={`/${section.path}`} data-accent={section.accent}>
      <span className="tile__icon" aria-hidden>
        {section.icon}
      </span>
      <span className="tile__title">{section.short}</span>
      <span className="tile__desc">{section.summary}</span>
    </Link>
  )
}
