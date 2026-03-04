import sequelize from "../../db/conexion.js";
import Categoria from "../../models/Categoria.js";
import Producto from "../../models/Producto.js";

async function main() {
  console.log("Sincronizando modelos con la base de datos! ");
  try {
    await sequelize.query("SET FOREIGN_KEY_CHECKS = 0");
    await sequelize.query("DROP TABLE IF EXISTS producto_categoria");

    await sequelize.sync({ force: true });
    await sequelize.query("SET FOREIGN_KEY_CHECKS = 1");

    console.log("-- Tablas sincronizadas");
  } catch (error) {
    console.error(error.message);
  } finally {
    await sequelize.close();
    console.log("Conexion cerrada");
  }
}

main();
