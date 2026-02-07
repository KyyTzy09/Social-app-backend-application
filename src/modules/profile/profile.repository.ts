import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class ProfileRepository {
    constructor(private readonly prisma: PrismaService) { }

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