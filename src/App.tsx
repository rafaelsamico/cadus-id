import { useEffect, useState } from "react"
import {
  BrowserRouter,
  Routes,
  Route,
  useLocation,
} from "react-router-dom"
import { useReducedMotion } from "motion/react"
import Home from "./pages/Home"
import Pacientes from "./pages/Pacientes"
import Profissionais from "./pages/Profissionais"
import { PixelCurtain } from "./components/motion/PixelCurtain"

// Dentro do Router para acessar a rota atual. A rota EXIBIDA fica atrás da rota
// real: só atualiza quando a cortina cobre a tela por completo, então a troca
// de página acontece escondida — sem flash da página nova antes da transição.
function AppRoutes() {
  const location = useLocation()
  const reduced = useReducedMotion()
  const [displayLocation, setDisplayLocation] = useState(location)

  // Sem cortina (reduced-motion), a página troca imediatamente.
  useEffect(() => {
    if (reduced) setDisplayLocation(location)
  }, [reduced, location])

  return (
    <>
      <PixelCurtain onCovered={() => setDisplayLocation(location)} />
      <Routes location={displayLocation}>
        <Route path="/" element={<Home />} />
        <Route path="/pacientes" element={<Pacientes />} />
        <Route path="/profissionais" element={<Profissionais />} />
      </Routes>
    </>
  )
}

function App() {
  return (
    <BrowserRouter>
      <AppRoutes />
    </BrowserRouter>
  )
}

export default App
