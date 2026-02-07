import { Controller, HttpStatus, Patch, Post, Req, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiResponseType } from 'src/shared/types/response.type';
import { Profile } from '@prisma/client';
import { AuthGuard } from 'src/shared/guards/auth.guard';
import { ReqUserType } from 'src/shared/types/req-user.type';

@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) { }

  @Post("upload-avatar")
  @UseGuards(AuthGuard)
  @UseInterceptors(FileInterceptor("file"))
  async UploadAvatar(@Req() req: ReqUserType, @UploadedFile() file: Express.Multer.File): Promise<ApiResponseType<Partial<Profile>>> {
    const result = await this.profileService.uploadAvatar({ userId: req.user.userId, file })
    return { message: "Avatar updated successfully", statusCode: HttpStatus.OK, data: result.data }
  }
}
