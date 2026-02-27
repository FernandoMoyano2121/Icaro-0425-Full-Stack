-- =============================================================================
-- CLASE 43 - Tema 10: Introducción a Bases de Datos Relacionales
-- ARCHIVO: 04_modificar_tablas.sql
-- CATEGORÍA: DDL (Data Definition Language) - ALTER TABLE
-- OBJETIVO: Aprender a modificar la estructura de una tabla existente
-- =============================================================================

USE biblioteca;

-- -----------------------------------------------------------------------------
-- ¿QUÉ ES ALTER TABLE?
-- Permite modificar la estructura de una tabla YA EXISTENTE sin perder datos.
-- Es la operación equivalente a una "migración" en frameworks modernos.
-- -----------------------------------------------------------------------------

-- =============================================================================
-- 1. ADD COLUMN - AGREGAR UNA NUEVA COLUMNA
-- =============================================================================

-- Agregar una columna "paginas" a la tabla libros
ALTER TABLE libros
    ADD COLUMN paginas INT DEFAULT NULL;

-- Agregar una columna "biografia" a la tabla autores
ALTER TABLE autores
    ADD COLUMN biografia TEXT;

-- Agregar columna en una posición específica (AFTER = después de otra columna)
ALTER TABLE autores
    ADD COLUMN sitio_web VARCHAR(200) AFTER email;

-- Verificar los cambios
DESCRIBE autores;
DESCRIBE libros;

-- =============================================================================
-- 2. MODIFY COLUMN - CAMBIAR EL TIPO DE DATO O CONSTRAINTS DE UNA COLUMNA
-- =============================================================================

-- Cambiar el tipo de la columna "paginas" a SMALLINT (más eficiente para números pequeños)
-- SMALLINT soporta hasta 65,535 → más que suficiente para páginas de un libro
ALTER TABLE libros
    MODIFY COLUMN paginas SMALLINT UNSIGNED DEFAULT NULL;

-- Hacer que "nacionalidad" tenga NOT NULL además del DEFAULT
-- (debemos repetir todas las propiedades de la columna al hacer MODIFY)
ALTER TABLE autores
    MODIFY COLUMN nacionalidad VARCHAR(50) NOT NULL DEFAULT 'Desconocida';

-- =============================================================================
-- 3. RENAME COLUMN - RENOMBRAR UNA COLUMNA
-- (disponible desde MySQL 8.0)
-- =============================================================================

-- Renombrar "sitio_web" a "website" en autores
ALTER TABLE autores
    RENAME COLUMN sitio_web TO website;

-- =============================================================================
-- 4. ADD CONSTRAINT - AGREGAR RESTRICCIONES A UNA TABLA EXISTENTE
-- =============================================================================

-- Agregar un índice para acelerar búsquedas por apellido
-- (útil si hacemos SELECT frecuentes por apellido)
ALTER TABLE autores
    ADD INDEX idx_apellido (apellido);

-- =============================================================================
-- 5. RENAME TABLE - RENOMBRAR UNA TABLA COMPLETA
-- =============================================================================

-- Ejemplo (no ejecutar si quieres mantener el nombre): renombrar "autores"
-- ALTER TABLE autores RENAME TO escritores;

-- =============================================================================
-- 6. VERIFICAR EL ESTADO ACTUAL DE LAS TABLAS
-- =============================================================================

-- Ver la estructura completa de las tablas modificadas
DESCRIBE autores;
DESCRIBE libros;

-- Ver los índices de una tabla
SHOW INDEX FROM autores;
SHOW INDEX FROM libros;

-- =============================================================================
-- RESUMEN DE COMANDOS ALTER TABLE:
--
--   ADD COLUMN nombre tipo [constraints]    → Agregar columna
--   MODIFY COLUMN nombre tipo [constraints] → Cambiar tipo/constraints
--   RENAME COLUMN viejo TO nuevo            → Renombrar columna (MySQL 8+)
--   DROP COLUMN nombre                      → Eliminar columna (ver archivo 05)
--   ADD INDEX nombre (columna)              → Agregar índice de búsqueda
--   ADD CONSTRAINT nombre FOREIGN KEY ...   → Agregar FK después de crear la tabla
--   RENAME TO nuevo_nombre                  → Renombrar la tabla entera
-- =============================================================================
