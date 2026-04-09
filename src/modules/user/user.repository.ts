import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { UserGender } from "@prisma/client";

@Injectable()
export class UserRepository {
    constructor(private readonly prisma: PrismaService) { }

    async findAll() {
        return await this.prisma.user.findMany({
            omit: {
                password: true
            },
            include: {
                profile: {
                    omit: {
                        userId: true
                    }
                }
            },
            orderBy: {
                fullName: "desc",
            }
        })
    }

    async findById(userId: string) {
        return await this.prisma.user.findUnique({
            where: {
                userId
            },
            include: {
                profile: {
                    omit: {
                        userId: true
                    }
                }
            },
            omit: {
                password: true
            }
        })
    }

    async findByEmail(email: string) {
        return await this.prisma.user.findUnique({
            where: {
                email
            },
            select: {
                userId: true,
                email: true,
                password: true
            }
        })
    }

    async createUser(fullName: string, email: string, password: string) {
        return await this.prisma.user.create({
            data: {
                fullName,
                email,
                password,
            }
        })
    }

    async upsertUser(fullName: string, email: string, avatar: string) {
        return await this.prisma.user.upsert({
            where: {
                email,
            },
            create: {
                email,
                fullName,
                profile: {
                    create: {
                        avatar,
                        username: fullName
                    }
                }
            },
            update: {
                email,
                fullName,
                profile: {
                    update: {
                        avatar,
                        username: fullName
                    }
                }
            }
        })
    }

    async createUserWithProfile(fullName: string, email: string, password: string, dob: Date, gender: UserGender) {
        return await this.prisma.user.create({
            data: {
                fullName,
                email,
                password,
                profile: {
                    create: {
                        username: fullName,
                        gender,
                        dateOfBirth: dob,
                    }
                }
            }
        })
    }
}