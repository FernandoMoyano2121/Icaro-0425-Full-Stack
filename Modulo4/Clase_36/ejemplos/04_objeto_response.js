import express from "express";
const app = express();

/* app.get("/", (req, res) => {
  res.status(200).send("Hola Mundo! ");
});

app.get("/html", (req, res) => {
  res.send("<h1>Titulo</h1><p>Esto es HTML</p>");
});
 */
app.get("/usuarios/:id", (req, res) => {
  const { id } = req.params;

  //Simular la busqueda de usuario
  const usuarioExiste = id === "1";

  if (!usuarioExiste) {
    //404 Not Found - El recurso no existe
    return res.status(404).json({
      error: "Usuario no encontrado",
      id: id,
    });
  }

  //200 Ok- Todo bien
  res.status(200).json({
    id: 1,
    nombre: "Juan",
    email: "jaun@gmail.com",
  });
});

app.listen(3000, () => {
  console.log("servidor corriendo");
});
