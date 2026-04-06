import { Body, Controller, Get, HttpCode, HttpStatus, Post, Req, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from 'src/shared/guards/auth.guard';
import { ReqUserType } from 'src/shared/types/req-user.type';
import { User } from '@prisma/client';
import { ApiResponseType } from 'src/shared/types/response.type';
import { CreateUserInterestDto } from './dto/createUserInterest.dto';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Get("/")
  @UseGuards(AuthGuard)
  async GetAllUsers(): Promise<ApiResponseType<Partial<User>[]>> {
    const result = await this.userService.getAllUsers()

    return { message: "Users retrieved successfully", statusCode: HttpStatus.OK, data: result.data }
  }

  @Get("session")
  @UseGuards(AuthGuard)
  async GetSession(@Req() req: ReqUserType): Promise<ApiResponseType<Partial<User>>> {
    const userId = req.user.userId
    const result = await this.userService.getSession({ userId })

    return { message: "Session retrieved successfully", statusCode: HttpStatus.OK, data: result.data }
  }

  @Post("user-interest")
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.CREATED)
  async CreateUserInterest(@Req() req: ReqUserType, @Body() dto: CreateUserInterestDto) {
    const result = await this.userService.createUserInterest({ userId: req.user.userId, categoriesId: dto.categoriesId })
    return { message: "UserInterest created successfully", statusCode: HttpStatus.CREATED, created: result.data.count }
  }
}
