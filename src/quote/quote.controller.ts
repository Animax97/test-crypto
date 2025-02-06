import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { QuoteService } from './quote.service';
import { CreateQuoteDto } from './dto';

@Controller('quote')
export class QuoteController {
  constructor(private readonly quoteService: QuoteService) {}

  @Post()
  create(@Body() createQuoteDto: CreateQuoteDto) {
    return this.quoteService.createQuote(createQuoteDto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.quoteService.findOneQuote(id);
  }
}
