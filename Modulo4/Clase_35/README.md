## 1️⃣ require → CommonJS (el modelo “clásico” de Node)

---

require pertenece al sistema de módulos CommonJS, que fue el estándar de Node.js durante muchos años.

### Características clave

- Carga síncrona
- Se ejecuta en tiempo de ejecución
- Permite imports condicionales
- Muy flexible y tolerante

```javascript
const fs = require("fs");
const miModulo = require("./miModulo");
```

Incluso podés hacer cosas como:

```javascript
if (condicion) {
  const modulo = require("./algo");
}
```

👉 Esto no es posible con import.

### Ventajas

✔ Compatibilidad total con proyectos antiguos
✔ Simple y directo
✔ Ideal para scripts chicos o legacy
✔ No requiere configuración especial

### Desventajas

❌ No es estándar del lenguaje (es propio de Node)
❌ Menor optimización estática
❌ No funciona bien con herramientas modernas (tree shaking, bundlers, etc.)

## 2️⃣ import → ES Modules (estándar moderno de JavaScript)

---

import pertenece a ES Modules (ESM), el estándar oficial de JavaScript, usado tanto en navegadores como en Node.js moderno.

```javascript
import fs from "fs";
import { miFuncion } from "./miModulo.js";
```

## Requisitos en Node.js

Tenés que:

- Usar "type": "module" en package.json, o
- Usar extensión .mjs

```json
{
  "type": "module"
}
```

## Características clave

- Carga asíncrona
- Se analiza en tiempo de compilación
- Imports siempre estáticos
- Sintaxis estandarizada

## Ventajas

✔ Estándar oficial de JavaScript
✔ Mejor optimización (tree shaking)
✔ Compatible con frontend y backend
✔ Más predecible y mantenible
✔ Mejor integración con tooling moderno

## Desventajas

❌ Menos flexible (no condicional)
❌ Requiere configuración inicial
❌ Puede generar fricción con librerías viejas

## 3️⃣ Diferencias clave resumidas

---

| Aspecto               | `require` (CommonJS) | `import` (ESM)   |
| --------------------- | -------------------- | ---------------- |
| Estándar              | No                   | Sí               |
| Momento de carga      | Runtime              | Compile time     |
| Tipo de carga         | Síncrona             | Asíncrona        |
| Imports condicionales | Sí                   | No               |
| Tree shaking          | No                   | Sí               |
| Compatibilidad legacy | Excelente            | Media            |
| Uso recomendado hoy   | Legacy / scripts     | Proyectos nuevos |
