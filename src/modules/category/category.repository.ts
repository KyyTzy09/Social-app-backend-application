import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class CategoryRepository {
    constructor(private readonly prisma: PrismaService) { }

    async count() {
        return await this.prisma.category.count()
    }

    async findAll() {
        return await this.prisma.category.findMany()
    }

    async findAllWithPagination(skip: number, limit: number) {
        return this.prisma.category.findMany({
            skip,
            include: {
                _count: {
                    select: {
                        postCategories: true
                    }
                }
            },
            take: limit
        })
    }

    async findPostCategoriesByPostsId(postIds: string[]) {
        return await this.prisma.postCategory.findMany({
            where: {
                postId: {
                    in: postIds
                }
            },
            include: {
                category: true,
            }
        })
    }

    async findAllByIds(ids: string[]) {
        return await this.prisma.category.findMany({
            where: {
                categoryId: {
                    in: ids
                }
            }
        })
    }

    async createPostCategories(postId: string, categoriesId: string[]) {
        return await this.prisma.postCategory.createMany({
            data: categoriesId.map((id) => ({
                categoryId: id,
                postId
            })),
            skipDuplicates: true
        })
    }
}