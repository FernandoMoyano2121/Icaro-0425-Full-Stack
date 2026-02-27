-- =============================================================================
-- CLASE 43 - Tema 10: Introducción a Bases de Datos Relacionales
-- ARCHIVO: 05_eliminar_columnas.sql
-- CATEGORÍA: DDL (Data Definition Language) - DROP
-- OBJETIVO: Eliminar columnas y tablas de forma segura
-- =============================================================================

USE biblioteca;

-- ⚠️ ADVERTENCIA: Los comandos DROP son IRREVERSIBLES.
-- No preguntan confirmación. Una vez ejecutados, los datos se pierden.
-- SIEMPRE hacer un backup antes de usar DROP en producción.

-- =============================================================================
-- 1. DROP COLUMN - ELIMINAR UNA COLUMNA DE UNA TABLA
-- =============================================================================

-- Eliminar la columna "website" de autores (que agregamos en el archivo anterior)
-- Esto elimina la columna Y todos los datos que contenía
ALTER TABLE autores
    DROP COLUMN website;

-- Eliminar la columna "paginas" de libros
ALTER TABLE libros
    DROP COLUMN paginas;

-- Verificar que las columnas desaparecieron
DESCRIBE autores;
DESCRIBE libros;

-- =============================================================================
-- 2. DROP INDEX - ELIMINAR UN ÍNDICE
-- =============================================================================

-- Eliminar el índice que creamos en el archivo anterior
ALTER TABLE autores
    DROP INDEX idx_apellido;

-- =============================================================================
-- 3. DROP TABLE - ELIMINAR UNA TABLA COMPLETA
-- =============================================================================

-- IMPORTANTE: No podemos eliminar "autores" directamente porque "libros"
-- tiene una FOREIGN KEY que la referencia.
-- Debemos eliminar PRIMERO la tabla hija (libros) y LUEGO la padre (autores).

-- ⚠️ Solo ejecutar si queremos borrar todo y empezar de cero:
-- DROP TABLE IF EXISTS libros;
-- DROP TABLE IF EXISTS autores;

-- ALTERNATIVA: TRUNCATE TABLE (vacía la tabla pero mantiene su estructura)
-- TRUNCATE TABLE libros;  ← Borra todos los registros, resetea AUTO_INCREMENT
-- DELETE FROM libros;     ← Borra todos los registros, pero es DML (más lento)

-- =============================================================================
-- 4. COMPARATIVA: DROP vs TRUNCATE vs DELETE
-- =============================================================================

-- DROP TABLE nombre         → Elimina la tabla Y su estructura (DDL)
-- TRUNCATE TABLE nombre     → Vacía todos los datos, conserva la estructura (DDL)
-- DELETE FROM nombre        → Vacía los datos pero es reversible con ROLLBACK (DML)

-- =============================================================================
-- 5. DROP DATABASE - ELIMINAR UNA BASE DE DATOS COMPLETA
-- =============================================================================

-- ⚠️ NUNCA ejecutar esto en producción sin un backup previo:
-- DROP DATABASE IF EXISTS biblioteca;

-- =============================================================================
-- RESUMEN:
--
--   ALTER TABLE nombre DROP COLUMN columna  → Borra una columna (irreversible)
--   ALTER TABLE nombre DROP INDEX nombre    → Borra un índice
--   DROP TABLE IF EXISTS nombre             → Borra tabla y datos (irreversible)
--   TRUNCATE TABLE nombre                   → Vacía datos, conserva estructura
--   DROP DATABASE IF EXISTS nombre          → Borra toda la BD (⚠️ máximo cuidado)
-- =============================================================================
