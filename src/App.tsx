import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from "./pages/Home"
import Pacientes from "./pages/Pacientes"
import Profissionais from "./pages/Profissionais"

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/pacientes" element={<Pacientes />} />
        <Route path="/profissionais" element={<Profissionais />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App