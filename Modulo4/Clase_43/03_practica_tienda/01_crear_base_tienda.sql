-- =============================================================================
-- CLASE 43 - Tema 10: Introducción a Bases de Datos Relacionales
-- ARCHIVO: 01_crear_base_tienda.sql
-- CATEGORÍA: DDL - Práctica Integradora
-- OBJETIVO: Crear el schema "tienda" como indica la práctica de la clase
-- =============================================================================

-- -----------------------------------------------------------------------------
-- ENUNCIADO DE LA PRÁCTICA
--   1. Crear y conectarse a una base de datos llamada "tienda"
--   2. Crear una tabla productos
--   3. Agregar registros
--   4. Verificar existencia con Query en MySQL Workbench y filtrar por precio
-- -----------------------------------------------------------------------------

-- Paso 1: Crear la base de datos "tienda"
CREATE DATABASE IF NOT EXISTS tienda
    CHARACTER SET utf8mb4
    COLLATE utf8mb4_unicode_ci;

-- Paso 2: Seleccionar la base de datos para trabajar en ella
USE tienda;

-- Verificar que estamos en el schema correcto
SELECT DATABASE();

-- Verificar que la BD fue creada
SHOW DATABASES LIKE 'tienda';
