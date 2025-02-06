import { Controller, Post, Body } from '@nestjs/common';
import { RegisterAuthDto, LoginAuthDto } from './dto';
import { AuthService } from './auth.service';
import { Public } from 'src/common/decorators/public.decorator';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post('register')
  /**
   * Handles the registration of a new user.
   * 
   * @param {RegisterAuthDto} registerAuthDto - The data transfer object containing the registration details.
   * @returns {Promise<any>} The result of the registration process.
   */
  register(@Body() registerAuthDto: RegisterAuthDto) {
    return this.authService.createRegister(registerAuthDto);
  }

  @Public()
  @Post('login')
  /**
   * Handles the login request.
   * 
   * @param loginAuthDto - The data transfer object containing login credentials.
   * @returns A promise that resolves with the login response.
   */
  login(@Body() loginAuthDto: LoginAuthDto) {
    return this.authService.loginRegister(loginAuthDto);
  }
}
