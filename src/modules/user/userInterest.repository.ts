import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";

@Injectable()
export class UserInterestRepository {
    constructor(private readonly prisma: PrismaService) { }

    async createMany(userId: string, categoriesIds: string[]) {
        return await this.prisma.userInterest.createMany({
            data: categoriesIds.map((v) => ({
                categoryId: v,
                userId,
                score: 0.2
            })),
            skipDuplicates: true
        })
    }
}