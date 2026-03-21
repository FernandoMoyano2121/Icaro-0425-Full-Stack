# Clase 47 — Prácticas de seguridad en el backend

## Descripción

En esta clase aplicamos las cuatro prácticas de seguridad fundamentales para un backend:
validación de datos, sanitización y prevención de inyección SQL, hashing de contraseñas con bcrypt,
y protección de rutas con JWT.

---

## Estructura del proyecto

```
Clase_47/
├── .env.example
├── package.json
├── README.md
└── ejemplos/
    ├── 01-validacion/
    │   └── index.js          ← express-validator: isEmail, isLength, notEmpty, custom
    ├── 02-sanitizacion-sql/
    │   └── index.js          ← trim(), escape(), query vulnerable vs. preparada
    ├── 03-hashing-bcrypt/
    │   └── index.js          ← bcrypt.hash(), bcrypt.compare(), salt rounds
    ├── 04-rutas-protegidas/
        └── index.js          ← middleware verificarToken, jwt.verify(), req.user

```

---

## Instalación

```bash
npm install
cp .env.example .env
```

---

## Referencia rápida

### express-validator

| Método                  | Qué valida                                                 |
| ----------------------- | ---------------------------------------------------------- |
| `body('campo')`         | Campo del req.body                                         |
| `query('campo')`        | Query param (?campo=valor)                                 |
| `param('campo')`        | Parámetro de ruta (/:campo)                                |
| `.notEmpty()`           | El campo no está vacío                                     |
| `.isEmail()`            | Formato de email válido (RFC)                              |
| `.isLength({min,max})`  | Longitud mínima y/o máxima                                 |
| `.isInt()`              | Es un número entero                                        |
| `.custom(fn)`           | Validación personalizada con tu propia lógica              |
| `.trim()`               | Elimina espacios al inicio y al final                      |
| `.escape()`             | Convierte `<`, `>`, `&` en entidades HTML seguras          |
| `.withMessage(msg)`     | Mensaje de error personalizado para la validación anterior |
| `validationResult(req)` | Recoge todos los errores acumulados                        |

### bcryptjs

```js
// Al registrar — hashear antes de guardar
const hash = await bcrypt.hash(passwordPlano, 10); // 10 = salt rounds

// Al hacer login — comparar sin desencriptar
const coincide = await bcrypt.compare(passwordIngresado, hashDeLaBD);
```

### JWT — middleware de protección

```js
// Cabecera que envía el cliente
Authorization: Bearer <token>

// Verificar en el middleware
const payload = jwt.verify(token, SECRET);
req.user = payload;  // disponible en la ruta
```

---

## Orden de demostración en clase

### Paso 1 — Validación

```bash
node ejemplos/01-validacion/index.js
```

Probar con Thunder Client en `POST http://localhost:3001/registro` con datos válidos e inválidos.

### Paso 2 — Sanitización + SQL injection

```bash
node ejemplos/02-sanitizacion-sql/index.js
```

Primero mostrar `POST /buscar-vulnerable` con `' OR '1'='1` para ver el problema.
Luego `POST /buscar-seguro` para ver la diferencia.

### Paso 3 — Hashing

```bash
node ejemplos/03-hashing-bcrypt/index.js
```

No requiere servidor — ejecutar y ver la salida en consola.

### Paso 4 — Rutas protegidas

```bash
node ejemplos/04-rutas-protegidas/index.js
```

Flujo: `POST /login` → copiar token → `GET /perfil` con token → `GET /perfil` sin token.

### Paso 5 — Práctica completa

```bash
node ejemplos/05-practica-registro/index.js
```

Flujo completo: registrar → login → acceder al perfil protegido.

---

## Conceptos clave

| Concepto         | Descripción                                                                            |
| ---------------- | -------------------------------------------------------------------------------------- |
| Validación       | Verificar que los datos cumplen el formato y restricciones esperadas                   |
| Sanitización     | Limpiar caracteres peligrosos antes de procesar o guardar los datos                    |
| Inyección SQL    | Ataque que manipula una query insertando sintaxis SQL en un campo                      |
| Query preparada  | Usa `?` como placeholder — el motor de BD trata el valor como dato puro                |
| Hashing          | Transformación irreversible de un texto — no se puede revertir                         |
| Salt             | Valor aleatorio que bcrypt agrega — hace que dos hashes del mismo texto sean distintos |
| Salt rounds      | Número de iteraciones del algoritmo — 10 es el estándar recomendado                    |
| bcrypt.hash()    | Genera el hash de un texto                                                             |
| bcrypt.compare() | Compara texto plano con hash — nunca desencripta                                       |
| JWT              | Token firmado que contiene datos del usuario — se verifica con la clave secreta        |
| Bearer token     | Formato estándar: `Authorization: Bearer <token>`                                      |
| req.user         | Payload del JWT disponible en la ruta después de verificar el token                    |
