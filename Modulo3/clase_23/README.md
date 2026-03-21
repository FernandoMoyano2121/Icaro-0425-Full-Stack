# ⚡ ¿Qué es Vite y para qué se usa en React?

## 🧩 ¿Qué es Vite?

Vite es una herramienta moderna de desarrollo frontend que funciona como:

- Servidor de desarrollo (dev server)
- Empaquetador (bundler) para producción

Fue creada para ser **rápida y ligera**, aprovechando módulos nativos del navegador (ES Modules).

---

## 🚀 ¿Para qué se usa en React?

En el contexto de React, Vite se utiliza para:

### 1. Crear proyectos rápidamente

Permite inicializar una app React en segundos:

```bash
npm create vite@latest
```

### 2. Desarrollo ultrarrápido

- Arranque instantáneo del servidor
- Hot Module Replacement (HMR) muy veloz
- Cambios visibles casi al instante sin recargar toda la app

### 3. Build optimizado para producción

- Usa herramientas como Rollup internamente
- Genera archivos optimizados y livianos
- Mejora el rendimiento de la app final

### 4. Mejor experiencia de desarrollo (DX)

- Configuración mínima (casi “zero config”)
- Soporte nativo para TypeScript
- Integración sencilla con librerías de React

## ⚙️ ¿Cómo funciona con React?

- Vite no reemplaza React, sino que lo acompaña:
  - React → se encarga de la UI
  - Vite → se encarga del entorno de desarrollo y build

## 👉🏻 Que es un build

Un proceso de build es, básicamente, la etapa donde tu código fuente (el que escribís como desarrollador) se transforma en una versión optimizada, compatible y lista para producción.

En desarrollo trabajás con código cómodo de leer y modificar; en el build eso se convierte en algo que el navegador pueda ejecutar rápido y eficientemente.

### 🔄 1. Transpilación (JSX → JavaScript)

React usa JSX:

```jsx
const App = () => <h1>Hola</h1>;
```

Eso no lo entiende el navegador directamente, así que se transforma en JavaScript puro:

```js
const App = React.createElement("h1", null, "Hola");
```

### 📦 2. Bundling (empaquetado)

Tu app tiene múltiples archivos:

- Componentes
- Estilos
- Utilidades

Vite los agrupa en archivos optimizados finales:

```txt
/assets/index-abc123.js
/assets/index-xyz456.css
```

### ✂️ 3. Minificación

Se elimina todo lo innecesario:

- Espacios
- Comentarios
- Nombres largos de variables

### 🌳 4. Tree Shaking

Elimina código que no se utiliza:

```jsx
import { suma, resta } from "./math";
```

Si solo usás suma, resta no se incluye en el build final.

### ⚡ 5. Code Splitting

Divide la app en partes para cargar solo lo necesario.

Ejemplo:

- Home → carga inicial
- Dashboard → carga diferida (lazy loading)

Mejora el tiempo de carga inicial.

### 🎯 6. Optimización de assets

- Imágenes comprimidas
- CSS optimizado
- Fuentes optimizadas

🔐 7. Hashing de archivos

Los archivos finales tienen nombres únicos:

```txt
index-abc123.js
```

Esto evita problemas de caché en el navegador.
