import { RISK_LEVELS } from '../content/risques'

export default function EchelleRisques() {
  return (
    <div className="page">
      <p className="lead">
        Le niveau de risque feu de forêt est évalué chaque jour. Il conditionne
        l’accès aux massifs et le dispositif de surveillance.
      </p>

      <div className="risk">
        {RISK_LEVELS.map((r) => (
          <div key={r.level} className="risk__row">
            <span
              className="risk__badge"
              style={{ background: r.cssVar }}
              data-dark={r.darkText ? 'true' : 'false'}
            >
              {r.level}
            </span>
            <div className="risk__body">
              <div className="risk__name">
                {r.color} — {r.name}
              </div>
              <div className="risk__def">{r.definition}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
