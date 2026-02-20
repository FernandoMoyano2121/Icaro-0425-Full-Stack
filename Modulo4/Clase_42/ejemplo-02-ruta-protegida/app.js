// =============================================================
// CLASE 42 - EJEMPLO 2: Middleware JWT + Ruta Protegida
// =============================================================
//
// OBJETIVO: Crear un middleware que verifique el token JWT
//           y proteger rutas que solo puedan acceder usuarios autenticados.
//
// PASOS PARA MOSTRAR EN CLASE:
// -------------------------------------------------------------
// 1. Abrir terminal en esta carpeta y ejecutar:
//    npm install
//
// 2. Iniciar el servidor:
//    node app.js
//
// 3. PASO A PASO EN THUNDER CLIENT:
//
//    ── PASO 1: Hacer login para obtener el token ──────────────
//    🟢 POST http://localhost:3000/login
//    Body > JSON:
//    {
//      "usuario": "fernando",
//      "password": "1234"
//    }
//    → Copiá el token de la respuesta
//
//    ── PASO 2: Acceder a ruta protegida SIN token ─────────────
//    🔴 GET http://localhost:3000/datos-privados
//    (sin ningún header)
//    → Respuesta: { "mensaje": "Token no proporcionado" } (401)
//
//    ── PASO 3: Acceder a ruta protegida CON token ─────────────
//    🟢 GET http://localhost:3000/datos-privados
//    Headers:
//      Authorization: Bearer <pegá acá el token copiado>
//    → Respuesta: datos privados + info del usuario decodificada
//
//    ── PASO 4: Probar con un token inválido ───────────────────
//    🔴 GET http://localhost:3000/datos-privados
//    Headers:
//      Authorization: Bearer tokeninvalido123
//    → Respuesta: { "mensaje": "Token inválido" } (403)
//
// =============================================================

import express from 'express'
import jwt from 'jsonwebtoken'

const app = express()
app.use(express.json())

const CLAVE_SECRETA = 'mi_clave_super_secreta_2024'

const usuarios = [
  { id: 1, usuario: 'fernando', password: '1234' },
  { id: 2, usuario: 'ana',      password: 'abcd' },
]

// ===============================================================
// MIDDLEWARE: verificarToken
// ---------------------------------------------------------------
// Se ejecuta ANTES del handler de cada ruta protegida.
// Su función es:
//   1. Leer el header Authorization
//   2. Extraer el token (viene como "Bearer <token>")
//   3. Verificarlo con jwt.verify()
//   4. Si es válido: guarda los datos en req.usuarioLogueado y llama a next()
//   5. Si no es válido: responde con error y corta la cadena
// ===============================================================
const verificarToken = (req, res, next) => {

  // 1. Leer el header Authorization
  const authHeader = req.headers['authorization']

  // 2. Si no hay header, respondemos 401 (no autenticado)
  if (!authHeader) {
    return res.status(401).json({ mensaje: 'Token no proporcionado' })
  }

  // 3. El header viene así: "Bearer eyJhbGci..."
  //    Separamos por espacio y tomamos la segunda parte (índice 1)
  const token = authHeader.split(' ')[1]

  if (!token) {
    return res.status(401).json({ mensaje: 'Formato de token inválido. Usar: Bearer <token>' })
  }

  // 4. Verificamos el token con jwt.verify()
  //    - Si es válido: decoded contiene el payload original
  //    - Si es inválido o expiró: lanza un error
  try {
    const decoded = jwt.verify(token, CLAVE_SECRETA)

    // 5. Guardamos los datos decodificados en req para usarlos en la ruta
    req.usuarioLogueado = decoded

    // 6. Llamamos a next() para pasar al handler de la ruta
    next()

  } catch (error) {
    // El token fue alterado o expiró
    return res.status(403).json({ mensaje: 'Token inválido o expirado' })
  }
}

// ---------------------------------------------------------------
// RUTA PÚBLICA: POST /login
// No requiere token. Genera uno al autenticarse correctamente.
// ---------------------------------------------------------------
app.post('/login', (req, res) => {
  const { usuario, password } = req.body

  const usuarioEncontrado = usuarios.find(
    u => u.usuario === usuario && u.password === password
  )

  if (!usuarioEncontrado) {
    return res.status(401).json({ mensaje: 'Credenciales inválidas' })
  }

  const payload = {
    id: usuarioEncontrado.id,
    usuario: usuarioEncontrado.usuario
  }

  const token = jwt.sign(payload, CLAVE_SECRETA, { expiresIn: '1h' })

  res.json({ token })
})

// ---------------------------------------------------------------
// RUTA PROTEGIDA: GET /datos-privados
// Solo accesible si el token es válido.
// El middleware "verificarToken" se ejecuta primero.
// ---------------------------------------------------------------
app.get('/datos-privados', verificarToken, (req, res) => {
  // Si llegamos aquí, el token fue válido.
  // req.usuarioLogueado tiene los datos del payload decodificado.

  res.json({
    mensaje: '¡Acceso concedido! 🔓',
    datosPrivados: {
      secreto: 'Este es un dato que solo los usuarios autenticados pueden ver',
      saldo: 99999
    },
    // Mostramos quién está accediendo (viene del token decodificado)
    usuarioQueAccede: req.usuarioLogueado
  })
})

// ---------------------------------------------------------------
// RUTA PÚBLICA: GET /
// ---------------------------------------------------------------
app.get('/', (req, res) => {
  res.json({ mensaje: 'Servidor con rutas protegidas ✅' })
})

app.listen(3000, () => {
  console.log('Servidor corriendo en http://localhost:3000')
  console.log('')
  console.log('Rutas disponibles:')
  console.log('  POST /login         → pública (genera el token)')
  console.log('  GET  /datos-privados → protegida (requiere token)')
})
