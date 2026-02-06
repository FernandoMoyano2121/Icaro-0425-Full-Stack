import express from "express";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
console.log("__filename : ", __filename);
const __dirname = path.dirname(__filename);
console.log("__dirname : ", __dirname);

const app = express();

app.set("view engine", "ejs"); //Configuramos el motor de plantillas

//C:\Users\Fernando\Desktop\WWW\ICARO-CLASES\Icaro-0425-Full Stack\Modulo4\Clase_38\views
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));

/*********  Iniciando con EJS **************/

/* app.get("/", (req, res) => {
  res.render("index", {
    titulo: "Pagina principal",
    nombre: "Celina Sanguedolce",
  });
}); */

/* ***************** Archivos parciales *********/

/* app.get("/", (req, res) => {
  res.render("index", {
    titulo: "Pagina principal",
    nombre: "Juan ",
  });
}); */

/* ************* Iteraciones y Listados en EJS ************/

/* app.get("/usuarios", (req, res) => {
  const usuarios = ["Ana", "Bruno", "Carlos"];
  res.render("index", { usuarios });
});
 */

/* ************ Archivos staticos ***************/

app.get("/perfil", (req, res) => {
  const usuario = { nombre: "Juan Carlos", esAdmin: true };
  res.render("index", { usuario });
});

app.listen(3000, () => {
  console.log("Servidor corriendo en http://localhost:3000");
});
