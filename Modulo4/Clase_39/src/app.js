import express, { json } from "express";
import taskRoutes from "./routes/task.routes.js";

const app = express();

const PORT = 3000;
app.use(json());

//Montar rutas
app.use("/api", taskRoutes);

//Mensaje para rutas no encontradas
app.use((req, res) => {
  res.status(404).json({ error: "Endpoint no encontrado" });
});

//Arrancar el servidor
app.listen(PORT, () => {
  console.log(`Server Escuchando en http://localhost:${PORT}`);
});
