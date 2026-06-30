export interface Aircraft {
  name: string
  fleet: string
  load: string
}

export const AIRCRAFT: Aircraft[] = [
  { name: 'Thrush 710T', fleet: 'Cellule départementale', load: '1,5 t' },
  { name: 'Tracker CS2F', fleet: 'Sécurité civile', load: '3,5 t' },
  { name: 'Canadair CL415', fleet: 'Sécurité civile', load: '6 t' },
  { name: 'Dash Q400', fleet: 'Sécurité civile', load: '10 t' },
]

export const LARGAGE_FACTS: string[] = [
  'Vitesse de l’avion : 120 nœuds (230 km/h).',
  'Hauteur de largage : entre 30 et 50 m (plus bas pour les avions de la cellule départementale).',
  'Impact au sol : 300 kg/m² (environ 350 kg pour un Canadair, soit 350 bars de pression).',
  'Projections de pierres, de branches et autres.',
]

export const LARGAGE_REFLEXES: string[] = [
  'Regagner le véhicule et se mettre à l’intérieur.',
  'Sinon s’accroupir, mains sur la tête, si possible derrière un arbre, un muret ou un élément du relief permettant d’atténuer l’impact du largage.',
  'Dans tous les cas, s’éloigner de toutes les choses « instables » qui peuvent être projetées et causer des lésions importantes et graves.',
]

export interface RincageAdvice {
  produit: string
  conseil: string
}

export const LARGAGE_RINCAGE: RincageAdvice[] = [
  {
    produit: 'Produit moussant',
    conseil:
      'Rincer la peau abondamment et changer de vêtements. En cas de contact avec les yeux : rincer immédiatement et abondamment à l’eau.',
  },
  {
    produit: 'Produit retardant',
    conseil:
      'Rincer la peau abondamment et changer de vêtements. En cas de contact avec les yeux, d’ingestion ou de contact avec la bouche : rincer immédiatement et abondamment à l’eau.',
  },
]
