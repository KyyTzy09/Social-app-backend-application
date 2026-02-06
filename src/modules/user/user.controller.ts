import { Controller, Get, HttpStatus, Req, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from 'src/shared/guards/auth.guard';
import { ReqUserType } from 'src/shared/types/req-user.type';
import { User } from '@prisma/client';
import { ApiResponseType } from 'src/shared/types/response.type';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Get("session")
  @UseGuards(AuthGuard)
  async GetSession(@Req() req: ReqUserType): Promise<ApiResponseType<Partial<User>>> {
    const userId = req.user.userId
    const result = await this.userService.getSession({ userId })

    return { message: "Session retrieved successfully", statusCode: HttpStatus.OK, data: result.data }
  }
}
