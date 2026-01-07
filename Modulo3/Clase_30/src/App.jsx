import { BrowserRouter, Route, Routes } from "react-router";
import { EjemploBasico } from "./examples/EjemploBasico";
import { EjemploNavegacion } from "./examples/EjemploNavegacion";
import { EjemploParams } from "./examples/EjemploParams";
import { Home } from "./components/Home";
import { Dashboard } from "./components/Dashboard";
import { EjemploRutaProtegida } from "./examples/EjemploRutaProtegida";
import { Login } from "./components/login";

export const App = () => {
  const isAuthenticated = true; //Cambiar a false/true

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route
          element={<EjemploRutaProtegida isAuthenticated={isAuthenticated} />}
        >
          <Route path="/" element={<Home />}></Route>
          <Route path="/dashboard" element={<Dashboard />}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

{
  /*  <EjemploBasico /> */
}
{
  /* <EjemploNavegacion /> */
}
{
  /* <EjemploParams /> */
}
