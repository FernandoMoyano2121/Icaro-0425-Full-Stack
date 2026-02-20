// =============================================================
// CLASE 42 - EJEMPLO 1: Generar un JWT al hacer login
// =============================================================
//
// OBJETIVO: Entender qué es un JWT y cómo se genera al hacer login.
//
// PASOS PARA MOSTRAR EN CLASE:
// -------------------------------------------------------------
// 1. Abrir terminal en esta carpeta y ejecutar:
//    npm install
//
// 2. Iniciar el servidor:
//    node app.js
//
// 3. Abrir Thunder Client y probar:
//
//    🟢 POST http://localhost:3000/login
//    Body > JSON:
//    {
//      "usuario": "fernando",
//      "password": "1234"
//    }
//
//    ✅ Respuesta esperada: un objeto con el token JWT
//    {
//      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
//    }
//
//    ❌ Si las credenciales son incorrectas (ej. password: "mal"):
//    { "mensaje": "Credenciales inválidas" }
//
// 4. Copiar el token y pegarlo en https://jwt.io para ver su estructura:
//    - Header: algoritmo HS256
//    - Payload: id, usuario, iat, exp
//    - Signature: no verificable sin la clave secreta
//
// =============================================================

import express from 'express'
import jwt from 'jsonwebtoken'

const app = express()

// Middleware para leer JSON en el body de las requests
app.use(express.json())

// ---------------------------------------------------------------
// CLAVE SECRETA: se usa para firmar el token.
// En producción esto va en un archivo .env, nunca hardcodeado.
// ---------------------------------------------------------------
const CLAVE_SECRETA = 'mi_clave_super_secreta_2024'

// ---------------------------------------------------------------
// BASE DE DATOS SIMULADA: en producción vendría de una BD real.
// ---------------------------------------------------------------
const usuarios = [
  { id: 1, usuario: 'fernando', password: '1234' },
  { id: 2, usuario: 'ana',      password: 'abcd' },
]

// ---------------------------------------------------------------
// RUTA: GET /
// Solo para verificar que el servidor funciona.
// ---------------------------------------------------------------
app.get('/', (req, res) => {
  res.json({ mensaje: 'Servidor JWT funcionando ✅' })
})

// ---------------------------------------------------------------
// RUTA: POST /login
// Recibe usuario y password, valida, y si es correcto genera un JWT.
// ---------------------------------------------------------------
app.post('/login', (req, res) => {

  // 1. Extraemos los datos del body
  const { usuario, password } = req.body

  // 2. Buscamos el usuario en nuestra "base de datos"
  const usuarioEncontrado = usuarios.find(
    u => u.usuario === usuario && u.password === password
  )

  // 3. Si no existe, respondemos con error 401
  if (!usuarioEncontrado) {
    return res.status(401).json({ mensaje: 'Credenciales inválidas' })
  }

  // 4. Si existe, creamos el PAYLOAD (datos que queremos incluir en el token)
  //    IMPORTANTE: nunca incluir passwords ni datos muy sensibles aquí.
  //    El payload es visible (está en base64), solo la firma es secreta.
  const payload = {
    id: usuarioEncontrado.id,
    usuario: usuarioEncontrado.usuario
  }

  // 5. Generamos el token con jwt.sign(payload, claveSecreta, opciones)
  //    - payload: los datos a incluir
  //    - CLAVE_SECRETA: con qué se firma (solo el servidor la conoce)
  //    - expiresIn: cuánto tiempo dura el token
  const token = jwt.sign(payload, CLAVE_SECRETA, { expiresIn: '1h' })

  // 6. Respondemos con el token
  res.json({ token })
})

// ---------------------------------------------------------------
// INICIO DEL SERVIDOR
// ---------------------------------------------------------------
app.listen(3000, () => {
  console.log('Servidor corriendo en http://localhost:3000')
  console.log('Probá POST /login con Thunder Client')
})
