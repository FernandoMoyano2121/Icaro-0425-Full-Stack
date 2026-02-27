-- =============================================================================
-- CLASE 43 - Tema 10: Introducción a Bases de Datos Relacionales
-- ARCHIVO: 01_insert.sql
-- CATEGORÍA: DML (Data Manipulation Language) - CREATE del CRUD
-- OBJETIVO: Insertar registros en las tablas autores y libros
-- =============================================================================

USE biblioteca;

-- -----------------------------------------------------------------------------
-- ¿QUÉ ES INSERT INTO?
-- Agrega uno o más registros nuevos a una tabla.
-- Los datos insertados deben respetar los tipos y constraints definidos.
-- -----------------------------------------------------------------------------

-- =============================================================================
-- 1. INSERT BÁSICO - Un solo registro especificando todas las columnas
-- =============================================================================

-- Sintaxis completa (especificamos cada columna y su valor correspondiente)
-- Orden: los valores deben coincidir con el orden de las columnas declaradas
INSERT INTO autores (nombre, apellido, nacionalidad, fecha_nacimiento, email, activo)
VALUES ('Gabriel', 'García Márquez', 'Colombiana', '1927-03-06', 'gabo@lit.com', TRUE);

-- =============================================================================
-- 2. INSERT OMITIENDO COLUMNAS CON DEFAULT
-- =============================================================================

-- No enviamos "activo" ni "creado_en" → MySQL usará sus valores DEFAULT
-- No enviamos "fecha_nacimiento" ni "email" → quedarán como NULL (aceptable)
INSERT INTO autores (nombre, apellido, nacionalidad)
VALUES ('Jorge Luis', 'Borges', 'Argentina');

-- =============================================================================
-- 3. INSERT MÚLTIPLE - Insertar varios registros en una sola sentencia
-- =============================================================================

-- Más eficiente que hacer múltiples INSERT individuales (menos viajes al servidor)
INSERT INTO autores (nombre, apellido, nacionalidad, fecha_nacimiento, email)
VALUES
    ('Isabel',      'Allende',    'Chilena',     '1942-08-02', 'isabel@allende.cl'),
    ('Stephen',     'King',       'Americana',   '1947-09-21', 'sking@horror.com'),
    ('Julio',       'Cortázar',   'Argentina',   '1914-08-26', 'julio@cronopio.ar'),
    ('Pablo',       'Neruda',     'Chilena',     '1904-07-12', NULL),
    ('Mario',       'Vargas Llosa','Peruana',    '1936-03-28', 'mvll@literatura.pe');

-- Verificar los registros insertados
SELECT * FROM autores;

-- =============================================================================
-- 4. INSERT EN TABLA HIJA (libros) - Respetando la FK
-- =============================================================================

-- IMPORTANTE: Los valores de autor_id deben corresponder a IDs existentes
-- en la tabla autores. MySQL rechazará el INSERT si el autor no existe.

-- García Márquez (id=1) escribió Cien Años de Soledad
INSERT INTO libros (titulo, descripcion, precio, stock, fecha_publicacion, isbn, autor_id)
VALUES (
    'Cien años de soledad',
    'La obra cumbre del realismo mágico latinoamericano. La saga de la familia Buendía.',
    1500.00,
    25,
    '1967-05-30',
    '978-0-06-088328-7',
    1  -- ← Este es el id de García Márquez en la tabla autores
);

-- Borges (id=2) escribió Ficciones
INSERT INTO libros (titulo, descripcion, precio, stock, fecha_publicacion, isbn, autor_id)
VALUES (
    'Ficciones',
    'Colección de cuentos que exploran laberintos, espejos y bibliotecas infinitas.',
    1200.00,
    15,
    '1944-01-01',
    '978-0-8021-3030-5',
    2
);

-- Insertar múltiples libros de una vez
INSERT INTO libros (titulo, precio, stock, autor_id)
VALUES
    ('El amor en los tiempos del cólera',    1400.00, 20,  1),  -- García Márquez
    ('La casa de los espíritus',             1300.00, 18,  3),  -- Allende (id=3)
    ('El resplandor',                        1100.00, 30,  4),  -- King (id=4)
    ('It',                                   1600.00, 22,  4),  -- King también
    ('Rayuela',                              1250.00, 10,  5),  -- Cortázar (id=5)
    ('La ciudad y los perros',               1100.00, 12,  7);  -- Vargas Llosa (id=7)

-- Verificar todos los libros insertados
SELECT * FROM libros;

-- =============================================================================
-- 5. INSERT CON ON DUPLICATE KEY UPDATE
-- Si el registro ya existe (por UNIQUE o PK), actualiza en lugar de dar error.
-- Útil para operaciones "upsert" (insert or update).
-- =============================================================================

INSERT INTO autores (nombre, apellido, email)
VALUES ('Gabriel', 'García Márquez', 'gabo@lit.com')
ON DUPLICATE KEY UPDATE
    apellido = VALUES(apellido);

-- =============================================================================
-- RESUMEN INSERT:
--
--   INSERT INTO tabla (col1, col2) VALUES (val1, val2)          → Un registro
--   INSERT INTO tabla (col1, col2) VALUES (v1,v2), (v3,v4)     → Múltiples
--   INSERT ... ON DUPLICATE KEY UPDATE col = valor              → Upsert
--
-- REGLAS IMPORTANTES:
--   ✅ Los valores deben respetar los tipos de datos
--   ✅ Las columnas NOT NULL sin DEFAULT deben incluirse
--   ✅ Las FK deben referenciar IDs existentes en la tabla padre
--   ✅ Los valores UNIQUE no pueden repetirse
-- =============================================================================
