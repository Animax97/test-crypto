import { IsEmail, IsNotEmpty, Matches, MinLength } from 'class-validator';
export class RegisterAuthDto {
  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @MinLength(6, { message: 'Password must be at least 8 characters long' })
  @Matches(/^(?=.[A-Z])(?=.\d)(?=.[!@#$%^&()_\-+=~`{}[\]:;"'<>,.?/|\\]).*$/, {
    message:
      'Password must contain at least one uppercase letter, one number, and one special character',
  })
  password: string;
}
