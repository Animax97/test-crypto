import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { RegisterAuthDto, LoginAuthDto } from './dto';
import { PrismaService } from 'src/prisma/prisma.service';
import bcrypt from 'bcrypt';
import { resError, resSuccess } from 'src/common/helpers/msg.helper';
import { JwtService } from 'src/common/jwt/jwt.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwtService: JwtService
  ) {}
  /**
   * Registers a new user with the provided email and password.
   * 
   * @param {RegisterAuthDto} registerAuthDto - The data transfer object containing the user's registration details.
   * @returns {Promise<string>} - A promise that resolves to a success message indicating the user was created.
   * @throws {BadRequestException} - Throws an exception if there is an error during the registration process.
   */
  async createRegister(registerAuthDto: RegisterAuthDto) {
    const { email, password } = registerAuthDto;

    try {
      const hashedPassword = await bcrypt.hash(password, 10);

      await this.prisma.user.create({
        data: {
          email: email,
          password: hashedPassword,
        },
      });
      return resSuccess.userCreated;
    } catch (error) {
      throw new BadRequestException(resError.BAD_REQUEST_ERROR);
    }
  }

  /**
   * Authenticates a user by their email and password. If the user is found and the password matches,
   * a JWT token is generated and returned.
   *
   * @param {LoginAuthDto} loginAuthDto - The login credentials containing email and password.
   * @returns {Promise<string>} - A promise that resolves to a JWT token if authentication is successful.
   * @throws {NotFoundException} - If the user with the given email is not found.
   * @throws {Error} - If the provided password is incorrect.
   * @throws {BadRequestException} - If any other error occurs during the process.
   */
  async loginRegister(loginAuthDto: LoginAuthDto) {
    const { email, password } = loginAuthDto;
    try {
      const user = await this.prisma.user.findUnique({
        where: {
          email: email,
        },
      });
      
      if (!user) {
        throw new NotFoundException(resError.NOT_FOUND);
      }
      const hashedPassword = await bcrypt.compare(password, user.password);
      if (!hashedPassword) {
        throw new Error(resError.PASSWORD_INCORRECT);
      }

      const token = this.jwtService.sign({ id: user.id, email: user.email });

      return token;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}