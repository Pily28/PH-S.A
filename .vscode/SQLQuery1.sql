-- Crear la base de datos
CREATE DATABASE PHSA;

USE PHSA;

-- Crear la tabla de usuarios
CREATE TABLE Users (
    Id INT PRIMARY KEY IDENTITY(1,1),
    Username NVARCHAR(50) NOT NULL,
    Email NVARCHAR(100) NOT NULL UNIQUE,
    PasswordHash NVARCHAR(255) NOT NULL,
    CreatedAt DATETIME DEFAULT GETDATE()
);
USE PHSA;


INSERT INTO Users (Username, Email, PasswordHash)
VALUES ('Priscila M', 'pili@example.com', 'htgfhafja');

INSERT INTO Users (Username, Email, PasswordHash)
VALUES ('Roberto S', 'RS1940@example.com', 'ASFASHGSA');
