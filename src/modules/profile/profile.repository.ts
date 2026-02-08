import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";

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