# test-crypto
prueba con nestjs + prisma + postgresql

Empeze copiandome el proyecto en un repositorio privado

# Documentación del Proyecto NestJS con PostgreSQL y Prisma

## 1. Configuración de la Base de Datos con PostgreSQL y Prisma

### Tecnologías Utilizadas:
- PostgreSQL como motor de base de datos
- Prisma como ORM para interactuar con PostgreSQL

### Instalación de Dependencias:
```sh
npm i prisma --save --dev
npm i prisma @prisma/client
npm i jsonwebtoken para la autenticación de usuarios
npm i bcrypt para el encriptado
npm i @nestjs/config para la conexion con las variables de entorno
npm i @nestjs/axios para la conexion con apis externas
```

### Instalación de PostgreSQL:
Descargar e instalar PostgreSQL desde:  
[https://www.enterprisedb.com/downloads/postgres-postgresql-downloads](https://www.enterprisedb.com/downloads/postgres-postgresql-downloads)  
Luego, establecer conexión con DBeaver.

### Inicialización de Prisma en el Proyecto:
```sh
npx prisma init
```

### Definición de Modelos en Prisma:
- **User** -> Manejo de autenticación de usuarios
- **Quotation** -> Manejo de cotizaciones de criptomonedas

### Ejecución de Migraciones:
```sh
npx prisma migrate dev --name init
```

---

## 2. Configuración Global de Variables de Entorno
Referencia: [NestJS Configuration](https://docs.nestjs.com/techniques/configuration)

---

### Configuración y Generación:
Uso de **GlobalConfig** y **PrismaService**.

## 3. Creación de un Helper para Manejo de Respuestas
Se implementó un helper para manejar respuestas de éxito o error.

---

## 4. Creación del Módulo de Autenticación (Auth)

### Generación del Recurso:
```sh
nest g resource auth
```

### Controlador (AuthController):
- **POST /auth/register** -> Registro de usuario
- **POST /auth/login** -> Autenticación de usuario  

Validación de entrada de datos con:
```sh
npm install class-validator class-transformer
```
Se agrego en la carpeta dto diferentes clases con validaciones para agregar el tipado en auth.controller y auth.service
- index.ts
- register-auth.dto.ts
- login-auth.dto.ts

### EP /auth/register:
Parametros que requiere el body:
- email -> string tiene validación para que revise que se este mandando en formato email
- password -> string tiene validación el cual te pide tener mas de 6 caracteres minimo 1 mayús 1 minús 1 núm y 1 caracter especial

### EP /auth/login:
Parametros que requiere el body:
- email -> string
- password -> string

### Service (AuthService):
Instalación de dependencias para autenticación:
```sh
npm install jsonwebtoken bcrypt
```
Referencias:  
- [bcrypt](https://www.npmjs.com/package/bcrypt)  
- [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken)  

---

## Creación de Servicio para el Manejo de JWT
Se implementó JwtService para manejar mejor las funciones de jwt provenientes de la importación de jsonwebtoken.

---