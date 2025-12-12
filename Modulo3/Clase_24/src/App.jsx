import { ComponenteHijo } from "./components/ComponenteHijo";
import { Contador } from "./components/Contador";
import { Saludo } from "./components/Saludo";

function App() {
  return (
    <>
      <ComponenteHijo mensaje="Hola Estudiantes" />
      <Saludo nombre="Celina" edad={30} />
      <Contador />
    </>
  );
}

export default App;
