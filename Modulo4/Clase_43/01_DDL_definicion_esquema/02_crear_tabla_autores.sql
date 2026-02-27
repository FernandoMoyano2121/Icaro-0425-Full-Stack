-- =============================================================================
-- CLASE 43 - Tema 10: Introducción a Bases de Datos Relacionales
-- ARCHIVO: 02_crear_tabla_autores.sql
-- CATEGORÍA: DDL (Data Definition Language)
-- OBJETIVO: Crear la tabla "autores" con PK, tipos de datos y constraints
-- SLIDE: 42 - "Creación de tabla Autores"
-- =============================================================================

-- Nos aseguramos de estar usando la base de datos correcta
USE biblioteca;

-- -----------------------------------------------------------------------------
-- ¿QUÉ ES CREATE TABLE?
-- Define la estructura (esquema) de una tabla nueva en la base de datos.
-- Aquí decidimos:
--   - Qué columnas va a tener la tabla
--   - Qué tipo de dato almacena cada columna
--   - Qué restricciones (constraints) tiene cada columna
-- -----------------------------------------------------------------------------

CREATE TABLE IF NOT EXISTS autores (

    -- -------------------------------------------------------------------------
    -- COLUMNA: id
    -- Tipo: INT → Número entero. Suficiente para millones de autores.
    -- AUTO_INCREMENT → MySQL asigna automáticamente el siguiente número (1, 2, 3...)
    --                   No necesitamos enviarlo en el INSERT.
    -- NOT NULL → No puede estar vacío.
    -- PRIMARY KEY → Identifica de forma ÚNICA cada fila.
    --               No puede haber dos autores con el mismo id.
    --               Implica NOT NULL + UNIQUE automáticamente.
    -- -------------------------------------------------------------------------
    id          INT             AUTO_INCREMENT  NOT NULL,

    -- -------------------------------------------------------------------------
    -- COLUMNA: nombre
    -- Tipo: VARCHAR(100) → Texto de longitud variable, máximo 100 caracteres.
    -- NOT NULL → El nombre del autor es obligatorio.
    -- -------------------------------------------------------------------------
    nombre      VARCHAR(100)    NOT NULL,

    -- -------------------------------------------------------------------------
    -- COLUMNA: apellido
    -- Tipo: VARCHAR(100) → Texto variable hasta 100 caracteres.
    -- NOT NULL → El apellido es obligatorio.
    -- -------------------------------------------------------------------------
    apellido    VARCHAR(100)    NOT NULL,

    -- -------------------------------------------------------------------------
    -- COLUMNA: nacionalidad
    -- Tipo: VARCHAR(50) → Texto corto para el país.
    -- DEFAULT 'Desconocida' → Si no enviamos este dato, MySQL pone este valor.
    -- -------------------------------------------------------------------------
    nacionalidad VARCHAR(50)    DEFAULT 'Desconocida',

    -- -------------------------------------------------------------------------
    -- COLUMNA: fecha_nacimiento
    -- Tipo: DATE → Almacena solo fecha en formato YYYY-MM-DD.
    --              Ejemplo: '1947-09-21' (Stephen King)
    -- NULL (sin NOT NULL) → Este dato es opcional.
    -- -------------------------------------------------------------------------
    fecha_nacimiento DATE,

    -- -------------------------------------------------------------------------
    -- COLUMNA: email
    -- Tipo: VARCHAR(150) → Para el correo electrónico.
    -- UNIQUE → No pueden existir dos autores con el mismo email.
    --          A diferencia de PRIMARY Key, sí puede ser NULL (por defecto).
    -- -------------------------------------------------------------------------
    email       VARCHAR(150)    UNIQUE,

    -- -------------------------------------------------------------------------
    -- COLUMNA: activo
    -- Tipo: BOOLEAN → Almacena TRUE(1) o FALSE(0).
    --                 En MySQL internamente es TINYINT(1).
    -- DEFAULT TRUE → Si no enviamos este dato, el autor se crea como activo.
    -- -------------------------------------------------------------------------
    activo      BOOLEAN         DEFAULT TRUE,

    -- -------------------------------------------------------------------------
    -- COLUMNA: creado_en
    -- Tipo: TIMESTAMP → Fecha y hora exacta.
    -- DEFAULT CURRENT_TIMESTAMP → MySQL coloca automáticamente la fecha/hora
    --                              actual en el momento de crear el registro.
    -- -------------------------------------------------------------------------
    creado_en   TIMESTAMP       DEFAULT CURRENT_TIMESTAMP,

    -- -------------------------------------------------------------------------
    -- DEFINICIÓN DE LA PRIMARY KEY
    -- Le indicamos a MySQL cuál es la columna clave primaria de la tabla.
    -- Podría haberse escrito en la misma línea del campo (PRIMARY KEY inline),
    -- pero al final es más legible para claves compuestas o complejas.
    -- -------------------------------------------------------------------------
    PRIMARY KEY (id)

);

-- Verificar que la tabla fue creada con la estructura correcta
DESCRIBE autores;

-- Ver la sentencia completa con la que MySQL "recuerda" la tabla
SHOW CREATE TABLE autores;

-- =============================================================================
-- RESUMEN DE LO QUE APRENDIMOS EN ESTE ARCHIVO:
--
--   CREATE TABLE IF NOT EXISTS nombre (...)  → Crear tabla sin error si existe
--   INT AUTO_INCREMENT                       → Clave numérica autogenerada
--   VARCHAR(n)                               → Texto hasta n caracteres
--   DATE                                     → Fecha sin hora
--   TIMESTAMP DEFAULT CURRENT_TIMESTAMP      → Fecha/hora automática al insertar
--   BOOLEAN DEFAULT TRUE                     → Booleano con valor por defecto
--   NOT NULL                                 → Campo obligatorio
--   UNIQUE                                   → Sin duplicados en esa columna
--   PRIMARY KEY (columna)                    → Identificador único de la tabla
-- =============================================================================
