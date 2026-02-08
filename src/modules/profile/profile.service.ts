import { Injectable, NotFoundException } from '@nestjs/common';
import { ProfileRepository } from './profile.repository';
import { UserRepository } from '../user/user.repository';
import { uploadAvatarDto } from './dto/uploadAvatar.dto';
import { MinioService } from '../minio/minio.service';
import { GetUserProfileDto } from './dto/getUserProfile.dto';

@Injectable()
export class ProfileService {
    constructor(private readonly profileRepo: ProfileRepository, private readonly userRepo: UserRepository, private minioService: MinioService) { }

    async getUserProfile(dto: GetUserProfileDto) {
        const existingProfile = await this.profileRepo.getProfile(dto.userId)
        if (!existingProfile) throw new NotFoundException("Profile not found")

        return { data: existingProfile };
    }

    async uploadAvatar(dto: uploadAvatarDto) {
        const existingUser = await this.userRepo.findById(dto.userId)
        if (!existingUser) throw new NotFoundException("User not found")

        const avatarUrl = await this.minioService.Uploader({ file: dto.file, directory: "avatar" })
        const updatedAvatar = await this.profileRepo.updateAvatar(dto.userId, avatarUrl)
        return { data: updatedAvatar }
    }
}
