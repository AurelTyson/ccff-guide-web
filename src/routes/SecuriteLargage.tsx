import {
  AIRCRAFT,
  LARGAGE_FACTS,
  LARGAGE_REFLEXES,
  LARGAGE_RINCAGE,
} from '../content/largage'

export default function SecuriteLargage() {
  return (
    <div className="page">
      <p>
        Pendant sa patrouille, un équipage CCFF peut être le premier témoin d’un
        départ de feu. Il est possible qu’un ou deux avions de la cellule
        aérienne départementale se présentent sur le départ de feu avant
        l’arrivée du premier véhicule sapeurs-pompiers.
      </p>

      <div className="callout callout--rule">
        Règle de sécurité : s’éloigner pour ne pas gêner les pilotes et éviter
        tout incident ou accident de largage.
      </div>

      <h2>Si un avion va larguer sa charge</h2>
      <p className="note">C’est un cas d’urgence. Quelques réflexes :</p>
      <ul>
        {LARGAGE_REFLEXES.map((r, i) => (
          <li key={i}>{r}</li>
        ))}
      </ul>

      <div className="callout callout--warn">
        <div className="callout__title">📵 Photo / vidéo</div>
        <p>
          La phase de largage est très « prisée » mais comporte de très gros
          risques.{' '}
          <strong>
            Une photo ou une vidéo ne doit jamais engager votre sécurité.
          </strong>
        </p>
      </div>

      <h2>Les avions</h2>
      <div className="planes">
        {AIRCRAFT.map((a) => (
          <div key={a.name} className="plane">
            <span>
              <span className="plane__name">{a.name}</span>
              <br />
              <span className="plane__fleet">{a.fleet}</span>
            </span>
            <span className="plane__load">{a.load}</span>
          </div>
        ))}
      </div>

      <h2>Un largage, c’est en moyenne</h2>
      <ul>
        {LARGAGE_FACTS.map((f, i) => (
          <li key={i}>{f}</li>
        ))}
      </ul>

      <div className="callout callout--alert">
        <div className="callout__title">Le risque</div>
        <p>
          Des traumatismes (fractures, plaies, lésions d’organes) parfois graves,
          avec malheureusement quelquefois le décès de la personne impactée.
        </p>
      </div>

      <h2>Si vous êtes impacté sans blessure (« mouillé »)</h2>
      <div className="steps">
        {LARGAGE_RINCAGE.map((r) => (
          <div key={r.produit} className="step">
            <span className="step__label">💧 {r.produit}</span>
            <p>{r.conseil}</p>
          </div>
        ))}
      </div>
    </div>
  )
}
