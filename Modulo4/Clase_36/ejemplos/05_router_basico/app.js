// -----------------------------------------------------------------------------
// Importar Express y crear la aplicación
// -----------------------------------------------------------------------------

import express, { json } from "express";
const app = express();

// -----------------------------------------------------------------------------
// Importar el router de usuarios
// -----------------------------------------------------------------------------
import userRoutes from "./routes/user.routes.js";

app.use(json());
app.use("/users", userRoutes);

app.listen(3000, () => {
  console.log("servidor corriendo");
});
