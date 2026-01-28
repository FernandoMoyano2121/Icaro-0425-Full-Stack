import express from "express";
const app = express();

app.get("/productos/:productoId", (req, res) => {
  console.log(`Parametro`, req.params.productoId); //path param
  console.log(`Consulta`, req.query); //query params
  console.log(`Metodo`, req.method); //GET
  res.send("Informacion del producto");
});

app.listen(3000, () => {
  console.log("servidor corriendo");
});
