import EmergencyBar from '../components/EmergencyBar'
import SectionCard from '../components/SectionCard'
import { SECTIONS, TILE_SECTIONS } from '../content/sections'

export default function Home() {
  const urgence = SECTIONS.find((s) => s.id === 'urgence')!
  const rest = TILE_SECTIONS.filter((s) => s.id !== 'urgence')

  return (
    <div className="page">
      <p className="lead">
        Mémo de terrain du bénévole des Comités Communaux Feux de Forêts de
        l’Hérault.
      </p>

      <section>
        <h2>Numéros d’urgence</h2>
        <EmergencyBar />
      </section>

      <section>
        <h2>Rubriques</h2>
        <div className="tiles">
          <SectionCard section={urgence} wide />
          {rest.map((s) => (
            <SectionCard key={s.id} section={s} />
          ))}
        </div>
      </section>
    </div>
  )
}
