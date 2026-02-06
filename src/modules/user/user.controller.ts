import { Controller, Get, HttpStatus, Req, UseGuards } from '@nestjs/common';
import { UserService } from './user.service';
import { AuthGuard } from 'src/shared/guards/auth.guard';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Get("session")
  @UseGuards(AuthGuard)
  async GetSession(@Req() req: { user: { userId: string } }) {
    const userId = req.user.userId
    const result = await this.userService.getSession({ userId })

    return { message: "Session retrieved successfully", statusCode: HttpStatus.OK, data: result.data }
  }
}
