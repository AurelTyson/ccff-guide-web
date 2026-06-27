import { SECTIONS } from './sections'
import { GLOSSARY } from './glossaire'
import { RISK_LEVELS } from './risques'
import { AIRCRAFT } from './largage'
import { EMERGENCY, RADIO_CONTACTS } from './contacts'

export interface SearchEntry {
  kind: string
  title: string
  snippet: string
  to: string
  terms: string
}

const sectionEntries: SearchEntry[] = SECTIONS.map((s) => ({
  kind: 'Rubrique',
  title: s.title,
  snippet: s.summary,
  to: `/${s.path}`,
  terms: [s.short, ...s.keywords].join(' '),
}))

const glossaryEntries: SearchEntry[] = GLOSSARY.map((g) => ({
  kind: 'Acronyme',
  title: g.acr,
  snippet: g.def,
  to: '/glossaire',
  terms: `${g.acr} ${g.def}`,
}))

const riskEntries: SearchEntry[] = RISK_LEVELS.map((r) => ({
  kind: 'Niveau de risque',
  title: `Niveau ${r.level} — ${r.color} (${r.name})`,
  snippet: r.definition,
  to: '/echelle-de-risques',
  terms: `${r.color} ${r.name} risque ${r.level}`,
}))

const aircraftEntries: SearchEntry[] = AIRCRAFT.map((a) => ({
  kind: 'Avion bombardier',
  title: a.name,
  snippet: `${a.fleet} — ${a.load} de charge`,
  to: '/securite-largage',
  terms: `${a.name} ${a.fleet} largage avion`,
}))

const contactEntries: SearchEntry[] = [...EMERGENCY, ...RADIO_CONTACTS].map(
  (c) => ({
    kind: 'Numéro utile',
    title: `${c.label} — ${c.display}`,
    snippet: c.note ?? '',
    to: c.urgent ? '/urgence' : '/missions',
    terms: `${c.label} ${c.display} téléphone numéro appel`,
  }),
)

export const SEARCH_INDEX: SearchEntry[] = [
  ...sectionEntries,
  ...glossaryEntries,
  ...riskEntries,
  ...aircraftEntries,
  ...contactEntries,
]
