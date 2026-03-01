// =============================================================================
// CLASE 44 - PASO 5: Transacciones con mysql2
// EJECUCIÓN: node src/examples/04-transacciones.js
// =============================================================================
//
// Una transacción es un grupo de operaciones SQL que se ejecutan como una
// unidad atómica: o se completan TODAS, o no se aplica NINGUNA.
//
// El ejemplo de esta clase: crear un producto Y asignarle una categoría.
// Ambas operaciones deben ocurrir juntas. Si la asignación falla (por ejemplo,
// porque la categoría no existe), el producto tampoco debe quedar guardado.
//
// Sin transacción → el producto quedaría en la BD sin categoría (dato inconsistente).
// Con transacción  → si algo falla, todo vuelve al estado anterior (rollback).
//
// =============================================================================
// CONCEPTOS CLAVE
// =============================================================================
//
// BEGIN / START TRANSACTION
//   Le indica a MySQL "empezá a registrar los cambios, pero no los apliques todavía".
//   Desde este momento los cambios son visibles solo dentro de esta conexión.
//
// COMMIT
//   "Todo salió bien, aplicá los cambios definitivamente."
//   Después del COMMIT los cambios son visibles para todas las conexiones.
//
// ROLLBACK
//   "Algo salió mal, descartá todos los cambios desde el BEGIN."
//   La base de datos vuelve exactamente al estado previo a la transacción.
//
// =============================================================================
// IMPORTANTE: Pool vs Conexión en transacciones
// =============================================================================
//
// Cuando usamos pool.execute() normalmente, cada llamada puede usar una
// conexión diferente del pool. Eso es un problema en transacciones, porque
// BEGIN en una conexión y COMMIT en otra no funcionan juntos.
//
// Solución: pedir una conexión dedicada del pool con pool.getConnection(),
// hacer todas las operaciones sobre ESA conexión, y liberarla al final.
//
//   const conexion = await pool.getConnection();
//   // ... todas las queries sobre "conexion" ...
//   conexion.release(); // devuelve la conexión al pool
//
// =============================================================================

import pool from "../../db/conexion.js";

// =============================================================================
// Transacción: crear producto + asignar categoría
// =============================================================================
// Escenario: al agregar un producto al catálogo, queremos asignarle su categoría
// de inmediato. Si la categoría no existe, el producto no debe quedar guardado.
// =============================================================================
async function crearProductoConCategoria(producto, categoriaId) {
  console.log("[TRANSACCIÓN] Crear producto + asignar categoría:");
  console.log("─".repeat(60));
  console.log("  Producto:   ", producto.nombre);
  console.log("  Categoría ID:", categoriaId);

  // Pedimos una conexión dedicada del pool para toda la transacción
  const conexion = await pool.getConnection();

  try {
    // ── PASO 1: Iniciar la transacción ────────────────────────────────────

    // Desde aquí MySQL registra los cambios pero no los aplica todavía
    await conexion.beginTransaction();
    console.log("\n  🟡 BEGIN — transacción iniciada");

    // ── PASO 2: Insertar el producto ──────────────────────────────────────

    const [resultadoProducto] = await conexion.execute(
      `INSERT INTO productos (nombre, descripcion, precio, stock)
             VALUES (?, ?, ?, ?)`,
      [
        producto.nombre,
        producto.descripcion || null,
        producto.precio,
        producto.stock || 0,
      ],
    );

    const nuevoId = resultadoProducto.insertId;
    console.log(`  ✅ Producto insertado — insertId: ${nuevoId}`);

    // ── PASO 3: Asignar la categoría ──────────────────────────────────────

    // Si categoriaId no existe en la tabla categorias, esta línea lanzará
    // un error de FK (ER_NO_REFERENCED_ROW_2) y pasaremos al catch → ROLLBACK
    const [resultadoRelacion] = await conexion.execute(
      `INSERT INTO producto_categoria (producto_id, categoria_id)
             VALUES (?, ?)`,
      [nuevoId, categoriaId],
    );

    console.log(
      `  ✅ Categoría asignada — affectedRows: ${resultadoRelacion.affectedRows}`,
    );

    // ── PASO 4: COMMIT ────────────────────────────────────────────────────

    // Todo salió bien → aplicar los cambios definitivamente
    await conexion.commit();
    console.log("  🟢 COMMIT — cambios aplicados");
    console.log(
      `\n  Producto "${producto.nombre}" creado con ID ${nuevoId} y categoría ${categoriaId} asignada.`,
    );

    return nuevoId;
  } catch (error) {
    // ── PASO 5 (alternativo): ROLLBACK ────────────────────────────────────

    // Algo falló → descartar TODOS los cambios desde el beginTransaction()
    // El producto insertado en el PASO 2 también se deshace
    await conexion.rollback();
    console.log("  🔴 ROLLBACK — cambios descartados");
    console.log(`  ❌ Error: ${error.message}`);
    return null;
  } finally {
    // Siempre devolvemos la conexión al pool, haya error o no
    // Sin este paso la conexión quedaría bloqueada para siempre
    conexion.release();
    console.log("  🔌 Conexión devuelta al pool");
  }
}

// =============================================================================
// Función principal — ejecuta dos escenarios
// =============================================================================
async function main() {
  console.log("=".repeat(60));
  console.log(" DEMO TRANSACCIONES");
  console.log("=".repeat(60));

  // ── ESCENARIO A: Todo correcto ────────────────────────────────────────────

  // La categoría ID 1 (Electrónica) existe → ambas operaciones deben persistir
  console.log("\n\nESCENARIO A — categoría válida (ID 1: Electrónica)");
  await crearProductoConCategoria(
    {
      nombre: 'Tablet Pro 12"',
      descripcion: "Tablet de alta gama",
      precio: 450000,
      stock: 5,
    },
    1, // Electrónica
  );

  // ── ESCENARIO B: Categoría inexistente → ROLLBACK ─────────────────────────

  // La categoría ID 999 no existe → el INSERT de producto_categoria fallará
  // con ER_NO_REFERENCED_ROW_2 (FK violation) → ROLLBACK → el producto tampoco queda
  console.log("\n\n ESCENARIO B — categoría inválida (ID 999: no existe)");
  await crearProductoConCategoria(
    {
      nombre: "Smartwatch X",
      descripcion: "Reloj inteligente",
      precio: 180000,
      stock: 12,
    },
    999, // No existe → provoca error de FK → ROLLBACK
  );

  // ── Verificación final ────────────────────────────────────────────────────

  // Solo el producto del ESCENARIO A debe estar en la BD
  console.log("\n\n VERIFICACIÓN — productos en la base de datos:");
  console.log("─".repeat(60));

  const [productos] = await pool.execute(
    `SELECT p.nombre, c.nombre AS categoria
         FROM productos p
         LEFT JOIN producto_categoria pc ON pc.producto_id = p.id
         LEFT JOIN categorias c          ON c.id = pc.categoria_id
         WHERE p.nombre IN ('Tablet Pro 12"', 'Smartwatch X')`,
  );

  if (productos.length === 0) {
    console.log("  (ninguno de los dos productos está en la BD)");
  } else {
    productos.forEach((p) => {
      const cat = p.categoria || "sin categoría";
      console.log(`  ✔ ${p.nombre} — ${cat}`);
    });
  }
  // Resultado esperado: solo "Tablet Pro 12"" aparece con "Electrónica"
  // "Smartwatch X" no existe porque su transacción hizo ROLLBACK

  await pool.end();
  console.log("\n🔌 Pool cerrado.\n");
}

main();
