import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class PostRepository {
    constructor(private readonly prisma: PrismaService) { }

    async getById(postId: string) {
        return await this.prisma.post.findUnique({
            where: {
                postId
            }
        })
    }

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

    async getAllPostWithPagination(take: number, skip: number) {
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
            take,
            skip,
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

    async updatePost(postId: string, title: string, description: string) {
        return await this.prisma.post.update({
            where: {
                postId
            },
            data: {
                title,
                description
            }
        })
    }

    async deleteById(postId: string) {
        return await this.prisma.post.delete({
            where: {
                postId
            }
        })
    }
}