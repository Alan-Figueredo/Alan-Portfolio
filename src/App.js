import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import  { Inicio } from "../src/components/Inicio/Inicio";
import { SobreMi } from "../src/components/SobreMi/SobreMi";
import { Proyectos } from "../src/components/ProyectosPage/Proyectos";
import { NavBar } from "./components/NavBar/NavBar";
import { Contacto } from "../src/components/Contacto/Contacto";
import { Footer } from './components/Footer/Footer';

function App() {
  return (
    <Router>
      <NavBar/>
      <Routes>
          <Route index path="/" element={<Inicio/>}/>
          <Route path="/sobre-mi" element={<SobreMi/>}/>
          <Route path="/proyectos" element={<Proyectos/>}/>
          <Route path="/contacto" element={<Contacto/>}/>
      </Routes>
      <Footer/>
    </Router>
  );
}

export default App;
