/**
 * =============================================================================
 * CLASE 41: COOKIES Y SESIONES EN EXPRESS
 * =============================================================================
 *
 * Este archivo demuestra el uso de:
 * 1. Cookies manuales con res.cookie() (login simple)
 * 2. Sesiones con express-session (login más seguro)
 *
 * INSTALACIÓN:
 *   npm install express cookie-parser cors express-session
 *
 * EJECUCIÓN:
 *   node src/app.js
 *
 * =============================================================================
 * ⚠️ PROBLEMA DE COOKIES CROSS-ORIGIN EN DESARROLLO
 * =============================================================================
 *
 * Cuando el frontend (Live Server) y backend (Express) están en diferentes
 * orígenes, las cookies requieren configuración especial:
 *
 *   Frontend: http://127.0.0.1:5500  (Live Server)
 *   Backend:  http://localhost:3000  (Express)
 *
 * Para que las cookies funcionen cross-origin necesitas:
 *
 *   sameSite: 'none'  →  Permite cookies entre diferentes orígenes
 *   secure: true      →  OBLIGATORIO cuando sameSite es 'none'
 *
 * PERO: secure:true requiere HTTPS. En HTTP el navegador RECHAZA la cookie
 * silenciosamente (no da error, simplemente no la guarda).
 *
 * =============================================================================
 * SOLUCIÓN PARA DESARROLLO LOCAL
 * =============================================================================
 *
 * Opción A: MISMO ORIGEN (recomendada para desarrollo)
 *   - Servir el HTML desde Express (express.static)
 *   - Acceder desde http://localhost:3000/index.html
 *   - Usar sameSite: 'lax' + secure: false
 *   - ✅ Funciona en HTTP
 *
 * Opción B: CROSS-ORIGIN (requiere HTTPS)
 *   - Usar sameSite: 'none' + secure: true
 *   - Configurar HTTPS en desarrollo (más complejo)
 *   - ❌ No funciona en HTTP
 *
 * EN ESTE ARCHIVO:
 *   - Ejemplo 1 (Cookies Manuales): sameSite:'none' + secure:true (cross-origin)
 *   - Ejemplo 2 (Express-Session): sameSite:'lax' + secure:false (mismo origen)
 *
 * Por eso el Ejemplo 2 debe probarse desde http://localhost:3000/index.html
 *
 * =============================================================================
 */

import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import session from "express-session";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

// Servir archivos estáticos (HTML) desde Express
// Esto permite probar el Ejemplo 2 desde el mismo origen
app.use(express.static(path.join(__dirname, "..")));

// Parsear cookies del header → req.cookies
app.use(cookieParser());

// Parsear JSON del body → req.body
app.use(express.json());

/**
 * =============================================================================
 * CONFIGURACIÓN DE CORS
 * =============================================================================
 *
 * OPCIONES:
 * ┌─────────────────┬─────────────────────────────────────────────────────────┐
 * │ origin          │ Orígenes permitidos (string, array, o función)         │
 * │ credentials     │ true = permite enviar cookies en peticiones            │
 * └─────────────────┴─────────────────────────────────────────────────────────┘
 *
 * ⚠️ Si credentials:true, origin NO puede ser "*" (debe ser específico)
 */
app.use(
  cors({
    origin: "http://127.0.0.1:5501",
    credentials: true,
  }),
);

/* =============================================================================
   EJEMPLO 1: LOGIN CON COOKIES MANUALES
   =============================================================================
   
   Guarda el usuario DIRECTAMENTE en la cookie del navegador.
   
   ⚠️ CONFIGURACIÓN CROSS-ORIGIN (Live Server → Express):
      sameSite: 'none'  +  secure: true
   
   IMPORTANTE: secure:true requiere HTTPS. En localhost funciona en algunos
   navegadores, pero puede fallar. Si no funciona, probar desde el mismo origen.
   
   ┌──────────────────────────────────────────────────────────────────────────┐
   │  OPCIONES DE res.cookie(nombre, valor, opciones)                        │
   ├─────────────────┬────────────────────────────────────────────────────────┤
   │ maxAge          │ Duración en milisegundos (60000 = 1 minuto)            │
   │ httpOnly        │ true = no accesible desde JavaScript del cliente      │
   │ secure          │ true = solo enviar por HTTPS                          │
   │ sameSite        │ 'strict' | 'lax' | 'none' (control de cross-origin)   │
   │ path            │ Ruta donde aplica la cookie (default: "/")            │
   │ domain          │ Dominio de la cookie                                  │
   │ signed          │ true = firmar cookie (requiere cookieParser('secret'))│
   └─────────────────┴────────────────────────────────────────────────────────┘
   
   VALORES DE sameSite:
   ┌─────────────────┬────────────────────────────────────────────────────────┐
   │ 'strict'        │ Solo mismo origen. Máxima seguridad.                   │
   │ 'lax'           │ Mismo origen + navegación top-level (links). Default.  │
   │ 'none'          │ Permite cross-origin. REQUIERE secure:true             │
   └─────────────────┴────────────────────────────────────────────────────────┘
   
   ============================================================================= */

// LOGIN: Crea una cookie con el nombre del usuario
app.post("/cookie/login", (req, res) => {
  const { usuario } = req.body;

  if (!usuario) {
    return res.status(400).json({ error: "El usuario es requerido" });
  }

  // Crear cookie - se guarda EN EL NAVEGADOR del cliente
  res.cookie("usuario", usuario, {
    maxAge: 60000, // 1 minuto
    httpOnly: true, // No accesible desde JS del cliente
    secure: true, // Requerido para sameSite: 'none'
    sameSite: "none", // Permite cross-origin (Live Server → Express)
  });

  res.json({ message: `Cookie creada para: ${usuario}` });
});

// DASHBOARD: Lee la cookie para verificar si hay "sesión"
app.get("/cookie/dashboard", (req, res) => {
  const usuario = req.cookies.usuario;

  if (!usuario) {
    return res
      .status(401)
      .json({ error: "No autorizado - Cookie no encontrada" });
  }

  res.json({ mensaje: `¡Bienvenido ${usuario}! (cookie manual)` });
});

// LOGOUT: Elimina la cookie
app.post("/cookie/logout", (req, res) => {
  res.clearCookie("usuario");
  res.json({ message: "Cookie eliminada" });
});

// VER: Muestra todas las cookies recibidas
app.get("/cookie/ver", (req, res) => {
  console.log("Cookies recibidas:", req.cookies);
  res.json({ cookies: req.cookies });
});

/* =============================================================================
   EJEMPLO 2: LOGIN CON EXPRESS-SESSION
   =============================================================================
   
   Guarda los datos EN EL SERVIDOR. El navegador solo recibe un ID (connect.sid).
   
   =============================================================================
   ⚠️ ¿POR QUÉ DEBE PROBARSE DESDE EL MISMO ORIGEN?
   =============================================================================
   
   Si usáramos sameSite:'none' + secure:true para permitir cross-origin:
   
   1. El navegador EXIGE HTTPS cuando secure:true
   2. En HTTP (localhost sin SSL), el navegador RECHAZA la cookie silenciosamente
   3. No muestra error - simplemente NO GUARDA la cookie connect.sid
   4. El servidor responde "Sesión iniciada" pero la cookie nunca se almacena
   5. En la siguiente petición (dashboard), no hay cookie que enviar
   6. El servidor no encuentra la sesión → "No autorizado"
   
   SOLUCIÓN: Trabajar desde el MISMO ORIGEN
   
   - Servimos el HTML desde Express (express.static)
   - Accedemos desde http://localhost:3000/index.html
   - Usamos sameSite:'lax' + secure:false
   - El navegador acepta la cookie porque es el mismo origen
   
   Para probar este ejemplo, abrir: http://localhost:3000/index.html
   
   ┌──────────────────────────────────────────────────────────────────────────┐
   │  OPCIONES DE express-session({ ... })                                    │
   ├─────────────────────┬────────────────────────────────────────────────────┤
   │ secret              │ ⚠️ REQUERIDO. Clave para firmar la cookie          │
   │ name                │ Nombre de la cookie (default: "connect.sid")       │
   │ resave              │ false = no reguardar si no cambió                  │
   │ saveUninitialized   │ false = no guardar sesiones vacías                 │
   │ cookie              │ Objeto con opciones de la cookie (ver abajo)       │
   │ store               │ Dónde guardar sesiones (default: memoria)          │
   └─────────────────────┴────────────────────────────────────────────────────┘
   
   ┌──────────────────────────────────────────────────────────────────────────┐
   │  OPCIONES DE cookie: { ... }                                            │
   ├─────────────────────┬────────────────────────────────────────────────────┤
   │ maxAge              │ Duración en milisegundos                           │
   │ httpOnly            │ true = no accesible desde JS (recomendado)        │
   │ secure              │ true = solo HTTPS (usar en producción)            │
   │ sameSite            │ 'strict' | 'lax' | 'none'                         │
   └─────────────────────┴────────────────────────────────────────────────────┘
   
   ============================================================================= */

app.use(
  session({
    secret: "miClaveSecreta",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: false, // false porque estamos en HTTP
      sameSite: "lax", // 'lax' funciona en mismo origen
      maxAge: 60000,
    },
  }),
);

// LOGIN: Guarda datos en la sesión del servidor
app.post("/session/login", (req, res) => {
  const { usuario } = req.body;

  if (!usuario) {
    return res.status(400).json({ error: "El usuario es requerido" });
  }

  // Guarda en el SERVIDOR, no en la cookie
  req.session.usuario = usuario;

  res.json({ message: `Sesión iniciada para: ${usuario}` });
});

// DASHBOARD: Verifica si hay sesión activa
app.get("/session/dashboard", (req, res) => {
  if (!req.session.usuario) {
    return res
      .status(401)
      .json({ error: "No autorizado - Sesión no encontrada" });
  }

  res.json({
    mensaje: `¡Bienvenido ${req.session.usuario}! (express-session)`,
  });
});

// LOGOUT: Destruye la sesión
app.post("/session/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      return res.status(500).json({ error: "Error al cerrar sesión" });
    }
    res.clearCookie("connect.sid");
    res.json({ message: "Sesión destruida" });
  });
});

/* =============================================================================
   COMPARACIÓN: COOKIE MANUAL vs EXPRESS-SESSION
   =============================================================================
   
   ┌─────────────────────┬─────────────────────┬─────────────────────────────┐
   │ Aspecto             │ Cookie Manual       │ Express-Session             │
   ├─────────────────────┼─────────────────────┼─────────────────────────────┤
   │ Datos guardados en  │ Navegador (cliente) │ Servidor                    │
   │ Cookie contiene     │ Los datos reales    │ Solo un ID (connect.sid)    │
   │ Seguridad           │ Baja (modificable)  │ Alta (datos en servidor)    │
   │ Uso recomendado     │ Preferencias, tema  │ Autenticación               │
   └─────────────────────┴─────────────────────┴─────────────────────────────┘
   
   ============================================================================= */

// Ruta raíz
app.get("/", (req, res) => {
  res.json({
    mensaje: "API de Cookies y Sesiones - Clase 41",
    instrucciones: {
      ejemplo1_cookies: "Probar desde Live Server (http://127.0.0.1:5500)",
      ejemplo2_session:
        "Probar desde Express (http://localhost:3000/index.html)",
    },
  });
});

app.listen(3000, () => {
  console.log("=".repeat(65));
  console.log("CLASE 41: COOKIES Y SESIONES");
  console.log("=".repeat(65));
  console.log("Servidor: http://localhost:3000");
  console.log("");
  console.log("EJEMPLO 1 - COOKIES MANUALES (probar desde Live Server):");
  console.log("  POST /cookie/login      → Crear cookie");
  console.log("  GET  /cookie/dashboard  → Leer cookie");
  console.log("  POST /cookie/logout     → Eliminar cookie");
  console.log("");
  console.log("EJEMPLO 2 - EXPRESS-SESSION (probar desde localhost:3000):");
  console.log("  POST /session/login     → Iniciar sesión");
  console.log("  GET  /session/dashboard → Verificar sesión");
  console.log("  POST /session/logout    → Cerrar sesión");
  console.log("");
  console.log("⚠️  El Ejemplo 2 requiere acceder desde:");
  console.log("    http://localhost:3000/index.html");
  console.log("=".repeat(65));
});
