import express from "express";

const app = express();
const PORT = 3000;

//ruta GET RAIZ -> http://localhost:3000
app.get("/", (req, res) => {
  res.send("Hola Mundo desde Express");
});

app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto ${PORT}`);
});
