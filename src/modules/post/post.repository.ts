import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class PostRepository {
    constructor(private readonly prisma: PrismaService) { }

    async getAll() {
        return await this.prisma.post.findMany({
            select: {
                postId: true,
                title: true,
                description: true,
                contentUrl: true,
                postedAt: true,
                editedAt: true,
                sender: {
                    omit: {
                        password: true,
                        createdAt: true,
                        updatedAt: true
                    }
                }
            },
            orderBy: {
                postedAt: "desc"
            }
        })
    }

    async getUserPost(userId: string) {
        return await this.prisma.post.findMany({
            where: {
                senderId: userId
            },
            select: {
                postId: true,
                title: true,
                description: true,
                contentUrl: true,
                postedAt: true,
                editedAt: true,
                sender: {
                    omit: {
                        password: true,
                        createdAt: true,
                        updatedAt: true
                    }
                }
            },
            orderBy: {
                postedAt: "desc"
            }
        })
    }

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