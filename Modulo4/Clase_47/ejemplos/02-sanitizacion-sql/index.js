import express from "express";
import { body, validationResult } from "express-validator";

const app = express();
const PORT = 3000;

app.use(express.json());

/* Base de datos */
const usuariosDB = [
  { id: 1, email: "admin@tienda.com", nombre: "Admin" },
  { id: 2, email: "juan@test.com", nombre: "Juan" },
];

app.post("/buscar-vulnerable", (req, res) => {
  const { email } = req.body;

  // " '1' = '1"
  const queryPeligrosa = `SELECT * FROM usuarios WHERE email = ${email}`;

  res.json({
    advertencia: "Query vulnerable a una inyección sql",
    queryGenerada: queryPeligrosa,
  });
});

const reglasSeguras = [
  body("email")
    .notEmpty()
    .withMessage("El email es requerido")
    .isEmail()
    .withMessage("El formato del email no es valido")
    .trim() //Elimnar espacios -> "email@example "
    .escape(),
];

app.post("/buscar-seguro", reglasSeguras, (req, res) => {
  const errores = validationResult(req);

  if (!errores.isEmpty()) {
    return res.status(422).json({ errores: errores.array() });
  }

  const { email } = req.body;

  const usuario = usuariosDB.find((u) => u.email === email);

  if (!usuario) {
    return res.status(404).json({
      mensaje: "Usuario no encontrado",
    });
  }
  res.json({
    mensaje: "Usuario encontrado",
    usuario: usuario,
  });
});

app.listen(PORT, () => {
  console.log(`\nServidor en http://localhost:${PORT}`);
});
