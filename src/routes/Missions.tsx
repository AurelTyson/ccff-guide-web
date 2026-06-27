export default function Missions() {
  return (
    <div className="page">
      <p className="lead">
        Vous avez choisi d’être bénévole dans le Comité Communal Feux de Forêts
        (CCFF), créé par arrêté municipal de votre commune.
      </p>

      <h2>Vos missions</h2>
      <ul>
        <li>Prévention ;</li>
        <li>Sensibilisation ;</li>
        <li>Surveillance de votre massif forestier ;</li>
        <li>Alerte.</li>
      </ul>
      <p>
        De cette manière, vous ne devez pas vous substituer aux services de
        secours et d’urgence. Dans vos missions, vous représentez votre maire :
        votre tenue et votre comportement doivent être exemplaires.
      </p>

      <div className="callout callout--info">
        <div className="callout__title">🚗 Sur la route</div>
        <p>
          La tenue de patrouille est de couleur <strong>orange</strong>{' '}
          exclusivement, afin d’être parfaitement identifiable sur le terrain.
          Vous patrouillez <strong>en binôme</strong> à bord d’un véhicule et
          devez respecter à la lettre le Code de la Route. Seul l’usage du
          gyrophare orange est autorisé : votre véhicule n’est pas un véhicule de
          secours et n’a donc aucune priorité.
        </p>
      </div>

      <h2>Avant de commencer la patrouille</h2>
      <p className="note">Vous êtes sous l’autorité de votre maire.</p>
      <ul>
        <li>
          Porter obligatoirement la tenue réglementaire orange avec le sigle des
          CCFF, ainsi que votre carte d’adhérent à l’association ;
        </li>
        <li>S’assurer de vos postes radio et de votre téléphone portable ;</li>
        <li>
          Appeler la base radio ADCCFF34-RCSC selon le protocole : « CODECEF 34
          de VCP… (nom de la commune) » ;
        </li>
        <li>
          S’assurer d’avoir une réquisition ou un ordre de mission signé par
          votre maire ;
        </li>
        <li>
          Vérifier que les cartes DFCI de votre commune sont à bord du véhicule.
        </li>
      </ul>

      <h2>Pendant la surveillance</h2>
      <p>
        Notez dans le carnet de patrouille les constats visuels effectués lors
        de votre circuit, tels que : les décharges sauvages, les plaques
        minéralogiques des véhicules garés dans le massif forestier, les
        barrières fermées, etc.
      </p>

      <div className="callout callout--alert">
        <div className="callout__title">🚫 Vous n’avez pas de pouvoir de police</div>
        <p>En cas de problème, prévenez :</p>
        <ul>
          <li>soit la police municipale ;</li>
          <li>soit la gendarmerie (17).</li>
        </ul>
      </div>

      <h2>Fin de patrouille</h2>
      <ul>
        <li>Appelez la base radio « ADCCFF34 - RCSC » ;</li>
        <li>Remplissez correctement votre carnet de patrouille.</li>
      </ul>
      <p className="note">
        Si la base radio n’est pas opérationnelle, vous pouvez joindre le cadre
        d’astreinte de l’AD au{' '}
        <a href="tel:+33643991334">06 43 99 13 34</a>.
      </p>
    </div>
  )
}
