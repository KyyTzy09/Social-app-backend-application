import { Body, Controller, HttpCode, HttpStatus, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { ApiResponseType } from 'src/shared/types/response.type';
import { User } from '@prisma/client';
import { Response } from 'express';

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
  @HttpCode(HttpStatus.OK)
  async Login(@Body() dto: LoginDto, @Res({ passthrough: true }) res: Response): Promise<{ message: string, statusCode: number, accessToken: string }> {
    const result = await this.authService.Login(dto)
    res.cookie("accessToken", result.accessToken, {
      httpOnly: true,
      path: "/",
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      maxAge: 24 * 60 * 60 * 1000
    })

    return { message: "Login successfully", statusCode: HttpStatus.OK, accessToken: result.accessToken }
  }
}
