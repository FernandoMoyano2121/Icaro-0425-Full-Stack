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

// =============================================================================
// PASO 1: Declarar la asociación N:M
// =============================================================================
// Esto se hace UNA vez antes de usar los modelos relacionados.
// Le dice a Sequelize que la tabla intermedia se llama 'producto_categoria'.
// =============================================================================
// 'as' define el nombre de la propiedad con la que accedemos a los datos
// relacionados en el resultado. Sin 'as', Sequelize intenta adivinar el nombre
// y puede fallar con palabras en español. Con 'as' lo controlamos nosotros.
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

// =============================================================================
// Insertar datos de ejemplo
// =============================================================================
// Usamos un subconjunto de los datos de Clase 44 para mantener consistencia
// e incluimos un producto SIN categoría para ilustrar el comportamiento
// de cada tipo de JOIN en las funciones siguientes.
// =============================================================================
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

  // Este producto NO tiene categoría asignada → aparecerá como NULL en LEFT JOIN
  // y directamente no aparecerá en el resultado de un INNER JOIN
  await Producto.create({
    nombre: "Cable USB",
    precio: 2999,
    stock: 200,
  });
  // addCategoria: método que Sequelize genera automáticamente
  // gracias a la asociación belongsToMany. Inserta en producto_categoria.
  // Llamamos addCategoria dos veces para el notebook porque pertenece a dos categorías.
  await notebook.addCategoria(electronica); // N:M: primera categoría
  await notebook.addCategoria(gaming); // N:M: segunda categoría
  await mouse.addCategoria(gaming);
  await mouse.addCategoria(hogar);
  await cafetera.addCategoria(hogar);

  console.log("-- Datos insertados! ");
}

// =============================================================================
// READ — Productos con sus categorías
// =============================================================================
//
// SQL EQUIVALENTE:
//   SELECT p.nombre, c.nombre AS categoria
//   FROM productos p
//   LEFT JOIN producto_categoria pc ON pc.producto_id  = p.id
//   LEFT JOIN categorias c          ON c.id            = pc.categoria_id
//
// ¿Por qué LEFT JOIN y no INNER JOIN?
//   Sequelize usa LEFT JOIN para respetar el lado "principal" de la consulta.
//   Al hacer Producto.findAll({ include: Categoria }) le estamos diciendo:
//   "dame TODOS los productos y, si tienen categorías, traélas también."
//   Un INNER JOIN ocultaría los productos sin categoría.
async function productosConCategorias() {
  console.log(
    "\n[findAll + include] Productos con sus categorías (LEFT JOIN):",
  );

  const productos = await Producto.findAll({
    include: {
      model: Categoria,
      as: "categorias", // debe coincidir con el 'as' de la asociación
      attributes: ["nombre"],
      through: { attributes: [] }, // ocultar columnas de la tabla intermedia
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
    // sync() sin opciones crea la tabla intermedia 'producto_categoria'
    // si no existe, sin tocar las tablas categorias y productos.
    // Es necesario porque belongsToMany genera una tercera tabla que
    // el 02-sync-modelos.js no conocía (las asociaciones se declaran acá).
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
