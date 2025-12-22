/*   useEffect(() => {
    console.log("Componente montado");
    return () => {};
  }, []); */

import { Axios } from "./components/Axios";
import { ContadorUseEffect } from "./components/ContadorUseEffect";
import { Cronometro } from "./components/Cronometro";
import { Fetch } from "./components/Fetch";

function App() {
  return (
    <>
      <div>
        <ContadorUseEffect />
        <Cronometro />
        <Fetch />
        <Axios />
      </div>
    </>
  );
}

export default App;
