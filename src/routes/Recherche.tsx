import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import Fuse from 'fuse.js'
import { SEARCH_INDEX } from '../content/searchIndex'

export default function Recherche() {
  const [q, setQ] = useState('')

  const fuse = useMemo(
    () =>
      new Fuse(SEARCH_INDEX, {
        keys: [
          { name: 'title', weight: 0.5 },
          { name: 'terms', weight: 0.3 },
          { name: 'snippet', weight: 0.2 },
        ],
        threshold: 0.4,
        ignoreLocation: true,
        minMatchCharLength: 2,
      }),
    [],
  )

  const term = q.trim()
  const results = useMemo(() => {
    if (term.length < 2) return []
    return fuse.search(term).slice(0, 30).map((r) => r.item)
  }, [term, fuse])

  return (
    <div className="page">
      <div className="search__field">
        <span aria-hidden>🔎</span>
        <input
          className="search__input"
          type="search"
          inputMode="search"
          placeholder="Rechercher (feu, DFCI, 112, Canadair…)"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          autoFocus
          aria-label="Rechercher dans le guide"
        />
      </div>

      {term.length < 2 ? (
        <p className="empty">
          Tapez au moins 2 caractères pour rechercher dans tout le guide.
        </p>
      ) : results.length === 0 ? (
        <p className="empty">Aucun résultat pour « {term} ».</p>
      ) : (
        <div className="search__results">
          {results.map((r, i) => (
            <Link key={`${r.to}-${i}`} className="result" to={r.to}>
              <div className="result__kind">{r.kind}</div>
              <div className="result__title">{r.title}</div>
              {r.snippet && <div className="result__snippet">{r.snippet}</div>}
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}
