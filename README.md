# Tasks API – Backend Test con NestJS

![NestJS](https://img.shields.io/badge/NestJS-backend-red)
![TypeScript](https://img.shields.io/badge/TypeScript-language-blue)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-database-blue)
![Jest](https://img.shields.io/badge/Jest-testing-green)

## Descripción

Este proyecto es una API REST desarrollada con NestJS para la gestión de tareas.

Permite crear, listar, actualizar y eliminar tareas almacenadas en una base de datos PostgreSQL utilizando TypeORM.

El proyecto sigue una arquitectura modular recomendada por NestJS e incluye validación de datos, filtros y pruebas unitarias.

---

# Tecnologías utilizadas

- NestJS
- TypeScript
- PostgreSQL
- TypeORM
- class-validator
- Jest

---

# Instalación

## 1. Clonar el repositorio

git clone <repository-url>  
cd tasks-api  

## 2. Instalar dependencias

npm install

---

# Variables de entorno

Crear un archivo `.env` en la raíz del proyecto basado en `.env.example`.

Ejemplo:

DB_HOST=localhost  
DB_PORT=5432  
DB_USER=postgres  
DB_PASSWORD=tu_password  
DB_NAME=tasksdb  
PORT=3000  

Asegúrate de que PostgreSQL esté ejecutándose y que la base de datos exista.

---

# Ejecutar la aplicación

Modo desarrollo:

npm run start:dev

La API estará disponible en:

http://localhost:3000

---

# Endpoints de la API

## Crear tarea

POST /tasks

Ejemplo de body:

{
  "title": "Terminar proyecto",
  "description": "Completar test backend",
  "priority": "high"
}

---

## Obtener todas las tareas

GET /tasks

Se pueden usar filtros opcionales:

/tasks?status=pending  
/tasks?priority=high  

---

## Obtener una tarea por ID

GET /tasks/:id

---

## Actualizar una tarea

PATCH /tasks/:id

Ejemplo de body:

{
  "title": "Título actualizado"
}

---

## Actualizar estado de una tarea

PATCH /tasks/:id/status

Ejemplo de body:

{
  "status": "done"
}

---

## Eliminar tarea

DELETE /tasks/:id

---

# Ejecutar pruebas

Las pruebas están implementadas usando Jest.

Para ejecutarlas:

npm run test

---

# Estructura del proyecto

src
 ├ tasks
 │  ├ dto
 │  │  ├ create-task.dto.ts
 │  │  ├ update-task.dto.ts
 │  │  └ update-status.dto.ts
 │  ├ entities
 │  │  └ task.entity.ts
 │  ├ tasks.controller.ts
 │  ├ tasks.controller.spec.ts
 │  ├ tasks.service.ts
 │- test
    └ tasks.service.spec.ts

---

# Funcionalidades

- CRUD completo de tareas
- Filtros por estado y prioridad
- Validación de datos mediante DTOs
- Persistencia en PostgreSQL
- Arquitectura modular con NestJS
- Tests unitarios con Jest

---

# Archivos adicionales

answers.md  
Contiene las respuestas a las preguntas teóricas del test.

architecture.md  
Describe cómo escalar el sistema, manejar autenticación y procesamiento asincrónico.

---

# Autor

Pedro Basualto  
Backend test desarrollado utilizando NestJS.
