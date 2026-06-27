export type FirePeriod = 'libre' | 'declaratif' | 'interdit'

export interface FirePeriodInfo {
  id: FirePeriod
  label: string
  cssVar: string
  dates: string
  description: string
}

export const FIRE_PERIODS: FirePeriodInfo[] = [
  {
    id: 'interdit',
    label: 'Interdiction',
    cssVar: 'var(--risk-5)',
    dates: '16.06 → 30.09',
    description: 'Emploi du feu totalement interdit.',
  },
  {
    id: 'declaratif',
    label: 'Régime déclaratif',
    cssVar: 'var(--risk-3)',
    dates: '16.03 → 15.06   ·   01.10 → 15.10',
    description: 'Emploi du feu soumis à déclaration préalable en mairie.',
  },
  {
    id: 'libre',
    label: 'Période non réglementée',
    cssVar: 'var(--risk-2)',
    dates: '01.01 → 15.03   ·   16.10 → 31.12',
    description: 'Hors interdiction et hors régime déclaratif.',
  },
]

export const FIRE_PERIOD_BY_ID = new Map(FIRE_PERIODS.map((p) => [p.id, p]))

export interface CalMonth {
  abbr: string
  period: FirePeriod
}

/** Dominant period per month, for the colour bar. */
export const MONTHS: CalMonth[] = [
  { abbr: 'Jan', period: 'libre' },
  { abbr: 'Fév', period: 'libre' },
  { abbr: 'Mar', period: 'declaratif' },
  { abbr: 'Avr', period: 'declaratif' },
  { abbr: 'Mai', period: 'declaratif' },
  { abbr: 'Jun', period: 'interdit' },
  { abbr: 'Jul', period: 'interdit' },
  { abbr: 'Aoû', period: 'interdit' },
  { abbr: 'Sep', period: 'interdit' },
  { abbr: 'Oct', period: 'declaratif' },
  { abbr: 'Nov', period: 'libre' },
  { abbr: 'Déc', period: 'libre' },
]
