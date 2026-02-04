import { IsNotEmpty, IsString, MinLength } from "class-validator"

export class LoginDto {
    @IsNotEmpty()
    @IsString()
    email: string

    @IsString()
    @MinLength(8)
    @IsNotEmpty()
    password: string
}