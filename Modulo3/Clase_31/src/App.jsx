import EjemploCSSModule from "./examples/EjemploCssModules/EjemploCSSModule";
import EjemploCSSTradicional from "./examples/EjemploCSSTradicional";
import { EjemploInlineStyles } from "./examples/EjemploInlineStyles";

function App() {
  return (
    <>
      <EjemploInlineStyles />
      <EjemploCSSTradicional />
      <EjemploCSSModule />
    </>
  );
}

export default App;
