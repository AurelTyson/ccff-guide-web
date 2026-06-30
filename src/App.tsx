import { lazy } from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import AppShell from './components/AppShell'
import Home from './routes/Home'
import Urgence from './routes/Urgence'
import Position from './routes/Position'
import Missions from './routes/Missions'
import Debroussaillement from './routes/Debroussaillement'
import EmploiDuFeu from './routes/EmploiDuFeu'
import SecuriteLargage from './routes/SecuriteLargage'
import EchelleRisques from './routes/EchelleRisques'
import AlphabetPhonetique from './routes/AlphabetPhonetique'
import Epeleur from './routes/Epeleur'
import Glossaire from './routes/Glossaire'
import Cartes from './routes/Cartes'

// Secondary / heavy routes — code-split out of the main bundle. CarteDfci pulls
// in Leaflet (online-only); Recherche pulls in Fuse.js. AppShell hosts the
// shared <Suspense> boundary, so no per-route fallback is needed here.
const CarteDfci = lazy(() => import('./routes/CarteDfci'))
const Recherche = lazy(() => import('./routes/Recherche'))
const Installer = lazy(() => import('./routes/Installer'))
const Reglages = lazy(() => import('./routes/Reglages'))
const APropos = lazy(() => import('./routes/APropos'))

export default function App() {
  return (
    <Routes>
      <Route element={<AppShell />}>
        <Route index element={<Home />} />
        <Route path="urgence" element={<Urgence />} />
        <Route path="position" element={<Position />} />
        <Route path="missions" element={<Missions />} />
        <Route path="debroussaillement" element={<Debroussaillement />} />
        <Route path="emploi-du-feu" element={<EmploiDuFeu />} />
        <Route path="securite-largage" element={<SecuriteLargage />} />
        <Route path="echelle-de-risques" element={<EchelleRisques />} />
        <Route path="alphabet" element={<AlphabetPhonetique />} />
        <Route path="epeleur" element={<Epeleur />} />
        <Route path="glossaire" element={<Glossaire />} />
        <Route path="cartes" element={<Cartes />} />
        <Route path="carte-dfci" element={<CarteDfci />} />
        <Route path="recherche" element={<Recherche />} />
        <Route path="installer" element={<Installer />} />
        <Route path="reglages" element={<Reglages />} />
        <Route path="a-propos" element={<APropos />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  )
}
