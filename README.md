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