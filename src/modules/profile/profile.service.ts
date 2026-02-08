import { Injectable, NotFoundException } from '@nestjs/common';
import { ProfileRepository } from './profile.repository';
import { UserRepository } from '../user/user.repository';
import { uploadAvatarDto } from './dto/uploadAvatar.dto';
import { MinioService } from '../minio/minio.service';
import { GetUserProfileDto } from './dto/getUserProfile.dto';
import { UpdateProfileDto } from './dto/updateProfile.dto';

@Injectable()
export class ProfileService {
    constructor(private readonly profileRepo: ProfileRepository, private readonly userRepo: UserRepository, private minioService: MinioService) { }

    private async checkProfile(userId: string) {
        const existingProfile = await this.profileRepo.getProfile(userId)
        if (!existingProfile) throw new NotFoundException("Profile not found")

        return existingProfile
    }

    async getUserProfile(dto: GetUserProfileDto) {
        const existingProfile = await this.checkProfile(dto.userId)
        return { data: existingProfile };
    }

    async updateProfile(dto: UpdateProfileDto) {
        await this.checkProfile(dto.userId)

        const updatedProfile = await this.profileRepo.updateProfile(dto.userId, dto.username, dto.info, dto.gender, dto.dateOfBirth)
        return { data: updatedProfile }
    }

    async uploadAvatar(dto: uploadAvatarDto) {
        const existingUser = await this.userRepo.findById(dto.userId)
        if (!existingUser) throw new NotFoundException("User not found")

        const avatarUrl = await this.minioService.Uploader({ file: dto.file, directory: "avatar" })
        const updatedAvatar = await this.profileRepo.updateAvatar(dto.userId, avatarUrl)
        return { data: updatedAvatar }
    }
}
