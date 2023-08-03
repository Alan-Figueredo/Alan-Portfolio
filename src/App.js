import './App.css';
import { SobreMi } from "../src/components/SobreMi/SobreMi";
import { NavBar } from "./components/NavBar/NavBar";
import { Footer } from './components/Footer/Footer';

function App() {
  return (
    <>
      <NavBar />
      <SobreMi />
      <Footer />
    </>
  );
}

export default App;
