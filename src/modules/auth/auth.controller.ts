import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post("register")
  @HttpCode(HttpStatus.CREATED)
  async Login(@Body() dto: RegisterDto) {
    var result = await this.authService.Register(dto)
    return { message: "User successfully registered", statusCode: HttpStatus.CREATED, data: result.data }
  }
}
