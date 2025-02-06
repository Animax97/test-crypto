import jwt from 'jsonwebtoken';
import { ConfigService } from '@nestjs/config';
import { SignUserDto } from './dto/sign-dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtService {
    constructor(
        private readonly configService: ConfigService
      ) {}
  sign(payload: SignUserDto) {
    return jwt.sign(payload, this.configService.get('SECRET_KEY'), {
      expiresIn: '2h',
    });
  }
  verify(token: string) {
    return jwt.verify(token,this.configService.get('SECRET_KEY'));
  }
}