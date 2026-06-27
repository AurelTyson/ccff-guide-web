export default function Debroussaillement() {
  return (
    <div className="page">
      <p>
        Le débroussaillement n’est exigible que dans les zones exposées aux
        incendies de forêt des communes identifiées. Les prescriptions
        techniques sont plus strictes dans les communes « rouges » que dans les
        communes « jaunes », et il n’y a pas d’obligation dans les communes
        « blanches ».
      </p>

      <div className="callout callout--warn">
        <div className="callout__title">📏 50 mètres</div>
        <p>
          Le débroussaillement est obligatoire sur une profondeur de{' '}
          <strong>50 m</strong> tout autour des constructions, chantiers et
          installations de toute nature où il y a une activité humaine.
        </p>
      </div>

      <h2>Qui est concerné ?</h2>
      <p>Le débroussaillement est obligatoire pour les propriétaires de terrains :</p>
      <ul>
        <li>situés en zone urbaine ;</li>
        <li>en ZAC (zone d’aménagement concerté) ;</li>
        <li>en lotissement ;</li>
        <li>de camping ou de stationnement de caravanes.</li>
      </ul>

      <p className="note">
        Reportez-vous à la carte des zones et à la situation de votre commune
        pour connaître les obligations qui s’appliquent.
      </p>
    </div>
  )
}
