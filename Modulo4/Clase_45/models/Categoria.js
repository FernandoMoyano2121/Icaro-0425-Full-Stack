import { DataTypes } from "sequelize";
import sequelize from "../db/conexion.js";

const Categoria = sequelize.define(
  "Categoria",
  {
    nombre: {
      type: DataTypes.STRING(80),
      allowNull: false,
      unique: true,
    },
    descripcion: {
      type: DataTypes.TEXT,
      allowNull: true, // columna opcional
    },
  },
  {
    tableName: "categorias",
    timestamps: false,
  },
);
export default Categoria;
