// TIPOS DE ASOCIACIÓN en Sequelize:
// ─────────────────────────────────────────────────────────────────────
//   hasOne        →  Un registro tiene un solo registro en otra tabla  (1:1)
//   belongsTo     →  Un registro pertenece a otro registro             (N:1)
//   hasMany       →  Un registro tiene muchos registros en otra tabla  (1:N)
//   belongsToMany →  Relación muchos a muchos (N:M) via tabla intermedia
// ─────────────────────────────────────────────────────────────────────

import sequelize from "../../db/conexion.js";
import Categoria from "../../models/Categoria.js";
import Producto from "../../models/Producto.js";

Producto.belongsToMany(Categoria, {
  through: "producto_categoria",
  foreignKey: "producto_id",
  otherKey: "categoria_id",
  as: "categorias", //producto.categorias
});

Categoria.belongsToMany(Producto, {
  through: "producto_categoria",
  foreignKey: "categoria_id",
  otherKey: "producto_id",
  as: "productos", //catogoria.productos
});

async function insertarDatos() {
  /* CATEGORIAS */
  const electronica = await Categoria.create({
    nombre: "Electrónica",
    descripcion: "Dispositivos electrónicos, gadgets y tecnología",
  });
  const gaming = await Categoria.create({
    nombre: "Gaming",
    descripcion: "Consolas, periféricos y videojuegos",
  });
  const hogar = await Categoria.create({
    nombre: "Hogar",
    descripcion: "Electrodomésticos y artículos para el hogar",
  });

  /* PRODUCTOS */

  const notebook = await Producto.create({
    nombre: "Notebook Lenovo IdeaPad 3",
    precio: 749999,
    stock: 20,
  });
  const mouse = await Producto.create({
    nombre: "Mouse Gamer Logitech G502",
    precio: 59999,
    stock: 45,
  });
  const cafetera = await Producto.create({
    nombre: "Cafetera Philips Senseo",
    precio: 45999,
    stock: 40,
  });

  await Producto.create({
    nombre: "Cable USB",
    precio: 2999,
    stock: 200,
  });

  await notebook.addCategoria(electronica);
  await notebook.addCategoria(gaming);
  await mouse.addCategoria(gaming);
  await mouse.addCategoria(hogar);

  console.log("-- Datos insertados! ");
}

async function productosConCategorias() {
  console.log(
    "\n[findAll + include] Productos con sus categorías (LEFT JOIN):",
  );

  const productos = await Producto.findAll({
    include: {
      model: Categoria,
      as: "categorias",
      attributes: ["nombre"],
      through: { attributes: [] },
    },
  });

  productos.forEach((p) => {
    const cats =
      p.categorias.map((c) => c.nombre).join(", ") || "(Sin categoria)";
    console.log(`${p.nombre.padEnd(35)} -- ${cats}`);
  });
}

async function main() {
  try {
    await sequelize.sync();
    await insertarDatos();
    await productosConCategorias();
  } catch (error) {
    console.error(error.message);
  } finally {
    await sequelize.close();
    console.log("conexion cerrada");
  }
}

main();
