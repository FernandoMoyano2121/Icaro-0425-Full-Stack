import "dotenv/config";
import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
// FIXME: import bycrypt from "bcrypt";
import { body } from "express-validator";

const app = express();
const PORT = 3002;
const SECRET = process.env.JWT_SECRET || "secreto_de_clase";
let nextId = 1;

app.use(express.json());

// Usuarios en memoria (simulando la BD)
const usuarios = [
  /*
  { id: 1, email: "admin@tienda.com", password: "1234", rol: "admin" },
  { id: 2, email: "juan@test.com", password: "1234", rol: "usuario" }, 
  */
];

//REGLAS DE VALIDACION
const reglasRegistro = [
  body("nombre").trim().notEmpty().withMessage("El nombre es requerido"),

  body("email")
    .trim() // sanitizar: quitar espacios
    .normalizeEmail() // sanitizar: convierte a minúsculas
    .notEmpty()
    .withMessage("El email es requerido.")
    .isEmail()
    .withMessage("El email no tiene formato válido."),

  body("password")
    .notEmpty()
    .withMessage("La contraseña es requerida.")
    .isLength({ min: 8 })
    .withMessage("La contraseña debe tener al menos 8 caracteres."),
];

app.post("/register", reglasRegistro, async (req, res) => {
  const { nombre, email, password } = req.body;

  const existe = usuarios.find((u) => u.email === email);
  if (existe) {
    return res.status(409).json("error: El email ya esta registrado ");
  }

  const passwordHash = await bcrypt.hash(password, 10);

  //genero nuevo usuario

  const nuevoUsuario = {
    id: nextId++,
    nombre: nombre,
    //FIXME: Guardar el email
    email: email,
    password: passwordHash,
  };

  usuarios.push(nuevoUsuario);
  console.log(`Usuario registrado: ${email} | hash:${passwordHash}`);

  res.status(201).json({
    mensaje: "Usuario creado exitosamente",
    usuario: { nombre, email },
  });
});

app.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res
      .status(400)
      .json({ error: "Email y contraseña son requeridos." });
  }

  const usuario = usuarios.find((u) => u.email === email);
  if (!usuario) {
    //FIXME: Falta return
    return res.status(401).json({ error: "Credenciales incorrectas" });
  }

  const passwordValida = await bcrypt.compare(password, usuario.password);
  if (!passwordValida) {
    return res.status(401).json({ error: "Credenciales incorrectas." });
  }

  const token = jwt.sign(
    {
      id: usuario.id,
      email: usuario.email,
    },
    SECRET,
    { expiresIn: "2h" },
  );

  res.json({
    mensaje: "Login exitoso!!",
    token,
  });
});

function verificarToken(req, res, next) {
  const authHeader = req.headers["authorization"];

  if (!authHeader) {
    return res.status(401).json({ error: "Token no proporcionado." });
  }

  const token = authHeader.split(" ")[1];

  try {
    const payload = jwt.verify(token, SECRET);
    req.user = payload;
    next();
  } catch (error) {
    return res.status(403).json({ error: "Token inválido o expirado." });
  }
}

app.get("/perfil", verificarToken, async (req, res) => {
  const usuario = usuarios.find((u) => u.id === req.user.id);

  if (!usuario) {
    return res.status(404).json({ error: "Usuario no encontrado." });
  }

  res.json({
    id: usuario.id,
    nombre: usuario.nombre,
    email: usuario.email,
  });
});

app.listen(PORT, () => {
  console.log("=".repeat(55));
  console.log(" EJEMPLO 05 — Práctica completa: registro seguro");
  console.log("=".repeat(55));
  console.log(`\n🚀 Servidor en http://localhost:${PORT}`);
  console.log("\nFLUJO COMPLETO EN THUNDER CLIENT:");
  console.log("\n1. POST /register");
  console.log(
    '   { "nombre": "Juan", "email": "juan@test.com", "password": "segura123" }',
  );
  console.log("\n2. POST /login");
  console.log('   { "email": "juan@test.com", "password": "segura123" }');
  console.log("   → guardar el token de la respuesta");
  console.log("\n3. GET /perfil");
  console.log("   Header → Authorization: Bearer <token>");
  console.log("\n--- CASOS DE ERROR ---");
  console.log("POST /registro con password corta → 422");
  console.log("POST /registro con email inválido → 422");
  console.log("POST /login con password incorrecta → 401");
  console.log("GET /perfil sin token → 401");
});
