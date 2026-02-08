import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { UserGender } from "@prisma/client";

@Injectable()
export class ProfileRepository {
    constructor(private readonly prisma: PrismaService) { }

    async getProfile(userId: string) {
        return await this.prisma.profile.findUnique({
            where: {
                userId
            },
            include: {
                user: {
                    omit: {
                        userId: true,
                        password: true
                    }
                }
            }
        })
    }

    async updateProfile(userId: string, username: string, info: string, gender: UserGender, dateOfBirth: Date) {
        return await this.prisma.profile.update({
            where: {
                userId
            },
            data: {
                username,
                info,
                gender,
                dateOfBirth,
            }
        })
    }

    async updateAvatar(userId: string, avatarUrl: string) {
        return await this.prisma.profile.update({
            where: {
                userId
            },
            data: {
                avatar: avatarUrl
            },
            select: {
                userId: true,
                avatar: true
            }
        })
    }
}