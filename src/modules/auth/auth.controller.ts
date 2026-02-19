import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { ApiResponseType } from 'src/shared/types/response.type';
import { User } from '@prisma/client';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post("register")
  @HttpCode(HttpStatus.CREATED)
  async Register(@Body() dto: RegisterDto): Promise<ApiResponseType<User>> {
    const result = await this.authService.Register(dto)
    return { message: "User successfully registered", statusCode: HttpStatus.CREATED, data: result.data }
  }

  @Post("login")
  async Login(@Body() dto: LoginDto): Promise<{ message: string, statusCode: number, accessToken: string }> {
    const result = await this.authService.Login(dto)
    return { message: "Login successfully", statusCode: HttpStatus.OK, accessToken: result.accessToken }
  }
}
