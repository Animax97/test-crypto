import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import GlobalConfig from './config/global.config';

@Module({
  imports: [...GlobalConfig],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
