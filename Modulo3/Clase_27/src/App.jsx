import React from "react";
import { FomularioControlado } from "./components/FomularioControlado";
import { Formulario } from "./components/Formulario";
import { FormularioNoControlado } from "./components/FormularioNoControlado";
import { FormularioBasico } from "./components/react-hook-form/FormularioBasico";
import { FormularioAvanzado } from "./components/react-hook-form/FormularioAvanzado";
import { FormularioConErrores } from "./components/react-hook-form/FormularioConErrores";

export const App = () => {
  return (
    <div>
      {/* <FomularioControlado /> */}
      {/* <FormularioNoControlado/> */}
      {/* <Formulario /> */}
      {/* -------------------- */}

      {/*  <FormularioBasico /> */}
      {/* <FormularioAvanzado /> */}
      <FormularioConErrores />
    </div>
  );
};

export default App;
