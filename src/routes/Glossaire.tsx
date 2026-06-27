import { GLOSSARY, POINT_DE_TRANSIT } from '../content/glossaire'

export default function Glossaire() {
  return (
    <div className="page">
      <div className="gloss">
        {GLOSSARY.map((g) => (
          <div key={g.acr} className="gloss__item">
            <span className="gloss__acr">{g.acr}</span>{' '}
            <span className="gloss__def">— {g.def}</span>
          </div>
        ))}
      </div>
      <p className="note">{POINT_DE_TRANSIT}</p>
    </div>
  )
}
