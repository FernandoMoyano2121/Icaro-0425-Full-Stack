import "dotenv/config";
import { DataTypes } from "sequelize";
import sequelize from "../../db/conexion.js";
import Producto from "../../models/Producto.js";

// =============================================================================
// PREPARACIÓN — Asegurarse de que la tabla productos existe
// =============================================================================
async function prepararTabla() {
  await sequelize.query("SET FOREIGN_KEY_CHECKS = 0");
  await sequelize.query("DROP TABLE IF EXISTS producto_categoria");
  await sequelize.sync({ force: true });
  await sequelize.query("SET FOREIGN_KEY_CHECKS = 1");

  await Producto.bulkCreate([
    { nombre: "Notebook Lenovo IdeaPad 3", precio: 749999, stock: 20 },
    { nombre: "Mouse Gamer Logitech G502", precio: 59999, stock: 45 },
    { nombre: "Cable USB-C 2 metros", precio: 2999, stock: 200 },
  ]);
}

// =============================================================================
// MIGRACIÓN — up()
// =============================================================================
// Agrega la columna "imagen_url" a la tabla "productos".
//
// En un proyecto con sequelize-cli, este código viviría dentro de un archivo
// autogenerado en la carpeta /migrations con nombre tipo:
//   20240315120000-add-imagen-url-to-productos.js
//
// Acá lo escribimos directamente para entender qué hace por dentro.
// =============================================================================
async function up(queryInterface) {
  console.log('\n[up] Aplicando migración: agregar columna "imagen_url"');

  await queryInterface.addColumn("productos", "imagen_url", {
    type: DataTypes.STRING(255),
    allowNull: true,
    defaultValue: null,
  });

  console.log("Columna imagen_url agregada!");
}

// =============================================================================
// MIGRACIÓN — down()
// =============================================================================
// Revierte exactamente lo que hizo up().
// Si up() agregó una columna, down() la elimina.
// Si up() creó una tabla, down() la borra.
// La simetría entre up y down es lo que hace a las migraciones seguras.
// =============================================================================
async function down(queryInterface) {
  console.log('\n[down] Revirtiendo migración: eliminar columna "imagen_url"');

  await queryInterface.removeColumn("productos", "imagen_url");

  console.log("Columna eliminada de productos");
}

// =============================================================================
// VERIFICACIÓN — mostrar columnas actuales de la tabla
// =============================================================================
async function mostrarColumnas() {
  const [columnas] = await sequelize.query("DESCRIBE productos");

  columnas.forEach((col) => {
    const nullable = col.Null === "YES" ? "Opcional" : "requerido";
    console.log(`${col.Field.padEnd(20)} ${col.Type.padEnd(20)} ${nullable}`);
  });
}

// =============================================================================
// Función principal — demuestra el ciclo completo up → verificar → down → verificar
// =============================================================================
async function main() {
  console.log("DEMO MIGRACIONES");
  const queryInterface = sequelize.getQueryInterface();

  try {
    await prepararTabla();
    await mostrarColumnas();
    await up(queryInterface);
    await mostrarColumnas();
    await down();
    await mostrarColumnas();
  } catch (error) {
    console.log(error.message);
  } finally {
    await sequelize.close();
    console.log("Conexion cerrada");
  }
}

main();
