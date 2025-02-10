# 🚀 Levantar la Aplicación NestJS

## 🔥 Ejecutar el Servidor

Para iniciar el servidor en modo *desarrollo*, ejecuta:

sh
npm run start:dev


Para correr en *producción*:

sh
npm run start


## 🌍 Probar la Aplicación

Por defecto, la aplicación estará disponible en:

sh
http://localhost:4000


---

## Variables de Entorno:

- DATABASE_URL=   enlace para completar esta variable: https://www.prisma.io/docs/orm/overview/databases/postgresql#connection-url
- API_CRYPTO_QUOTE= aqui el link de la variable crypto
- HTTP_PORT= este suele ser 4000
- SECRET_KEY= este es uno inventado ej secret21r$&$
- EXPIRE_KEY= este es un para indicar la expiración ej: '2d'
- POSTGRES_HOST= este va acorde al que se suele usar en DATABASE_URL
- POSTGRES_PORT= este va acorde al que se suele usar en DATABASE_URL
- POSTGRES_USER= este va acorde al que se suele usar en DATABASE_URL
- POSTGRES_PASS= este va acorde al que se suele usar en DATABASE_URL
- POSTGRES_DB= este va acorde al que se suele usar en DATABASE_URL

## Levantar Servidor de Postgresql
- instalar postgresql del siguiente enlace para windows: [https://www.enterprisedb.com/downloads/postgres-postgresql-downloads](https://www.enterprisedb.com/downloads/postgres-postgresql-downloads) .
- configurarlo con una pass, host, port y user que va a ser la misma que usaras en la variable de entorno.
- teniendo un gestor de base de datos como dbeaver establecer una conexión con la misma configuración que se uso para la instalación anterior.

## 📦 Dependencias Instaladas en el Proyecto

### 🛢 Prisma y PostgreSQL
- @prisma/client
- prisma

### ✅ Validación de Datos
- class-validator
- class-transformer

### 🔒 Autenticación y Seguridad
- jsonwebtoken
- bcrypt

### 🌐 Consumo de APIs Externas y variables de entorno
- @nestjs/axios
- @nestjs/config
- rxjs

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
La respuesta que devuelve el EP es un token el cual luego se debe usar en la sección authorization dentro de postman pero antes debe seleccionar el auth type y elegir la opción *Bearer Token* luego al ejecutar los demás EP fuera del *login* y *register* ya no tendra problemas de autorización.

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

## 5. Implementación Global de AuthGuard
Protección global de rutas con JWT.  
Para rutas públicas, se creó el decorador `@Public`.  
Referencia: [NestJS Guards](https://docs.nestjs.com/guards)
y complemente la implementación con ayuda de chatgpt

---

## 6. Creación del Servicio ApiCryptoService para Consumir la API Externa

### Generación del Servicio:
```sh
nest g service apis
```

### Dependencia usada:
```sh
npm install @nestjs/axios
```

### Referencias:
- [firstValueFrom (RxJS)](https://rxjs.dev/api/index/function/firstValueFrom)  
- [NestJS HTTP Module](https://docs.nestjs.com/techniques/http-module)  

---

## 7. Creación del Módulo Quote para Cotizaciones

### Generación del Recurso:
```sh
nest g resource quote
```

### Endpoints:
- **POST /quote** -> Obtener una cotización de la api externa y guardarla en mi Base de Datos
- **GET /quote/:id** -> Obtener una cotización por ID de mi Base de Datos

### EP /quote:
Parametros que requiere el body:
- ammount -> number Requerido
- from -> string Requerido
- to -> string Requerido

### EP /quote/:id:
Parametros que requiere por param:
- id -> string

### Configuración:
Uso de **ApiCryptoService**.

la mayoria de la documentación dentro del código fue hecha con copilot

solo por poner un ejemplo las de este tipo:
/**
   * Creates a new quote based on the provided data.
   * 
   * @param {CreateQuoteDto} quoteCreateDto - The data transfer object containing the details for the quote creation.
   * @returns {Promise<Quotation>} - A promise that resolves to the created quote.
   * @throws {InternalServerErrorException} - Throws an internal server error exception if the quote creation fails.
   */

PDA: las columnas *rate* y *convertAmount* se crearon con tipo de dato string porque si se hacia con decimal no mostraba todos los digitos convirtiendo la respuesta con Exponencial.

## Adicional
- se habilito el cors con su configuración para que permita al front acceder a la api