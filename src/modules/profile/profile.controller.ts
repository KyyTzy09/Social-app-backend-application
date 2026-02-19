import { Body, Controller, Get, HttpStatus, Patch, Post, Req, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiResponseType } from 'src/shared/types/response.type';
import { Profile } from '@prisma/client';
import { AuthGuard } from 'src/shared/guards/auth.guard';
import { ReqUserType } from 'src/shared/types/req-user.type';
import { UpdateProfileDto } from './dto/updateProfile.dto';

@Controller('profile')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) { }

  @Get("/")
  @UseGuards(AuthGuard)
  async GetUserProfile(@Req() req: ReqUserType): Promise<ApiResponseType<Profile>> {
    const result = await this.profileService.getUserProfile({ userId: req.user.userId })
    return { message: "Profile retrieved successfully", statusCode: HttpStatus.OK, data: result.data }
  }

  @Patch("/")
  @UseGuards(AuthGuard)
  async UpdateProfile(@Req() req: ReqUserType, @Body() dto: UpdateProfileDto): Promise<ApiResponseType<Partial<Profile>>> {
    const result = await this.profileService.updateProfile({ userId: req.user.userId, username: dto.username, info: dto.info, dateOfBirth: dto.dateOfBirth, gender: dto.gender })
    return { message: "Profile updated successfully", statusCode: HttpStatus.OK, data: result.data }
  }

  @Post("upload-avatar")
  @UseGuards(AuthGuard)
  @UseInterceptors(FileInterceptor("file"))
  async UploadAvatar(@Req() req: ReqUserType, @UploadedFile() file: Express.Multer.File): Promise<ApiResponseType<Partial<Profile>>> {
    const result = await this.profileService.uploadAvatar({ userId: req.user.userId, file })
    return { message: "Avatar updated successfully", statusCode: HttpStatus.OK, data: result.data }
  }
}