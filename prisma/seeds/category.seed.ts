import { Category, PrismaClient } from "@prisma/client";

export async function SeedCategories(prisma: PrismaClient) {
    const SEED_CATEGORIES = [
        "Teknologi",
        "Gaming",
        "Anime & Manga",
        "Film & Series",
        "Musik",
        "Edukasi",
        "Olahraga",
        "Seni & Desain",
        "Fotografi & Videografi",
        "Komedi",
        "Lifestyle",
        "Travel",
        "Kuliner",
        "Kesehatan & Fitness",
        "Bisnis & Keuangan",
        "Motivasi & Self Improvement",
        "Sains",
        "Otomotif",
    ]

    await prisma.category.createMany({
        data: SEED_CATEGORIES.map((v) => {
            return {
                name: v
            }
        }),
        skipDuplicates: true
    })
}