
INSERT INTO categorias (nombre, descripcion)
VALUES
    ('Electrónica',     'Dispositivos electrónicos, gadgets y tecnología'),
    ('Hogar',           'Electrodomésticos y artículos para el hogar'),
    ('Ropa',            'Indumentaria y accesorios de moda'),
    ('Calzado',         'Zapatillas, zapatos y todo tipo de calzado'),
    ('Libros',          'Libros técnicos, literatura, educativos y más'),
    ('Accesorios',      'Cables, fundas, adaptadores y accesorios varios'),
    ('Gaming',          'Consolas, periféricos y videojuegos'),
    ('Deportes',        'Ropa deportiva, calzado y equipamiento');


INSERT INTO productos (nombre, descripcion, precio, stock)
VALUES
    ('Smartphone Samsung Galaxy A54',      'Pantalla AMOLED 6.4", 128GB, cámara triple 50MP, batería 5000mAh.',           349999.00, 50),
    ('Notebook Lenovo IdeaPad 3',           'Intel Core i5, 8GB RAM, 512GB SSD, pantalla 15.6" Full HD.',                  749999.00, 20),
    ('Auriculares Sony WH-1000XM5',        'Cancelación activa de ruido, 30hs batería, conexión multipunto.',             129999.00, 35),
    ('Smart TV LG 55" 4K UHD',             'Panel NanoCell, webOS, compatible con Alexa y Google Assistant.',            549999.00, 15),
    ('Cafetera Philips Senseo',            'Monodosis, 15 bares de presión, depósito de 1 litro.',                        45999.00, 40),
    ('Aspiradora Robot iRobot Roomba i3',  'Navegación inteligente, compatible con Alexa, vaciado automático.',           189999.00, 10),
    ('Zapatillas Nike Air Max 270',        'Unidad de aire Max en el talón, suela de goma. Talle 42.',                    89999.00,  25),
    ('Remera Adidas Essentials',           'Algodón 100%, corte regular, colores surtidos. Talle M.',                     12999.00, 100),
    ('Clean Code - Robert C. Martin',      NULL,                                                                           8999.00,  30),
    ('Cable USB-C 2 metros',               'Carga rápida hasta 60W, compatible con la mayoría de dispositivos.',           2999.00, 200),
    ('Mouse Gamer Logitech G502 Hero',     'Sensor HERO 25K DPI, 11 botones programables, peso ajustable.',              59999.00,  45),
    ('Zapatillas Adidas Ultraboost Running','Tecnología Boost para máxima amortiguación. Talle 41.',                      119999.00,  30);

INSERT INTO producto_categoria (producto_id, categoria_id)
VALUES
    (1, 1),
    (2, 1),
    (3, 1),
    (4, 1),
    (5, 2),
    (6, 2),
    (7, 4),
    (7, 8),
    (8, 3),
    (8, 8),
    (9, 5),
    (10, 6),
    (11, 1),
    (11, 7),
    (12, 4),
    (12, 8);


-- ---------------------------------------------------------------------------
-- CONSULTAS BÁSICAS
-- ---------------------------------------------------------------------------

-- Ver todas las categorías
SELECT * FROM categorias;

-- Ver todos los productos (solo columnas relevantes)
SELECT id, nombre, precio, stock, activo FROM productos;

-- Ver la tabla intermedia (relación cruda)
SELECT * FROM producto_categoria;


-- ---------------------------------------------------------------------------
-- WHERE — Filtrar filas según una condición
-- ---------------------------------------------------------------------------
-- Estructura:
--   SELECT <columnas>
--   FROM <tabla>
--   WHERE <condicion>;
-- ---------------------------------------------------------------------------

-- Productos con stock menor a 10
SELECT id, nombre, stock
FROM productos
WHERE stock < 10;

-- Productos activos con precio mayor a 50000
SELECT id, nombre, precio
FROM productos
WHERE activo = TRUE AND precio > 50000;



-- ---------------------------------------------------------------------------
-- ORDER BY — Ordenar el resultado
-- ---------------------------------------------------------------------------
-- Estructura:
--   SELECT <columnas>
--   FROM <tabla>
--   ORDER BY <columna> ASC|DESC;
-- ---------------------------------------------------------------------------

-- Productos ordenados de mayor a menor precio
SELECT id, nombre, precio
FROM productos
ORDER BY precio DESC;

-- Categorías ordenadas alfabéticamente
SELECT id, nombre
FROM categorias
ORDER BY nombre ASC;


-- ---------------------------------------------------------------------------
-- LIMIT — Limitar la cantidad de filas devueltas
-- ---------------------------------------------------------------------------
-- Estructura:
--   SELECT <columnas>
--   FROM <tabla>
--   ORDER BY <columna>
--   LIMIT <n>;
-- ---------------------------------------------------------------------------

-- Los 3 productos más caros
SELECT id, nombre, precio
FROM productos
ORDER BY precio DESC
LIMIT 3;
-- 🗣️ "Traéme el id, nombre y precio de todos los productos, ordenándolos de mayor a menor precio, pero solo los primeros 3."

-- Los 5 productos con menos stock
SELECT id, nombre, stock
FROM productos
ORDER BY stock ASC
LIMIT 5;
-- 🗣️ "Traéme el id, nombre y stock de todos los productos, ordenándolos de menor a mayor stock, pero solo los primeros 5."


-- ---------------------------------------------------------------------------
-- INNER JOIN — Solo las filas que tienen coincidencia en AMBAS tablas
-- ---------------------------------------------------------------------------
-- Estructura:
--   SELECT <columnas>
--   FROM <tabla1>
--   INNER JOIN <tabla2> ON <tabla1.columna> = <tabla2.columna>;
--
-- Cuándo usarlo:
--   Cuando solo te interesan los registros que tienen relación en las dos tablas.
--   Si un producto no tiene categoría asignada, NO aparece en el resultado.
-- ---------------------------------------------------------------------------

-- Productos que tienen al menos una categoría asignada
SELECT p.nombre AS producto, c.nombre AS categoria
FROM productos p
INNER JOIN producto_categoria pc ON pc.producto_id  = p.id
INNER JOIN categorias c           ON c.id            = pc.categoria_id;
-- 🗣️ "Traéme el nombre del producto y el nombre de la categoría,
--      uniendo productos con producto_categoria donde el producto_id coincida,
--      y luego uniendo eso con categorias donde el id coincida.
--      Solo mostrará productos que tengan al menos una categoría asignada."


-- ---------------------------------------------------------------------------
-- SI NO EXISTIERA LA TABLA INTERMEDIA -  Solo productos y categorias 
-- ---------------------------------------------------------------------------

SELECT p.nombre, c.nombre
FROM productos p
JOIN categorias c ON p.categoria_id = c.id;


-- ---------------------------------------------------------------------------
-- LEFT JOIN — Todas las filas de la tabla IZQUIERDA, con o sin coincidencia
-- ---------------------------------------------------------------------------
-- Estructura:
--   SELECT <columnas>
--   FROM <tabla_izquierda>
--   LEFT JOIN <tabla_derecha> ON <condicion>;
--
-- Cuándo usarlo:
--   Cuando querés ver TODOS los registros de la tabla de la izquierda,
--   aunque no tengan ninguna relación en la tabla de la derecha.
--   Las columnas de la derecha aparecerán como NULL en esos casos.
--   Ejemplo: listar todos los productos, incluso los sin categoría.
-- ---------------------------------------------------------------------------

-- Todos los productos, con su categoría si tienen (NULL si no tienen)
SELECT p.nombre AS producto, c.nombre AS categoria
FROM productos p
LEFT JOIN producto_categoria pc ON pc.producto_id  = p.id
LEFT JOIN categorias c           ON c.id            = pc.categoria_id;
-- 🗣️ "Traéme el nombre del producto y el nombre de la categoría,
--      incluyendo TODOS los productos aunque no tengan categoría asignada.
--      Si un producto no tiene categoría, la columna categoria aparecerá como NULL."


-- ---------------------------------------------------------------------------
-- SI NO EXISTIERA LA TABLA INTERMEDIA -  Solo productos y categorias 
-- ---------------------------------------------------------------------------


SELECT p.nombre, c.nombre
FROM productos p
LEFT JOIN categorias c ON p.categoria_id = c.id;