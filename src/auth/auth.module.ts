import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { JwtService } from 'src/common/jwt/jwt.service';

/**
 * The AuthModule is responsible for handling authentication-related functionality.
 * It imports and provides the necessary services and controllers for authentication.
 *
 * @module AuthModule
 * @controller AuthController - Handles incoming authentication requests.
 * @provider AuthService - Contains the business logic for authentication.
 * @provider PrismaService - Provides database access and operations.
 * @provider JwtService - Handles JWT token creation and validation.
 */
@Module({
  controllers: [AuthController],
  providers: [AuthService, PrismaService, JwtService],
})
export class AuthModule {}
