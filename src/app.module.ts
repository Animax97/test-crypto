import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import GlobalConfig from './config/global.config';
import { AuthGuard } from './common/guards/jwt.guard';
import { APP_GUARD } from '@nestjs/core';
import { JwtService } from './common/jwt/jwt.service';

@Module({
  imports: [...GlobalConfig, AuthModule],
  controllers: [AppController],
  providers: [AppService, JwtService, {
    provide: APP_GUARD,
    useClass: AuthGuard
  }],
})
export class AppModule {}
