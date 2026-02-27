-- =============================================================================
-- CLASE 43 - Tema 10: Introducción a Bases de Datos Relacionales
-- ARCHIVO: 01_crear_base_de_datos.sql
-- CATEGORÍA: DDL (Data Definition Language)
-- OBJETIVO: Crear y seleccionar una base de datos en MySQL
-- =============================================================================

-- -----------------------------------------------------------------------------
-- ¿QUÉ ES CREATE DATABASE?
-- Crea un nuevo schema (base de datos) en el servidor MySQL.
-- Un schema es el contenedor lógico de todas las tablas, vistas e índices
-- que forman una aplicación.
-- -----------------------------------------------------------------------------

-- Creamos la base de datos del ejemplo integral de la clase
-- IF NOT EXISTS evita un error si la BD ya existe (buena práctica)
CREATE DATABASE IF NOT EXISTS biblioteca
    CHARACTER SET utf8mb4        -- (OPCIONAL)Soporte para emojis y caracteres especiales
    COLLATE utf8mb4_unicode_ci;  -- (OPCIONAL)Comparaciones insensibles a mayúsculas/acentos

-- Verificar que la base de datos fue creada correctamente
SHOW DATABASES;

-- -----------------------------------------------------------------------------
-- ¿QUÉ ES USE?
-- Le indica a MySQL con qué base de datos queremos trabajar.
-- Todos los comandos siguientes afectarán a esta BD.
-- Equivalente a "hacer doble clic" en el schema en Workbench.
-- -----------------------------------------------------------------------------

USE biblioteca;

-- Verificar en qué base de datos estamos trabajando
SELECT DATABASE();

-- =============================================================================
-- RESUMEN DE COMANDOS DDL PARA BASES DE DATOS:
--
--   CREATE DATABASE nombre;           → Crear una base de datos
--   DROP DATABASE nombre;             → Eliminar una base de datos (¡CUIDADO!)
--   SHOW DATABASES;                   → Listar todas las bases de datos
--   USE nombre;                       → Seleccionar una base de datos
--   SELECT DATABASE();                → Ver cuál está seleccionada actualmente
-- =============================================================================
