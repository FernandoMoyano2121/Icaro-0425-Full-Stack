-- =============================================================================
-- CLASE 43 - Tema 10: Introducción a Bases de Datos Relacionales
-- ARCHIVO: 02_select.sql
-- CATEGORÍA: DML (Data Manipulation Language) - READ del CRUD
-- OBJETIVO: Consultar datos con SELECT, WHERE, ORDER BY y más
-- =============================================================================

USE biblioteca;

-- -----------------------------------------------------------------------------
-- ¿QUÉ ES SELECT?
-- Lee (consulta) registros de una o más tablas.
-- Es la operación más frecuente en SQL: toda pantalla de la app hace SELECT.
-- -----------------------------------------------------------------------------

-- =============================================================================
-- 1. SELECT BÁSICO - Todas las filas y columnas
-- =============================================================================

-- El asterisco (*) trae TODAS las columnas de la tabla
-- En producción, evitar el * y especificar las columnas necesarias (más eficiente)
SELECT * FROM autores;

SELECT * FROM libros;

-- =============================================================================
-- 2. SELECT ESPECÍFICO - Solo las columnas que necesitamos
-- =============================================================================

-- Traer solo nombre, apellido y nacionalidad de los autores
SELECT nombre, apellido, nacionalidad
FROM autores;

-- Traer solo titulo y precio de los libros
SELECT titulo, precio
FROM libros;

-- =============================================================================
-- 3. SELECT CON ALIAS - Renombrar columnas en el resultado
-- =============================================================================

-- AS permite darle un nombre diferente a la columna en la respuesta
-- IMPORTANTE: Para aliases con espacios o caracteres especiales usamos backticks ` `
-- NO usar comillas simples '' para aliases → Workbench las interpreta como strings
SELECT
    nombre     AS  Nombre del Autor,
    apellido   AS  Apellido,
    email      AS  Correo Electronico
FROM autores;

-- =============================================================================
-- 4. CLÁUSULA WHERE - Filtrar registros 
-- =============================================================================

-- WHERE funciona con SELECT, UPDATE y DELETE.
-- Solo trae/afecta los registros que cumplan la condición.

-- Buscar autores de nacionalidad argentina
SELECT * FROM autores
WHERE nacionalidad = 'Argentina';

-- Buscar libros con precio mayor a 1300
SELECT titulo, precio FROM libros
WHERE precio > 1300.00;

-- Buscar libros con stock entre 15 y 25 unidades (BETWEEN incluye los extremos)
SELECT titulo, stock FROM libros
WHERE stock BETWEEN 15 AND 25;

-- Buscar autores cuyo apellido empieza con 'G' (LIKE con wildcard %)
SELECT nombre, apellido FROM autores
WHERE apellido LIKE 'G%';

-- Buscar autores que NO tienen email registrado (IS NULL)
SELECT nombre, apellido FROM autores
WHERE email IS NULL;

-- Buscar autores que SÍ tienen email (IS NOT NULL)
SELECT nombre, apellido FROM autores
WHERE email IS NOT NULL;

-- Combinar condiciones con AND y OR
SELECT titulo, precio, stock FROM libros
WHERE precio > 1200 AND stock > 15;

SELECT titulo, precio FROM libros
WHERE precio < 1200 OR precio > 1500;

-- Buscar registros en una lista de valores (IN)
SELECT * FROM autores
WHERE nacionalidad IN ('Colombiana', 'Chilena', 'Peruana');

-- =============================================================================
-- 5. ORDER BY - Ordenar resultados
-- =============================================================================

-- Ordenar libros de menor a mayor precio (ASC = ascendente, es el default)
SELECT titulo, precio FROM libros
ORDER BY precio ASC;

-- Ordenar libros de mayor a menor precio (DESC = descendente)
SELECT titulo, precio FROM libros
ORDER BY precio DESC;

-- Ordenar autores por apellido alfabéticamente, y en caso de empate, por nombre
SELECT nombre, apellido FROM autores
ORDER BY apellido ASC, nombre ASC;

-- =============================================================================
-- 6. LIMIT - Limitar la cantidad de resultados
-- =============================================================================

-- Traer solo los 3 libros más baratos
SELECT titulo, precio FROM libros
ORDER BY precio ASC
LIMIT 3;

-- Paginación: traer 3 resultados saltando los primeros 3 (página 2)
-- LIMIT cantidad OFFSET inicio
SELECT titulo, precio FROM libros
ORDER BY precio ASC
LIMIT 3 OFFSET 3;

-- =============================================================================
-- 7. FUNCIONES DE AGREGACIÓN
-- =============================================================================

-- Contar cuántos autores hay en total
SELECT COUNT(*) AS total_autores FROM autores;

-- Precio promedio de todos los libros
SELECT AVG(precio) AS precio_promedio FROM libros;

-- Precio máximo y mínimo
SELECT MAX(precio) AS mas_caro, MIN(precio) AS mas_barato FROM libros;

-- Suma total del stock disponible
SELECT SUM(stock) AS stock_total FROM libros;

-- =============================================================================
-- 8. GROUP BY - Agrupar resultados
-- =============================================================================

-- Contar cuántos libros tiene cada autor
SELECT autor_id, COUNT(*) AS cantidad_libros
FROM libros
GROUP BY autor_id;

-- =============================================================================
-- RESUMEN SELECT:
--
--   SELECT col1, col2 FROM tabla             → Columnas específicas
--   SELECT * FROM tabla                       → Todas las columnas
--   WHERE condicion                           → Filtrar filas
--   ORDER BY col ASC|DESC                     → Ordenar
--   LIMIT n                                   → Limitar cantidad
--   LIMIT n OFFSET m                          → Paginación
--   COUNT(*), AVG(), MAX(), MIN(), SUM()      → Funciones de agregación
--   GROUP BY columna                          → Agrupar resultados
-- =============================================================================
