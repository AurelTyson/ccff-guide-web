export interface RiskLevel {
  level: number
  color: string
  /** CSS var holding the colour swatch */
  cssVar: string
  /** dark text needed on light swatches */
  darkText?: boolean
  name: string
  definition: string
}

export const RISK_LEVELS: RiskLevel[] = [
  {
    level: 1,
    color: 'Bleu',
    cssVar: 'var(--risk-1)',
    name: 'Faible',
    definition: 'Zone peu sensible au feu, risque d’éclosion faible.',
  },
  {
    level: 2,
    color: 'Vert',
    cssVar: 'var(--risk-2)',
    name: 'Léger',
    definition: 'Zone sensible au feu, propagation faible.',
  },
  {
    level: 3,
    color: 'Jaune',
    cssVar: 'var(--risk-3)',
    darkText: true,
    name: 'Modéré',
    definition:
      'Zone modérément sensible au feu avec vitesse de propagation modérée.',
  },
  {
    level: 4,
    color: 'Orange',
    cssVar: 'var(--risk-4)',
    darkText: true,
    name: 'Sévère',
    definition:
      'Zone sensible au feu : la probabilité de propagation d’un feu est fonction du vent et de l’humidité de l’air.',
  },
  {
    level: 5,
    color: 'Rouge',
    cssVar: 'var(--risk-5)',
    name: 'Très sévère',
    definition:
      'Zone très sensible au feu : danger d’éclosion élevé ; vitesse de propagation élevée également.',
  },
  {
    level: 6,
    color: 'Noir',
    cssVar: 'var(--risk-6)',
    name: 'Exceptionnel',
    definition:
      'Zone extrêmement sensible au feu. Niveau de sécheresse extrême. Danger d’éclosion très élevé. Propagation extrêmement rapide.',
  },
]
