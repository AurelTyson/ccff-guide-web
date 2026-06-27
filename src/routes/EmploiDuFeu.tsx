import { FIRE_PERIODS, FIRE_PERIOD_BY_ID, MONTHS } from '../content/emploiDuFeu'

export default function EmploiDuFeu() {
  return (
    <div className="page">
      <div className="callout callout--rule">
        EN RÈGLE GÉNÉRALE, LE FEU EST INTERDIT TOUTE L’ANNÉE, PARTOUT DANS TOUT
        LE DÉPARTEMENT.
      </div>

      <p>
        Le <strong>RSD</strong> (Règlement Sanitaire Départemental) interdit, sur
        l’ensemble du territoire, le brûlage ou l’incinération des déchets
        ménagers, des déchets verts et des déchets végétaux — notamment ceux
        issus de l’entretien des jardins et des espaces verts des particuliers et
        des collectivités.
      </p>
      <p>
        La destruction par le feu des pelouses ou des tailles de haies est
        interdite : les produits doivent être apportés en déchetterie. Sur son
        territoire communal, c’est le maire qui est chargé de l’application du
        RSD.
      </p>

      <div className="callout callout--info">
        <p>
          Si vous êtes face à un brûlage de déchets verts dans un jardin et que
          le propriétaire ne veut pas éteindre le feu, appelez la{' '}
          <strong>police municipale</strong> ou la <strong>gendarmerie</strong>.
        </p>
      </div>

      <h2>Calendrier de l’emploi du feu</h2>
      <p>
        On peut incinérer les végétaux coupés lors du débroussaillement en
        respectant l’<strong>arrêté préfectoral du 25 avril 2002</strong> sur
        l’emploi du feu.
      </p>

      <div className="cal">
        <div className="cal__bar">
          {MONTHS.map((m, i) => (
            <span
              key={i}
              className="cal__month"
              style={{
                background: FIRE_PERIOD_BY_ID.get(m.period)!.cssVar,
                color: m.period === 'declaratif' ? '#1b1c1a' : '#fff',
              }}
            >
              {m.abbr}
            </span>
          ))}
        </div>
        <div className="cal__legend">
          {FIRE_PERIODS.map((p) => (
            <div key={p.id} className="cal__key">
              <span className="cal__swatch" style={{ background: p.cssVar }} />
              <span>
                <span className="cal__period">{p.label}</span>
                <br />
                <span className="cal__dates">{p.dates}</span>
                <br />
                <span className="note">{p.description}</span>
              </span>
            </div>
          ))}
        </div>
      </div>

      <div className="callout callout--warn">
        <div className="callout__title">⚠️ Cet arrêté est dérogatoire !</div>
        <p>
          L’arrêté permanent du 25 avril 2002, dit « emploi du feu », est un
          arrêté <strong>dérogatoire au RSD</strong> pour les matières
          naturelles non dangereuses issues de l’agriculture ou de la
          sylviculture, utilisées dans le cadre de l’exploitation agricole ou
          sylvicole, et <strong>uniquement pour les propriétaires agricoles et
          leurs ayants-droit</strong>.
        </p>
      </div>
    </div>
  )
}
