import { Link } from 'react-router-dom'
import EmergencyBar from '../components/EmergencyBar'
import PhoneLink from '../components/PhoneLink'
import { RADIO_CONTACTS } from '../content/contacts'

export default function Urgence() {
  return (
    <div className="page">
      <EmergencyBar />

      <Link className="btn-primary btn-block" to="/position">
        📍 Donner ma position (GPS + DFCI)
      </Link>

      <div className="steps">
        <div className="step">
          <span className="step__label">👀 Vous voyez une fumée</span>
          <p>
            Appelez la base radio pour information et suivi. Essayez de vous
            approcher pour plus de précision.
          </p>
        </div>
        <div className="step step--alert">
          <span className="step__label">🔥 Vous voyez un départ de feu</span>
          <p>
            Appelez <strong>en priorité les sapeurs-pompiers (18 ou 112)</strong>
            , puis la base radio, conformément à l’Ordre Opérationnel « Saison
            Risques Feux de Forêts ». Avertissez votre maire ou votre
            responsable CCFF.
          </p>
        </div>
      </div>

      <h2>Incendie de végétation</h2>
      <p>
        Vous avertissez immédiatement les sapeurs-pompiers (18 ou 112), puis la
        base radio de l’Association (poste radio ou 04 67 59 77 17).
      </p>

      <div className="callout callout--warn">
        <div className="callout__title">⚠️ Feu naissant</div>
        <p>
          S’il s’agit d’un feu naissant — un feu qui ne concerne que la strate
          herbacée et dont la surface est très faible — vous pouvez intervenir{' '}
          <strong>
            à condition d’être convenablement formés et équipés (tenue complète)
          </strong>
          .
        </p>
      </div>

      <div className="callout callout--quote">
        <div className="callout__title">Ordre Opérationnel Départemental</div>
        <p>
          « À la condition expresse d’être convenablement formés et équipés, les
          CCFF peuvent être conduits à intervenir sur un feu naissant dans
          l’attente de l’arrivée des secours. Ils doivent immédiatement quitter
          la zone du sinistre dès l’arrivée des premiers moyens de secours
          (terrestres et/ou aériens) pour se rendre au point de transit ou au PC
          opérationnel et se mettre à la disposition du COS. »
        </p>
      </div>

      <h3 className="phase-title">Avant l’arrivée des secours</h3>
      <ul>
        <li>Faciliter l’arrivée des secours ;</li>
        <li>Prendre les premières mesures de sécurité ;</li>
        <li>
          Faire dégager les voies d’accès sur demande de la gendarmerie ou de la
          police municipale ;
        </li>
        <li>
          Assurer la préservation des indices au niveau du point de départ du
          feu (rubalise spéciale).
        </li>
      </ul>

      <h3 className="phase-title">Pendant l’intervention</h3>
      <ul>
        <li>Se mettre à la disposition des sapeurs-pompiers et des gendarmes ;</li>
        <li>Guider les véhicules de renforts ;</li>
        <li>
          Informer les sapeurs-pompiers sur les particularités du secteur ;
        </li>
        <li>Empêcher la venue des curieux ;</li>
        <li>
          Participer au ravitaillement en eau et vivres à la demande des
          sapeurs-pompiers, après accord de l’autorité municipale ;
        </li>
        <li>Évacuer ou aider à évacuer des personnes ;</li>
        <li>
          <strong>Dès l’arrivée des moyens aériens, quitter la zone sans délai ;</strong>
        </li>
        <li>Reprendre les patrouilles en lisière de forêt ;</li>
        <li>
          Demander à votre maire ou à votre élu-responsable l’autorisation de
          sortir du territoire communal si l’incendie se situe sur une autre
          commune que la vôtre et que votre aide est sollicitée — en avertir
          l’ADCCFF34-RCSC.
        </li>
      </ul>

      <h3 className="phase-title">Après le sinistre</h3>
      <ul>
        <li>Surveiller la zone pour signaler d’éventuelles reprises ;</li>
        <li>Aider les sinistrés.</li>
      </ul>

      <h2>Radio &amp; astreinte</h2>
      <div className="calls">
        {RADIO_CONTACTS.map((c) => (
          <PhoneLink key={c.tel} contact={c} />
        ))}
      </div>
    </div>
  )
}
