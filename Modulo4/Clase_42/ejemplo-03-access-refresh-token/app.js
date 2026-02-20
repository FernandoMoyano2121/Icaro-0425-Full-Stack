// =============================================================
// CLASE 42 - EJEMPLO 3: Access Token + Refresh Token
// =============================================================
//
// OBJETIVO: Implementar el sistema de doble token:
//   - Access Token (corta duración): se usa para acceder a rutas protegidas
//   - Refresh Token (larga duración): se usa para renovar el Access Token
//
// ¿POR QUÉ DOS TOKENS?
// Si el Access Token es robado, expira en poco tiempo (en este ejemplo 30s).
// Si el Refresh Token es robado, se puede invalidar en el servidor.
//
// PASOS PARA MOSTRAR EN CLASE:
// -------------------------------------------------------------
// 1. npm install
// 2. node app.js
//
// 3. FLUJO COMPLETO EN THUNDER CLIENT:
//
//    ── PASO 1: Login → obtenemos los 2 tokens ─────────────────
//    🟢 POST http://localhost:3000/login
//    Body > JSON:
//    {
//      "usuario": "fernando",
//      "password": "1234"
//    }
//    → Respuesta:
//    {
//      "accessToken": "eyJ...  (corto)",
//      "refreshToken": "eyJ... (largo)"
//    }
//    → Guardar AMBOS tokens para los siguientes pasos
//
//    ── PASO 2: Acceder a ruta protegida con Access Token ──────
//    🟢 GET http://localhost:3000/perfil
//    Headers:
//      Authorization: Bearer <accessToken>
//    → Respuesta: datos del perfil ✅
//
//    ── PASO 3: Simular que el Access Token expiró ─────────────
//    (Esperar 30 segundos, o modificar expiresIn a '1s' para la demo)
//    🔴 GET http://localhost:3000/perfil
//    Headers:
//      Authorization: Bearer <accessToken>
//    → Respuesta: { "mensaje": "Token inválido o expirado" } (403)
//
//    ── PASO 4: Usar el Refresh Token para obtener nuevo Access Token
//    🟢 POST http://localhost:3000/refresh
//    Body > JSON:
//    {
//      "refreshToken": "<el refreshToken del paso 1>"
//    }
//    → Respuesta:
//    {
//      "accessToken": "eyJ... (nuevo)"
//    }
//
//    ── PASO 5: Usar el NUEVO Access Token ─────────────────────
//    🟢 GET http://localhost:3000/perfil
//    Headers:
//      Authorization: Bearer <nuevo accessToken>
//    → Respuesta: datos del perfil ✅ (funciona de nuevo!)
//
//    ── PASO 6: Logout ─────────────────────────────────────────
//    🟢 POST http://localhost:3000/logout
//    Body > JSON:
//    {
//      "refreshToken": "<el refreshToken>"
//    }
//    → Luego intentar /refresh con ese mismo token:
//    🔴 POST http://localhost:3000/refresh → Error: token inválido
//
// =============================================================

import express from "express";
import jwt from "jsonwebtoken";

const app = express();
app.use(express.json());

// ---------------------------------------------------------------
// CLAVES SECRETAS: una para cada tipo de token.
// En producción, van en variables de entorno (.env).
// ---------------------------------------------------------------
const ACCESS_SECRET = "clave_para_access_token";
const REFRESH_SECRET = "clave_para_refresh_token";

// ---------------------------------------------------------------
// ALMACÉN DE REFRESH TOKENS válidos (en memoria).
// En producción esto estaría en una base de datos.
// Esto nos permite INVALIDAR un refresh token al hacer logout.
// ---------------------------------------------------------------
const refreshTokensValidos = new Set();

// ---------------------------------------------------------------
// USUARIOS SIMULADOS
// ---------------------------------------------------------------
const usuarios = [
  { id: 1, usuario: "fernando", password: "1234" },
  { id: 2, usuario: "ana", password: "abcd" },
];

// ===============================================================
// MIDDLEWARE: verificarAccessToken
// Verifica el Access Token en el header Authorization.
// ===============================================================
const verificarAccessToken = (req, res, next) => {
  const authHeader = req.headers["authorization"];

  if (!authHeader) {
    return res.status(401).json({ mensaje: "Token no proporcionado" });
  }

  const token = authHeader.split(" ")[1];

  try {
    // Verificamos con la clave del ACCESS TOKEN
    const decoded = jwt.verify(token, ACCESS_SECRET);
    req.usuarioLogueado = decoded;
    next();
  } catch (error) {
    return res.status(403).json({ mensaje: "Token inválido o expirado" });
  }
};

// ---------------------------------------------------------------
// RUTA: POST /login
// Genera AMBOS tokens: el de acceso (corto) y el de refresh (largo).
// ---------------------------------------------------------------
app.post("/login", (req, res) => {
  const { usuario, password } = req.body;

  const usuarioEncontrado = usuarios.find(
    (u) => u.usuario === usuario && u.password === password,
  );

  if (!usuarioEncontrado) {
    return res.status(401).json({ mensaje: "Credenciales inválidas" });
  }

  const payload = {
    id: usuarioEncontrado.id,
    usuario: usuarioEncontrado.usuario,
  };

  // Access Token: dura poco (30 segundos para la demo, en prod: '15m')
  const accessToken = jwt.sign(payload, ACCESS_SECRET, { expiresIn: "60s" });

  // Refresh Token: dura mucho (7 días en prod)
  const refreshToken = jwt.sign(payload, REFRESH_SECRET, { expiresIn: "7d" });

  // Guardamos el refresh token para poder validarlo luego
  refreshTokensValidos.add(refreshToken);

  res.json({
    accessToken,
    refreshToken,
    mensaje: "Login exitoso. El accessToken dura 30 segundos (demo).",
  });
});

// ---------------------------------------------------------------
// RUTA PROTEGIDA: GET /perfil
// Solo accesible con un Access Token válido.
// ---------------------------------------------------------------
app.get("/perfil", verificarAccessToken, (req, res) => {
  res.json({
    mensaje: "¡Perfil accedido correctamente! 🔓",
    usuario: req.usuarioLogueado,
  });
});

// ---------------------------------------------------------------
// RUTA: POST /refresh
// Recibe el Refresh Token y devuelve un nuevo Access Token.
// NO requiere el middleware de access token (porque justamente
// lo que hacemos acá es renovarlo cuando ya expiró).
// ---------------------------------------------------------------
app.post("/refresh", (req, res) => {
  const { refreshToken } = req.body;

  // 1. Verificamos que nos mandaron un refresh token
  if (!refreshToken) {
    return res.status(401).json({ mensaje: "Refresh token no proporcionado" });
  }

  // 2. Verificamos que el refresh token esté en nuestra lista de válidos
  //    (si el usuario hizo logout, ya no estará en la lista)
  if (!refreshTokensValidos.has(refreshToken)) {
    return res
      .status(403)
      .json({ mensaje: "Refresh token inválido o ya fue invalidado" });
  }

  // 3. Verificamos la firma del refresh token
  try {
    const decoded = jwt.verify(refreshToken, REFRESH_SECRET);

    // 4. Generamos un nuevo Access Token con los mismos datos
    const nuevoPayload = {
      id: decoded.id,
      usuario: decoded.usuario,
    };

    const nuevoAccessToken = jwt.sign(nuevoPayload, ACCESS_SECRET, {
      expiresIn: "30s",
    });

    res.json({
      accessToken: nuevoAccessToken,
      mensaje: "Nuevo access token generado exitosamente ✅",
    });
  } catch (error) {
    // El refresh token también puede haber expirado
    return res
      .status(403)
      .json({ mensaje: "Refresh token expirado o inválido" });
  }
});

// ---------------------------------------------------------------
// RUTA: POST /logout
// Invalida el Refresh Token eliminándolo de nuestra lista.
// ---------------------------------------------------------------
app.post("/logout", (req, res) => {
  const { refreshToken } = req.body;

  // Eliminamos el token de la lista → ya no podrá usarse para renovar
  refreshTokensValidos.delete(refreshToken);

  res.json({
    mensaje: "Sesión cerrada correctamente. Refresh token invalidado. 🔒",
  });
});

// ---------------------------------------------------------------
// INICIO DEL SERVIDOR
// ---------------------------------------------------------------
app.listen(3000, () => {
  console.log("Servidor corriendo en http://localhost:3000");
  console.log("");
  console.log("Rutas disponibles:");
  console.log("  POST /login    → pública: genera accessToken + refreshToken");
  console.log("  GET  /perfil   → protegida: requiere accessToken");
  console.log(
    "  POST /refresh  → renueva el accessToken usando el refreshToken",
  );
  console.log("  POST /logout   → invalida el refreshToken");
});
