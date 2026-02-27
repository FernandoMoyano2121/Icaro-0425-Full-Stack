-- =============================================================================
-- CLASE 43 - Tema 10: Introducción a Bases de Datos Relacionales
-- ARCHIVO: 03_crear_tabla_libros.sql
-- CATEGORÍA: DDL (Data Definition Language)
-- OBJETIVO: Crear la tabla "libros" con FK que referencia a "autores"

-- =============================================================================

USE biblioteca;

-- -----------------------------------------------------------------------------
-- IMPORTANTE: La tabla "autores" debe existir ANTES de crear "libros"
-- porque "libros" va a hacer referencia a "autores" con una FOREIGN KEY.
-- Esto se llama TABLA PADRE (autores) → TABLA HIJA (libros).
-- -----------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS libros (

    -- -------------------------------------------------------------------------
    -- PRIMARY KEY de la tabla libros
    -- Cada libro tiene su propio id único autoincrementado.
    -- -------------------------------------------------------------------------
    id              INT             AUTO_INCREMENT  NOT NULL,

    -- -------------------------------------------------------------------------
    -- COLUMNA: titulo
    -- NOT NULL → Todo libro debe tener un título.
    -- -------------------------------------------------------------------------
    titulo          VARCHAR(200)    NOT NULL,

    -- -------------------------------------------------------------------------
    -- COLUMNA: descripcion
    -- Tipo: TEXT → Para textos más largos que VARCHAR permite.
    --             Ideal para sinopsis, descripciones extensas.
    -- Sin NOT NULL → La descripción es opcional.
    -- -------------------------------------------------------------------------
    descripcion     TEXT,

    -- -------------------------------------------------------------------------
    -- COLUMNA: precio
    -- Tipo: DECIMAL(10, 2) → Número decimal exacto.
    --   10 = precisión total (máximo 10 dígitos en total)
    --   2  = escala (2 decimales, ej: 199.99)
    -- IMPORTANTE: Para dinero SIEMPRE usar DECIMAL, nunca FLOAT o DOUBLE
    --             porque FLOAT tiene errores de precisión.
    -- NOT NULL → Todo libro debe tener un precio.
    -- -------------------------------------------------------------------------
    precio          DECIMAL(10, 2)  NOT NULL,

    -- -------------------------------------------------------------------------
    -- COLUMNA: stock
    -- INT → Cantidad de unidades disponibles.
    -- DEFAULT 0 → Si no se especifica, empieza en 0.
    -- -------------------------------------------------------------------------
    stock           INT             DEFAULT 0,

    -- -------------------------------------------------------------------------
    -- COLUMNA: fecha_publicacion
    -- DATE → Solo la fecha (sin hora).
    -- -------------------------------------------------------------------------
    fecha_publicacion DATE,

    -- -------------------------------------------------------------------------
    -- COLUMNA: isbn
    -- VARCHAR(20) → Código único internacional del libro.
    -- UNIQUE → No pueden existir dos libros con el mismo ISBN.
    -- -------------------------------------------------------------------------
    isbn            VARCHAR(20)     UNIQUE,

    -- -------------------------------------------------------------------------
    -- COLUMNA: autor_id  ← FOREIGN KEY
    -- Esta columna almacena el "id" del autor que escribió el libro.
    -- Debe ser del MISMO TIPO que la PK de la tabla autores (INT).
    -- NOT NULL → Todo libro debe tener un autor (en este diseño).
    -- -------------------------------------------------------------------------
    autor_id        INT             NOT NULL,

    -- -------------------------------------------------------------------------
    -- COLUMNA: creado_en
    -- Timestamp automático al momento de insertar el registro.
    -- -------------------------------------------------------------------------
    creado_en       TIMESTAMP       DEFAULT CURRENT_TIMESTAMP,

    -- -------------------------------------------------------------------------
    -- DEFINICIÓN DE LA PRIMARY KEY
    -- -------------------------------------------------------------------------
    PRIMARY KEY (id),

    -- -------------------------------------------------------------------------
    -- DEFINICIÓN DE LA FOREIGN KEY
    --
    -- FOREIGN KEY (autor_id)         → La columna de ESTA tabla que es FK
    -- REFERENCES autores(id)         → A qué tabla y columna apunta
    --
    -- ON DELETE RESTRICT  → Si intento ELIMINAR un autor que tiene libros,
    --                        MySQL lanza un error. Protege la integridad.
    -- ON UPDATE CASCADE   → Si el id del autor cambia (raro con INT/PK),
    --                        se actualiza automáticamente en libros también.
    --
    -- INTEGRIDAD REFERENCIAL: MySQL garantiza que autor_id en libros
    -- SIEMPRE corresponda a un id real en la tabla autores.
    -- -------------------------------------------------------------------------
    CONSTRAINT fk_libros_autor
        FOREIGN KEY (autor_id)
        REFERENCES autores(id)
        ON DELETE RESTRICT
        ON UPDATE CASCADE

);

-- Verificar estructura de la tabla
DESCRIBE libros;

-- Ver las relaciones (Foreign Keys) definidas en la base de datos
SELECT
    TABLE_NAME,
    CONSTRAINT_NAME,
    REFERENCED_TABLE_NAME,
    REFERENCED_COLUMN_NAME
FROM
    INFORMATION_SCHEMA.KEY_COLUMN_USAGE
WHERE
    TABLE_SCHEMA = 'biblioteca'
    AND REFERENCED_TABLE_NAME IS NOT NULL;

-- =============================================================================
-- RESUMEN DE LO NUEVO EN ESTE ARCHIVO:
--
--   DECIMAL(p, s)         → Decimales exactos para dinero (p=total, s=decimales)
--   TEXT                  → Texto largo sin límite fijo
--   FOREIGN KEY (col)     → Columna que referencia una PK de otra tabla
--   REFERENCES tabla(col) → Tabla y columna que se referencian
--   ON DELETE RESTRICT    → No dejar borrar el padre si tiene hijos
--   ON DELETE CASCADE     → Borrar hijos automáticamente al borrar el padre
--   ON UPDATE CASCADE     → Propagar cambios en la PK padre a los hijos
-- =============================================================================
