-- =============================================================================
-- CLASE 43 - Tema 10: Introducción a Bases de Datos Relacionales
-- ARCHIVO: 04_consultas_productos.sql
-- CATEGORÍA: DML - Práctica Integradora
-- OBJETIVO: Consultas y filtros sobre la tabla productos (resolución completa)
-- =============================================================================

USE tienda;

-- =============================================================================
-- PASO 1: CONSULTA BASE - Ver todos los productos
-- =============================================================================

SELECT * FROM productos;

-- =============================================================================
-- PASO 2: FILTRO POR PRECIO > 100
-- En el contexto de la práctica, el precio está en pesos → $100 ARS
-- =============================================================================

SELECT
    id,
    nombre,
    precio,
    stock,
    categoria
FROM productos
WHERE precio > 100
ORDER BY precio ASC;

-- =============================================================================
-- CONSULTAS ADICIONALES - Expandiendo la práctica
-- =============================================================================

-- Filtrar por precio mayor a 100.000 (ej: productos premium)
SELECT nombre, precio, categoria
FROM productos
WHERE precio > 100000
ORDER BY precio DESC;

-- Buscar productos de una categoría específica
SELECT nombre, precio, stock
FROM productos
WHERE categoria = 'Electrónica'
ORDER BY precio ASC;

-- Buscar productos con stock bajo (menos de 20 unidades)
SELECT nombre, stock, categoria
FROM productos
WHERE stock < 20
ORDER BY stock ASC;

-- Buscar productos activos con precio entre 10.000 y 200.000
SELECT nombre, precio, categoria
FROM productos
WHERE activo = TRUE
  AND precio BETWEEN 10000 AND 200000
ORDER BY precio ASC;

-- Buscar por nombre (búsqueda parcial con LIKE)
SELECT nombre, precio
FROM productos
WHERE nombre LIKE '%Samsung%';

-- =============================================================================
-- VERIFICACIONES FINALES DE LA PRÁCTICA
-- =============================================================================

-- ¿Cuántos productos en total?
SELECT COUNT(*) AS total_productos FROM productos;

-- ¿Cuántos productos tienen precio mayor a 100?
SELECT COUNT(*) AS productos_sobre_100
FROM productos
WHERE precio > 100;

-- Precio más caro, más barato y promedio
SELECT
    MAX(precio)  AS precio_maximo,
    MIN(precio)  AS precio_minimo,
    AVG(precio)  AS precio_promedio,
    SUM(stock)   AS stock_total
FROM productos;

-- =============================================================================
-- PRÁCTICA COMPLETADA ✅
-- Se cumplieron todos los objetivos del Slide 55:
--   ✅ BD "tienda" creada (archivo 01)
--   ✅ Tabla "productos" creada (archivo 02)
--   ✅ Registros agregados (archivo 03)
--   ✅ Query de consulta ejecutada
--   ✅ Filtro por precio mayor a 100 aplicado
-- =============================================================================
