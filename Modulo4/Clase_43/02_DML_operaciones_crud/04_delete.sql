-- =============================================================================
-- CLASE 43 - Tema 10: Introducción a Bases de Datos Relacionales
-- ARCHIVO: 04_delete.sql
-- CATEGORÍA: DML (Data Manipulation Language) - DELETE del CRUD
-- OBJETIVO: Eliminar registros de forma segura considerando FK
-- =============================================================================

USE biblioteca;

-- -----------------------------------------------------------------------------
-- ¿QUÉ ES DELETE?
-- Elimina uno o más registros de una tabla.
-- ⚠️ REGLA DE ORO: SIEMPRE usar WHERE con DELETE.
-- Un DELETE sin WHERE elimina TODOS los registros de la tabla.
-- ⚠️ A diferencia de TRUNCATE, DELETE puede revertirse con ROLLBACK si
--    estamos dentro de una transacción.
-- -----------------------------------------------------------------------------

-- =============================================================================
-- 1. DELETE BÁSICO - Eliminar un registro específico
-- =============================================================================

-- Primero verificamos qué vamos a borrar (buena práctica: SELECT antes de DELETE)
SELECT * FROM libros WHERE id = 8;

-- Ahora sí eliminamos
DELETE FROM libros WHERE id = 8;

-- Verificar que fue eliminado
SELECT * FROM libros;

-- =============================================================================
-- 2. DELETE CON INTEGRIDAD REFERENCIAL
-- =============================================================================

-- ⚠️ Intentar borrar un autor que tiene libros asociados dará ERROR
-- porque libros tiene: ON DELETE RESTRICT
-- MySQL no permitirá borrar un padre que tiene hijos

-- Esto FALLARÁ si el autor tiene libros:
-- DELETE FROM autores WHERE id = 1;  ← ERROR: Cannot delete parent row

-- SOLUCIÓN 1: Borrar primero los libros del autor, luego el autor
DELETE FROM libros WHERE autor_id = 6;  -- Neruda (sin libros en nuestro ejemplo)
-- DELETE FROM autores WHERE id = 6;   -- Ahora sí podría borrarse

-- SOLUCIÓN 2 (mejor para producción): Soft delete con UPDATE
-- En lugar de borrar físicamente, marcar como inactivo
UPDATE autores SET activo = FALSE WHERE id = 6;

-- =============================================================================
-- 3. DELETE CON CONDICIÓN COMPLEJA
-- =============================================================================

-- Eliminar libros que están agotados (stock = 0) Y cuyo precio es muy bajo
DELETE FROM libros
WHERE stock = 0 AND precio < 500;

-- Eliminar libros publicados antes de 1950 y que no tienen ISBN
DELETE FROM libros
WHERE fecha_publicacion < '1950-01-01' AND isbn IS NULL;

-- =============================================================================
-- 4. TRANSACCIONES - Hacer DELETE de forma segura con ROLLBACK
-- =============================================================================

-- Una TRANSACCIÓN agrupa operaciones que se ejecutan todas juntas o ninguna.
-- Si algo falla, podemos deshacer todo con ROLLBACK.

-- Iniciar transacción
START TRANSACTION;

    -- Verificar qué borraremos
    SELECT * FROM libros WHERE autor_id = 4;

    -- Intentar el DELETE
    DELETE FROM libros WHERE autor_id = 4;

    -- Verificar el resultado
    SELECT * FROM libros;

-- Si el resultado es correcto → confirmar con COMMIT
-- COMMIT;

-- Si algo salió mal → deshacer con ROLLBACK
ROLLBACK;  -- ← Aquí elegimos deshacer (los libros de King vuelven)

-- =============================================================================
-- 5. DELETE vs TRUNCATE vs DROP
-- =============================================================================

-- DELETE FROM tabla WHERE condicion   → Borra filas específicas (DML, reversible)
-- DELETE FROM tabla                   → Borra TODAS las filas (DML, reversible)
-- TRUNCATE TABLE tabla                → Borra todas las filas (DDL, irreversible, más rápido)
-- DROP TABLE tabla                    → Borra toda la tabla y estructura (DDL, irreversible)

-- =============================================================================
-- RESUMEN DELETE:
--
--   DELETE FROM tabla WHERE condicion    → Borrar registros específicos
--   DELETE FROM tabla                    → ⚠️ Borrar TODOS los registros
--   START TRANSACTION + ROLLBACK/COMMIT  → Borrado seguro y reversible
--
-- BUENAS PRÁCTICAS:
--   ✅ Siempre hacer SELECT con el mismo WHERE antes de DELETE
--   ✅ Usar transacciones para operaciones críticas
--   ✅ Considerar "soft delete" (activo = FALSE) antes de borrar físicamente
--   ✅ Nunca olvidar el WHERE (a menos que quieras vaciar toda la tabla)
-- =============================================================================
