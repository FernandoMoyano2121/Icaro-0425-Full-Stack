import "./App.css";
import { BotonBasico } from "./components/01_BotonBasico";
import { ComponentesComunes } from "./components/02_ComponentesComunes";
import { Iconos } from "./components/03_Iconos";
import ThemeProviderEjemplo from "./components/04_ThemeProvider";

function App() {
  return (
    <>
      <BotonBasico />
      <ComponentesComunes />
      <Iconos />
      <ThemeProviderEjemplo />
    </>
  );
}

export default App;
