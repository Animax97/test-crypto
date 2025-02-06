import { Module } from '@nestjs/common';
import { QuoteService } from './quote.service';
import { QuoteController } from './quote.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { ApiCryptoService } from 'src/apis/api-crypto.service';
import { HttpModule } from '@nestjs/axios';

/**
 * The QuoteModule is responsible for managing the quote-related functionality
 * within the application. It imports the HttpModule to handle HTTP requests,
 * and provides the QuoteController, QuoteService, PrismaService, and ApiService
 * to manage and process quote data.
 *
 * @module QuoteModule
 */
@Module({
  imports: [HttpModule],
  controllers: [QuoteController],
  providers: [QuoteService, PrismaService, ApiCryptoService],
})
export class QuoteModule {}
