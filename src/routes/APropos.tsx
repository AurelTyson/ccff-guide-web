import PhoneLink from '../components/PhoneLink'
import { EMERGENCY, RADIO_CONTACTS } from '../content/contacts'

export default function APropos() {
  return (
    <div className="page">
      <h2>Guide pratique du Bénévole CCFF</h2>
      <p>
        Application reprenant le dépliant « Guide pratique du Bénévole CCFF »
        édité par l’<strong>Association Départementale des Comités Communaux Feux
        de Forêts et des Réserves de Sécurité Civile de l’Hérault</strong>{' '}
        (ADCCFF34 - RCSC).
      </p>
      <p className="note">
        Édition de référence : Mars 2015 (« 37 CCFF en 2015 »).
      </p>

      <div className="callout callout--warn">
        <div className="callout__title">⚠️ Avertissement</div>
        <p>
          Les informations, numéros, arrêtés et procédures peuvent avoir évolué
          depuis l’édition d’origine. Vérifiez toujours leur validité auprès de
          votre commune, de l’association départementale et du SDIS 34. En cas
          d’urgence, composez le <a href="tel:18">18</a> ou le{' '}
          <a href="tel:112">112</a>.
        </p>
      </div>

      <h2>Numéros utiles</h2>
      <div className="calls">
        {[...EMERGENCY, ...RADIO_CONTACTS].map((c) => (
          <PhoneLink key={c.tel} contact={c} />
        ))}
      </div>

      <p className="note">
        Application web installable — fonctionne hors-ligne une fois ouverte.
      </p>
    </div>
  )
}
