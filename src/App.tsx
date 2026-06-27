import { Routes, Route, Navigate } from 'react-router-dom'
import AppShell from './components/AppShell'
import Home from './routes/Home'
import Urgence from './routes/Urgence'
import Missions from './routes/Missions'
import Debroussaillement from './routes/Debroussaillement'
import EmploiDuFeu from './routes/EmploiDuFeu'
import SecuriteLargage from './routes/SecuriteLargage'
import EchelleRisques from './routes/EchelleRisques'
import AlphabetPhonetique from './routes/AlphabetPhonetique'
import Epeleur from './routes/Epeleur'
import Glossaire from './routes/Glossaire'
import Cartes from './routes/Cartes'
import Recherche from './routes/Recherche'
import Installer from './routes/Installer'
import APropos from './routes/APropos'

export default function App() {
  return (
    <Routes>
      <Route element={<AppShell />}>
        <Route index element={<Home />} />
        <Route path="urgence" element={<Urgence />} />
        <Route path="missions" element={<Missions />} />
        <Route path="debroussaillement" element={<Debroussaillement />} />
        <Route path="emploi-du-feu" element={<EmploiDuFeu />} />
        <Route path="securite-largage" element={<SecuriteLargage />} />
        <Route path="echelle-de-risques" element={<EchelleRisques />} />
        <Route path="alphabet" element={<AlphabetPhonetique />} />
        <Route path="epeleur" element={<Epeleur />} />
        <Route path="glossaire" element={<Glossaire />} />
        <Route path="cartes" element={<Cartes />} />
        <Route path="recherche" element={<Recherche />} />
        <Route path="installer" element={<Installer />} />
        <Route path="a-propos" element={<APropos />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Route>
    </Routes>
  )
}
