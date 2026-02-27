-- =============================================================================
-- CLASE 43 - Tema 10: Introducción a Bases de Datos Relacionales
-- ARCHIVO: 03_update.sql
-- CATEGORÍA: DML (Data Manipulation Language) - UPDATE del CRUD
-- OBJETIVO: Modificar registros existentes de forma segura
-- =============================================================================

USE biblioteca;

-- -----------------------------------------------------------------------------
-- ¿QUÉ ES UPDATE?
-- Modifica uno o más registros ya existentes en una tabla.
-- ⚠️ REGLA DE ORO: SIEMPRE usar WHERE con UPDATE.
-- Un UPDATE sin WHERE modifica TODOS los registros de la tabla.
-- -----------------------------------------------------------------------------

-- =============================================================================
-- 1. UPDATE BÁSICO - Modificar una columna de un registro específico
-- =============================================================================

-- Actualizar el email de García Márquez (id=1)
-- WHERE id = 1 asegura que solo afectamos a ese autor
UPDATE autores
SET email = 'gabriel.garcia@literatura.com'
WHERE id = 1;

-- Verificar el cambio
SELECT id, nombre, apellido, email FROM autores WHERE id = 1;

-- =============================================================================
-- 2. UPDATE MÚLTIPLES COLUMNAS A LA VEZ
-- =============================================================================

-- Actualizar precio y stock de un libro al mismo tiempo
-- Las columnas se separan con coma dentro del SET
UPDATE libros
SET
    precio = 1650.00,
    stock  = 30
WHERE id = 1;

-- Verificar el cambio
SELECT id, titulo, precio, stock FROM libros WHERE id = 1;

-- =============================================================================
-- 3. UPDATE CON CONDICIÓN WHERE COMPLEJA
-- =============================================================================

-- Aumentar el precio de todos los libros de García Márquez (autor_id = 1) en un 10%
UPDATE libros
SET precio = precio * 1.10
WHERE autor_id = 1;

-- Desactivar (soft delete) autores que no tienen email registrado
-- En lugar de BORRAR el autor, lo marcamos como inactivo
-- Esto se llama "soft delete" o "baja lógica"
UPDATE autores
SET activo = FALSE
WHERE email IS NULL;

-- =============================================================================
-- 4. UPDATE CON VALOR CALCULADO
-- =============================================================================

-- Reducir stock en 1 (simular venta de un libro)
UPDATE libros
SET stock = stock - 1
WHERE id = 2 AND stock > 0;  -- El AND stock > 0 evita stock negativo

-- =============================================================================
-- 5. UPDATE SIN WHERE (⚠️ PELIGROSO - SOLO EN CASOS EXCEPCIONALES)
-- =============================================================================

-- Esto actualiza TODOS los libros sin excepción
-- Solo usarlo cuando realmente queremos afectar toda la tabla
UPDATE libros
SET stock = 0;  -- Vaciar todo el inventario (ej: cierre de negocio)

-- Restaurar datos para los ejemplos siguientes
UPDATE libros SET stock = 25 WHERE id = 1;
UPDATE libros SET stock = 15 WHERE id = 2;
UPDATE libros SET stock = 20 WHERE id = 3;
UPDATE libros SET stock = 18 WHERE id = 4;
UPDATE libros SET stock = 30 WHERE id = 5;
UPDATE libros SET stock = 22 WHERE id = 6;
UPDATE libros SET stock = 10 WHERE id = 7;
UPDATE libros SET stock = 12 WHERE id = 8;

-- =============================================================================
-- RESUMEN UPDATE:
--
--   UPDATE tabla SET col1 = val1 WHERE condicion         → Actualizar un campo
--   UPDATE tabla SET col1 = v1, col2 = v2 WHERE ...     → Múltiples campos
--   UPDATE tabla SET precio = precio * 1.10 WHERE ...   → Valor calculado
--
-- ⚠️ NUNCA olvidar el WHERE (a menos que quieras modificar toda la tabla)
-- ✅ Usar SELECT primero con el mismo WHERE para verificar cuáles filas afecta
-- ✅ Preferir baja lógica (SET activo = FALSE) sobre DELETE en datos sensibles
-- =============================================================================
