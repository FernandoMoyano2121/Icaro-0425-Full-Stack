import { Router } from "express";
const router = Router();

let productos = [];
/* GET */
router.get("/", (req, res) => {
  res.json(productos);
});

/* POST */
router.post("/", (req, res) => {
  const nuevoProducto = req.body;
  nuevoProducto.id = productos.length + 1;
  productos.push(nuevoProducto);

  //retornar la respues en formato Json con codigo de estado
  res.status(200).json(nuevoProducto);
});

/* PUT */
router.put("/:id", (req, res) => {
  const id = Number(req.params.id);
  const datosActualizados = req.body;

  let producto = productos.find((p) => p.id === id);

  if (!producto) {
    return res.status(404).json({ error: "Producto no encontrado" });
  }

  producto = { ...producto, ...datosActualizados };

  const index = productos.findIndex((p) => p.id === id);
  productos[index] = producto;

  res.json(producto);
});

/* DELETE */
router.delete("/:id", (req, res) => {
  const id = Number(req.params.id);
  const index = productos.findIndex((p) => p.id === id);

  if (index === -1) {
    return res.status(404).json({ error: "Producto no encontrado" });
  }
  productos.splice(index, 1);

  productos.forEach((p, i) => (p.id = i + 1));
  res.json({ message: "Producto eliminado" });
});

/* const miArray = [1, 2, 3, 4, 5, 6];
const elementoCinco = miArray[4]; */

/* RUTAS */

/* GET */
//http://localhost:3000/productos

/* POST */
//http://localhost:3000/productos

/* PUT */
//http://localhost:3000/productos

/* DELETE */
//http://localhost:3000/productos

export default router;
