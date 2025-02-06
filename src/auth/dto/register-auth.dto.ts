import { IsEmail, IsNotEmpty, Matches, MinLength } from 'class-validator';
export class RegisterAuthDto {
  /**
   * The email address of the user.
   * This field is required and must be a valid email format.
   */
  @IsNotEmpty()
  @IsEmail()
  email: string;

  /**
   * The password for the user.
   * 
   * @type {string}
   * @decorator `@IsNotEmpty()` - Ensures the password is not empty.
   * @decorator `@MinLength(6, { message: 'Password must be at least 6 characters long' })` - Ensures the password is at least 8 characters long.
   * @decorator `@Matches(/^(?:(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).*)$/, { message: 'Password must contain at least one uppercase letter, one number, and one special character' })` - Ensures the password contains at least one uppercase letter, one number, and one special character.
   */
  @IsNotEmpty()
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  @Matches(/^(?:(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).*)$/, {
    message:
      'Password must contain at least one uppercase letter, one number, and one special character',
  })
  password: string;
}
