import "dotenv/config";
import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";
import { SeedCategories } from "./category.seed";

const prisma = new PrismaClient({
    adapter: new PrismaPg({
        connectionString: process.env.DATABASE_URL!,
    }),
});
async function main() {
    await SeedCategories(prisma);
}

main()
    .then(async () => {
        await prisma.$disconnect()
    }).catch(async (err) => {
        console.error(err)
        await prisma.$disconnect()
        process.exit(1)
    })