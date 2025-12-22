import { Boton1 } from "./components/Eventos/Boton1";
import { Boton2 } from "./components/Eventos/Boton2";
import { Formulario } from "./components/Eventos/Formulario";
import { Personajes } from "./components/Personajes";
import { RenderizadoDeListas } from "./components/RenderizadoDeListas";

function App() {
  const personajes = [
    {
      id: 1,
      nombre: "Jon Snow",
      imagen:
        "https://upload.wikimedia.org/wikipedia/en/thumb/3/30/Jon_Snow_Season_8.png/250px-Jon_Snow_Season_8.png",
    },
    {
      id: 2,
      nombre: "Daenerys Tagaryen",
      imagen:
        "https://media.vogue.mx/photos/66b3de4d6f2542a25da55a86/2:3/w_2560%2Cc_limit/daenerys-targaryen.jpg",
    },
  ];
  return (
    <>
      <div>
        <Boton1 />
        <br />
        <br />
        <br />
        <Formulario />
        <br />
        <br />
        <Boton2 mensaje="Hola queridos alumnos" />
        <br />
        <br />
        <Personajes />
        <br />
        <br />
        <RenderizadoDeListas personajes={personajes} />
      </div>
    </>
  );
}

export default App;
