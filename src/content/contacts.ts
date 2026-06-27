export interface Contact {
  label: string
  /** human-readable number */
  display: string
  /** digits for the tel: href */
  tel: string
  note?: string
  urgent?: boolean
}

export const EMERGENCY: Contact[] = [
  {
    label: 'Sapeurs-Pompiers',
    display: '18',
    tel: '18',
    note: 'Départ de feu, incendie',
    urgent: true,
  },
  {
    label: 'Urgences (n° européen)',
    display: '112',
    tel: '112',
    note: 'Depuis un mobile',
    urgent: true,
  },
  {
    label: 'Gendarmerie / Police',
    display: '17',
    tel: '17',
    note: 'Problème, trouble',
    urgent: true,
  },
]

export const RADIO_CONTACTS: Contact[] = [
  {
    label: 'Base radio de l’Association (ADCCFF34)',
    display: '04 67 59 77 17',
    tel: '+33467597717',
    note: 'À défaut du poste radio',
  },
  {
    label: 'Cadre d’astreinte de l’AD',
    display: '06 43 99 13 34',
    tel: '+33643991334',
    note: 'Si la base radio n’est pas opérationnelle',
  },
]
