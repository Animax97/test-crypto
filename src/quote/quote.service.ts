import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateQuoteDto } from '../quote/dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { ApiCryptoService } from 'src/apis/api-crypto.service';
import { resError } from 'src/common/helpers/msg.helper';

@Injectable()
export class QuoteService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly apiCryptoService: ApiCryptoService,
  ) {}
  /**
   * Creates a new quote based on the provided data.
   * 
   * @param {CreateQuoteDto} quoteCreateDto - The data transfer object containing the details for the quote creation.
   * @returns {Promise<Quotation>} - A promise that resolves to the created quote.
   * @throws {InternalServerErrorException} - Throws an internal server error exception if the quote creation fails.
   */
  async createQuote(quoteCreateDto: CreateQuoteDto) {
    const { from, to, amount } = quoteCreateDto;

    const contador = () => {
      const date = new Date();
      date.setMinutes(date.getMinutes() + 5);
      return date;
    };
    try {
      const fromQuote = await this.apiCryptoService.getData(from, to);
      const rate = fromQuote[`${from}`].price;
      let quote = await this.prisma.quotation.create({
        data: {
          amount: amount,
          from: from,
          to: to,
          rate: rate,
          convertAmount: `${rate * amount}`,
          expiresAt: contador(),
        },
      });

      return quote;
    } catch (error) {
      console.error(error)
      throw new InternalServerErrorException(resError.INTERNAL_ERROR);
    }
  }

  /**
   * Finds a single quote by its ID if it has not expired.
   *
   * @param {string} id - The ID of the quote to find.
   * @returns {Promise<Quotation>} The found quote.
   * @throws {NotFoundException} If no quote is found or if the quote has expired.
   */
  async findOneQuote(id: string) {
    let quote = await this.prisma.quotation.findUnique({
      where: {
        id: id,
        expiresAt: {
          gt: new Date(),
        },
      },
    });

    if (!quote) {
      throw new NotFoundException(resError.NOT_FOUND);
    }

    return quote;
  }
}
