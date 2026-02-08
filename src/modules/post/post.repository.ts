import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class PostRepository {
    constructor(private readonly prisma: PrismaService) { }

    async createPost(userId: string, title: string, description: string, contentUrl: string) {
        return await this.prisma.post.create({
            data: {
                senderId: userId,
                title,
                description,
                contentUrl
            }
        })
    }
}