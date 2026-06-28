export type Accent = 'green' | 'red' | 'orange' | 'blue'

export interface RouteMeta {
  id: string
  /** relative slug used both for routing and links */
  path: string
  /** title shown in the header bar */
  title: string
  /** short label for tiles / nav */
  short: string
  icon: string
  accent: Accent
  summary: string
  keywords: string[]
  /** appears on the home grid */
  tile: boolean
}

export const SECTIONS: RouteMeta[] = [
  {
    id: 'urgence',
    path: 'urgence',
    title: 'Urgence & départ de feu',
    short: 'Urgence',
    icon: '🚨',
    accent: 'red',
    summary:
      'Que faire face à une fumée, un départ de feu ou un incendie de végétation. Numéros et ordre des appels.',
    keywords: [
      'feu',
      'incendie',
      'pompiers',
      '18',
      '112',
      'départ de feu',
      'fumée',
      'secours',
      'COS',
      'feu naissant',
      'ordre opérationnel',
    ],
    tile: true,
  },
  {
    id: 'position',
    path: 'position',
    title: 'Ma position',
    short: 'Ma position',
    icon: '📍',
    accent: 'red',
    summary:
      'Votre position GPS et le carreau DFCI à transmettre aux secours.',
    keywords: [
      'position',
      'GPS',
      'DFCI',
      'carreau',
      'coordonnées',
      'localisation',
      'où suis-je',
      'point de transit',
      'secours',
    ],
    tile: true,
  },
  {
    id: 'missions',
    path: 'missions',
    title: 'Vos missions',
    short: 'Missions',
    icon: '🧭',
    accent: 'green',
    summary:
      'Prévention, sensibilisation, surveillance. Avant la patrouille, autorité du maire, pas de pouvoir de police.',
    keywords: [
      'patrouille',
      'binôme',
      'prévention',
      'surveillance',
      'maire',
      'tenue orange',
      'carnet',
      'pouvoir de police',
      'gyrophare',
      'réquisition',
    ],
    tile: true,
  },
  {
    id: 'debroussaillement',
    path: 'debroussaillement',
    title: 'Débroussaillement',
    short: 'Débrouss.',
    icon: '🪓',
    accent: 'green',
    summary:
      'Obligation légale de débroussailler : 50 m autour des constructions dans les zones exposées.',
    keywords: [
      'débroussaillement',
      '50 mètres',
      'OLD',
      'obligation',
      'constructions',
      'ZAC',
      'lotissement',
      'camping',
    ],
    tile: true,
  },
  {
    id: 'emploi-du-feu',
    path: 'emploi-du-feu',
    title: 'Emploi du feu',
    short: 'Emploi du feu',
    icon: '🔥',
    accent: 'orange',
    summary:
      'Le feu est interdit toute l’année. RSD et arrêté du 25 avril 2002 : calendrier interdit / déclaratif / libre.',
    keywords: [
      'brûlage',
      'incinération',
      'RSD',
      'arrêté',
      '25 avril 2002',
      'déchets verts',
      'déclaratif',
      'interdiction',
      'calendrier',
    ],
    tile: true,
  },
  {
    id: 'echelle-de-risques',
    path: 'echelle-de-risques',
    title: 'Échelle de risques',
    short: 'Risques',
    icon: '🌡️',
    accent: 'orange',
    summary:
      'Les 6 niveaux de risque feu de forêt, du bleu (faible) au noir (exceptionnel).',
    keywords: [
      'niveau',
      'risque',
      'bleu',
      'vert',
      'jaune',
      'orange',
      'rouge',
      'noir',
      'sévère',
      'éclosion',
      'propagation',
    ],
    tile: true,
  },
  {
    id: 'securite-largage',
    path: 'securite-largage',
    title: 'Sécurité largage',
    short: 'Largage',
    icon: '✈️',
    accent: 'blue',
    summary:
      'Conduite à tenir face aux avions bombardiers d’eau. Charges, distances, risques et premiers réflexes.',
    keywords: [
      'avion',
      'largage',
      'canadair',
      'dash',
      'tracker',
      'air tractor',
      'bombardier',
      'SDIS',
      'aérien',
    ],
    tile: true,
  },
  {
    id: 'cartes',
    path: 'cartes',
    title: 'Cartes',
    short: 'Cartes',
    icon: '🗺️',
    accent: 'green',
    summary:
      'Vigilance incendie du jour (risque et accès aux massifs) et carroyage DFCI.',
    keywords: [
      'vigilance',
      'risque du jour',
      'accès massifs',
      'fréquentation',
      'carroyage',
      'DFCI',
      'coordonnées',
      'carte',
      'Hérault',
    ],
    tile: true,
  },
  {
    id: 'carte-dfci',
    path: 'carte-dfci',
    title: 'Carte DFCI interactive',
    short: 'Carte DFCI',
    icon: '🧭',
    accent: 'green',
    summary:
      'Carte interactive : lisez le carreau DFCI de n’importe quel point (en ligne).',
    keywords: [
      'carte',
      'interactive',
      'DFCI',
      'carreau',
      'IGN',
      'localiser',
      'point',
      'massif',
    ],
    // Reached from the Cartes tab, not a Home tile.
    tile: false,
  },
  {
    id: 'alphabet',
    path: 'alphabet',
    title: 'Alphabet phonétique',
    short: 'Alphabet',
    icon: '🔤',
    accent: 'green',
    summary:
      'Alphabet international phonétique pour épeler clairement à la radio.',
    keywords: ['alphabet', 'phonétique', 'radio', 'épeler', 'alpha', 'bravo', 'charlie'],
    tile: true,
  },
  {
    id: 'epeleur',
    path: 'epeleur',
    title: 'Épeleur radio',
    short: 'Épeleur',
    icon: '🔤',
    accent: 'green',
    summary:
      'Tapez un mot ou une plaque, obtenez son épellation phonétique pour la radio.',
    keywords: [
      'épeler',
      'épeleur',
      'radio',
      'plaque',
      'immatriculation',
      'phonétique',
      'alphabet',
      'dicter',
    ],
    tile: true,
  },
  {
    id: 'glossaire',
    path: 'glossaire',
    title: 'Glossaire des acronymes',
    short: 'Glossaire',
    icon: '📖',
    accent: 'green',
    summary: 'Les sigles et acronymes : CCFF, DFCI, SDIS, COS, RCSC…',
    keywords: ['acronyme', 'sigle', 'glossaire', 'définition', 'CCFF', 'DFCI'],
    tile: true,
  },
  {
    id: 'installer',
    path: 'installer',
    title: 'Installer l’application',
    short: 'Installer',
    icon: '📲',
    accent: 'green',
    summary:
      'Ajouter le guide à l’écran d’accueil pour un accès rapide et hors-ligne.',
    keywords: [
      'installer',
      'installation',
      'écran d’accueil',
      'home screen',
      'PWA',
      'application',
      'iphone',
      'safari',
      'android',
      'chrome',
      'ajouter',
      'hors-ligne',
    ],
    tile: true,
  },
  {
    id: 'reglages',
    path: 'reglages',
    title: 'Réglages d’affichage',
    short: 'Réglages',
    icon: '🔆',
    accent: 'green',
    summary:
      'Taille du texte et contraste élevé pour une lecture confortable en plein soleil.',
    keywords: [
      'réglages',
      'affichage',
      'texte',
      'taille',
      'contraste',
      'accessibilité',
      'lisibilité',
      'soleil',
      'grand',
    ],
    tile: true,
  },
  {
    id: 'a-propos',
    path: 'a-propos',
    title: 'À propos',
    short: 'À propos',
    icon: 'ℹ️',
    accent: 'green',
    summary: 'Source du guide, version et avertissement.',
    keywords: ['à propos', 'source', 'version', 'association', 'ADCCFF34'],
    tile: true,
  },
]

export const TILE_SECTIONS = SECTIONS.filter((s) => s.tile)

const BY_PATH = new Map(SECTIONS.map((s) => [s.path, s]))

/** Title for the header bar, given a pathname like "/urgence". */
export function titleForPath(pathname: string): string | null {
  const slug = pathname.replace(/^\/+/, '').split('/')[0]
  if (slug === '' ) return null
  if (slug === 'recherche') return 'Recherche'
  return BY_PATH.get(slug)?.title ?? null
}
