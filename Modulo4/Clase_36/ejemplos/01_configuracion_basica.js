// -----------------------------------------------------------------------------
// PASO 1: Importar Express usando require/import()
// -----------------------------------------------------------------------------
import express from "express";

// -----------------------------------------------------------------------------
// PASO 2: Crear la instancia de la aplicación
// -----------------------------------------------------------------------------
const app = express();

// -----------------------------------------------------------------------------
// PASO 3: Iniciar el servidor con listen()
// -----------------------------------------------------------------------------

/* app.listen(3000, () =>
  console.log("Servidor en puerto http://localhost:3000"),
); */

app.listen(process.env.PORT || 3000, () =>
  console.log("Servidor en puerto http://localhost:3000"),
);
