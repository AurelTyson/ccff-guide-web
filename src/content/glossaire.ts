export interface Acronym {
  acr: string
  def: string
}

export const GLOSSARY: Acronym[] = [
  { acr: 'AFERPU', def: 'Autres Feux de l’Espace Rural et Péri-Urbain' },
  { acr: 'APFM', def: 'Auxiliaire de Protection de la Forêt Méditerranéenne' },
  { acr: 'CCF', def: 'Camion Citerne Feux de Forêts (Sapeurs-Pompiers)' },
  { acr: 'CCFF', def: 'Comité Communal Feux de Forêts' },
  { acr: 'CFM', def: 'Conservatoire de la Forêt Méditerranéenne' },
  { acr: 'COS', def: 'Commandant des Opérations de Secours' },
  {
    acr: 'CTRC34',
    def: 'Cellule Technique départementale de Recherche des Causes des incendies de végétation',
  },
  {
    acr: 'DDTM34',
    def: 'Direction Départementale des Territoires et de la Mer de l’Hérault',
  },
  { acr: 'DFCI', def: 'Défense de la Forêt Contre les Incendies' },
  { acr: 'DOS', def: 'Directeur des Opérations de Secours' },
  { acr: 'FORSAP', def: 'Forestiers-Sapeurs' },
  {
    acr: 'MAS',
    def: 'Modules Adaptés de Surveillance (patrouilles de l’Armée)',
  },
  {
    acr: 'ONCFS',
    def: 'Office National de la Chasse et de la Faune Sauvage',
  },
  { acr: 'ONF', def: 'Office National des Forêts' },
  { acr: 'PC', def: 'Poste de Commandement' },
  { acr: 'RCSC', def: 'Réserve Communale de Sécurité Civile' },
  {
    acr: 'SDIS34',
    def: 'Service Départemental d’Incendie et de Secours de l’Hérault',
  },
  {
    acr: 'SIDPC',
    def: 'Service Interministériel de Défense et de Protection Civile',
  },
]

export const POINT_DE_TRANSIT =
  'POINT DE TRANSIT = point de regroupement des secours.'
