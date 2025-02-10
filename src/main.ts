import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { ValidationPipe } from '@nestjs/common';

const configService = new ConfigService();
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: configService.get('CORS_PORT'), // Permite solo este dominio
    methods: 'GET,POST,PUT,DELETE',  // Métodos HTTP permitidos
    allowedHeaders: 'Content-Type, Authorization', // Headers permitidos
  })
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  await app.listen(configService.get('HTTP_PORT') ?? 4000);
}
bootstrap();
