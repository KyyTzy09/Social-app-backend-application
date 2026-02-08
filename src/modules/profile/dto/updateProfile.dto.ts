import { UserGender } from "@prisma/client";
import { IsDateString, IsEnum, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class UpdateProfileDto {
    @IsOptional()
    @IsString()
    userId: string

    @IsString()
    @IsNotEmpty()
    username: string

    @IsString()
    @IsOptional()
    info: string

    @IsString()
    @IsEnum({ MAN: "MAN", WOMAN: "WOMAN", OTHER: "OTHER" })
    gender: UserGender

    @IsDateString()
    @IsOptional()
    dateOfBirth: Date
}