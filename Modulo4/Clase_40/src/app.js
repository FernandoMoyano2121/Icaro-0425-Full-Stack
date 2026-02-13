import express from "express";
import { logger } from "./middleware/globales.js";
import { checkUser } from "./middleware/authRoute.js";
import { mockAuth } from "./middleware/mockAuth.js";
import { errorHandler } from "./middleware/errorHandler.js";
import { checkApiKey } from "./middleware/checkApiKey.js";

const app = express();

app.use(express.json());
app.use(express.static("public"));
app.use(logger);

//1.
/* app.get("/", (req, res) => res.status(200).send("Hola Mundo"));

app.post("/", (req, res) => {
  const { nombre, edad, ciudad } = req.body;
  res.status(200).json({
    nombre: nombre,
    edad: edad,
    ciudad: ciudad,
  });
}); */

//2.
/* app.use(mockAuth);
app.get("/admin/dashboard", checkUser, (req, res) => {
  res.send("Panel de administrador");
}); */

//3.
/* app.get("/productos/:id", (req, res, next) => {
  const { id } = req.params;
  if (isNaN(id)) {
    const err = new Error("ID no valido");
    err.statusCode = 400;
    next(err);
  }

  const producto = null;

  if (!producto) {
    const err = new Error("Producto no encontrado");
    err.statusCode = 404;
    return next(err);
  }
});
 */

/* PRACTICA FINAL
a) Implementar un middleware que verifique si en la petición existe una cabecera x-api-key. Si no existe, responder con un error 401.
b) Crear una ruta /secret que implemente dicho middleware que solo responda “Este es un secreto” si la cabecera es válida.
c) Crear otra ruta que no utilice el middleware y que sea de libre acceso.
*/

//4.
app.get("/secret", checkApiKey, (req, res) => {
  res.send("Esto es un secreto");
});

app.get("/", (req, res) => {
  res.status(200).send("Hola Mundo!! ");
});

app.use(errorHandler);

app.listen(3000, () =>
  console.log("Servidor escuchando en http://localhost:3000"),
);
