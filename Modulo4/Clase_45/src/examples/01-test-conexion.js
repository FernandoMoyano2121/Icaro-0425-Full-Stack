import sequelize from "../../db/conexion.js";

async function main() {
  console.log("Probando conexion a la base de datos");

  try {
    await sequelize.authenticate();
    console.log("Conexion exitosa");
    console.log("Host: ", sequelize.config.host);
    console.log("Base de datos : ", sequelize.config.database);
    console.log("Usuario: ", sequelize.config.username);
  } catch (error) {
    console.error(error);
  } finally {
    await sequelize.close();
    console.log("Conexion cerrada");
  }
}

main();
