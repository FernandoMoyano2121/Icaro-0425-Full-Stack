-- =============================================================================
-- CLASE 43 - Tema 10: Introducción a Bases de Datos Relacionales
-- ARCHIVO: 02_crear_tabla_productos.sql
-- CATEGORÍA: DDL - Práctica Integradora
-- OBJETIVO: Crear la tabla "productos" con todos los tipos de datos y constraints
-- =============================================================================

USE tienda;

-- =============================================================================
-- TABLA: productos
-- Representa los productos disponibles en nuestra tienda
-- Aplica todos los conceptos de tipos de datos y constraints del Tema 10
-- =============================================================================

CREATE TABLE IF NOT EXISTS productos (

    -- -------------------------------------------------------------------------
    -- id: Clave primaria autoincrementada (PK)
    -- Identifica de forma única cada producto en el catálogo
    -- -------------------------------------------------------------------------
    id              INT             AUTO_INCREMENT  NOT NULL,

    -- -------------------------------------------------------------------------
    -- nombre: Nombre del producto
    -- VARCHAR(150) → Suficiente para la mayoría de nombres de producto
    -- NOT NULL → Todo producto debe tener nombre
    -- -------------------------------------------------------------------------
    nombre          VARCHAR(150)    NOT NULL,

    -- -------------------------------------------------------------------------
    -- descripcion: Descripción detallada del producto
    -- TEXT → Para textos más largos (especificaciones, detalles, etc.)
    -- Opcional (puede ser NULL)
    -- -------------------------------------------------------------------------
    descripcion     TEXT,

    -- -------------------------------------------------------------------------
    -- precio: Precio del producto
    -- DECIMAL(10, 2) → Hasta 10 dígitos totales, 2 decimales
    -- Ejemplo válido: 99999999.99
    -- NOT NULL → No puede venderse un producto sin precio
    -- -------------------------------------------------------------------------
    precio          DECIMAL(10, 2)  NOT NULL,

    -- -------------------------------------------------------------------------
    -- stock: Cantidad de unidades disponibles
    -- INT → Número entero, no negativo
    -- DEFAULT 0 → Si no se indica, empieza en 0 (sin stock)
    -- -------------------------------------------------------------------------
    stock           INT             NOT NULL    DEFAULT 0,

    -- -------------------------------------------------------------------------
    -- categoria: Clasificación del producto
    -- VARCHAR(80) → Nombre de la categoría (ej: 'Electrónica', 'Ropa')
    -- DEFAULT 'Sin categoría' → Valor por defecto descriptivo
    -- -------------------------------------------------------------------------
    categoria       VARCHAR(80)     NOT NULL    DEFAULT 'Sin categoría',

    -- -------------------------------------------------------------------------
    -- activo: Indica si el producto está disponible en el catálogo
    -- BOOLEAN (TINYINT(1)) → TRUE = visible, FALSE = oculto (soft delete)
    -- DEFAULT TRUE → Los productos recién creados se activan automáticamente
    -- -------------------------------------------------------------------------
    activo          BOOLEAN         NOT NULL    DEFAULT TRUE,

    -- -------------------------------------------------------------------------
    -- creado_en: Fecha y hora exacta en que el producto fue registrado
    -- TIMESTAMP DEFAULT CURRENT_TIMESTAMP → MySQL lo completa automáticamente
    -- -------------------------------------------------------------------------
    creado_en       TIMESTAMP       DEFAULT CURRENT_TIMESTAMP,

    -- -------------------------------------------------------------------------
    -- actualizado_en: Fecha y hora de la última modificación
    -- ON UPDATE CURRENT_TIMESTAMP → MySQL actualiza este campo cada vez que
    --   se modifica cualquier otro campo de la fila. Muy útil para auditoría.
    -- -------------------------------------------------------------------------
    actualizado_en  TIMESTAMP       DEFAULT CURRENT_TIMESTAMP
                                    ON UPDATE CURRENT_TIMESTAMP,

    -- -------------------------------------------------------------------------
    -- PRIMARY KEY
    -- -------------------------------------------------------------------------
    PRIMARY KEY (id)

);

-- Verificar que la tabla fue creada correctamente
DESCRIBE productos;

-- Ver el DDL completo que MySQL generó internamente
SHOW CREATE TABLE productos\G
