import { sign, verify } from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';
import { SignUserDto } from './dto/sign-dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtService {
    constructor(
        private readonly configService: ConfigService
      ) {}
  /**
   * Generates a JWT signature for the given payload.
   *
   * @param payload - The user data to be signed into the JWT.
   * @returns The signed JWT token.
   */
  signature(payload: SignUserDto) {
    return sign(payload, this.configService.get('SECRET_KEY'), {
      expiresIn: '2h',
    });
  }
  /**
   * Verifies the given JWT token using the secret key from the configuration service.
   *
   * @param {string} token - The JWT token to verify.
   * @returns {any} The decoded token if verification is successful.
   * @throws {Error} If the token is invalid or verification fails.
   */
  verify(token: string) {
    return verify(token, this.configService.get('SECRET_KEY'));
  }
}