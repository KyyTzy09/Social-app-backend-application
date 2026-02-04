import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';
import { PrismaPg } from '@prisma/adapter-pg';
import { PrismaClient } from "@prisma/client"

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
    constructor() {
        super({ adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL }) })
    }

    async onModuleInit() {
        console.log("DB connected")
        await this.$connect()
    }

    async onModuleDestroy() {
        console.log("DB disconnected")
        await this.$disconnect()
    }
}