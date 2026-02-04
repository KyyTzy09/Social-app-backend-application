import bcrypt from "bcrypt"

export async function HashText(raw: string): Promise<string> {
    var hashedRaw = await bcrypt.hash(raw, 10)

    return hashedRaw
}

export async function CompareText(rawText: string, hashedText: string): Promise<boolean> {
    var compare = await bcrypt.compare(rawText, hashedText)

    return compare
}