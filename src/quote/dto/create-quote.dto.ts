import { IsNotEmpty, IsNumber } from 'class-validator';
export class CreateQuoteDto {
    @IsNotEmpty()
    @IsNumber()
    amount: number;

    @IsNotEmpty()
    from: string;

    @IsNotEmpty()
    to: string;
}