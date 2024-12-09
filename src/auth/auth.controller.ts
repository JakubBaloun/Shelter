import { AuthService } from './auth.service';
import {
  Controller,
  Body,
  Post,
  HttpCode,
  HttpStatus,
  BadRequestException,
  Get,
  Request,
} from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/create-user.dto';
import { User } from 'src/users/schemas/user.schema';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @HttpCode(HttpStatus.OK)
  @Post('login')
  signIn(@Body() signInDto: Record<string, any>) {
    return this.authService.signIn(signInDto.email, signInDto.password);
  }

  @Post('register')
  async signUp(@Body() createUserDto: CreateUserDto): Promise<User> {
    try {
      return await this.authService.signUp(createUserDto);
    } catch {
      throw new BadRequestException();
    }
  }

  @Get('profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
