import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs'; // Para convertir Observable en Promesa
import { ConfigService } from '@nestjs/config';

@Injectable()
export class ApiCryptoService {
  constructor(private readonly httpService: HttpService, private readonly configService: ConfigService) {}

  /**
   * Fetches cryptocurrency exchange rate data from an external API.
   *
   * @param {string} from - The source cryptocurrency symbol.
   * @param {string} to - The target cryptocurrency symbol.
   * @returns {Promise<any>} A promise that resolves to the exchange rate data.
   * @throws {Error} If the HTTP request fails.
   */
  async getData(from: string, to: string) {
    const url = this.configService.get('API_CRYPTO_QUOTE');
    const { data } = await firstValueFrom(this.httpService.get(url+`rate?from=${from}&to=${to}`)); // Convierte Observable en Promesa
    return data; 
  }
}

