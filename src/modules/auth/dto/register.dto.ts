import { UserGender } from "@prisma/client";
import { IsDateString, IsEmail, IsEnum, IsOptional, MinLength } from "class-validator";
import { IsNotEmpty, IsString } from "class-validator";

export class RegisterDto {
    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    fullName: string

    @IsNotEmpty()
    @IsString()
    @IsEmail()
    email: string

    @IsString()
    @MinLength(8)
    @IsNotEmpty()
    password: string

    @IsString()
    @IsEnum({ MAN: "MAN", WOMAN: "WOMAN", OTHER: "OTHER" })
    gender: UserGender

    @IsDateString()
    @IsOptional()
    dateOfBirth: Date
}