/* function App() {
  let edad = 33;
  return (
    <div>
      <h1>{edad}</h1>
    </div>
  );
}

export default App; */
import { Bienvenida } from "./components/Bienvenida";
import { Separador } from "./components/Separador";
import { Despedida } from "./components/Despedida";

export const App = () => {
  return (
    <div>
      <Bienvenida />
      <Separador />
      <Despedida />
    </div>
  );
};
