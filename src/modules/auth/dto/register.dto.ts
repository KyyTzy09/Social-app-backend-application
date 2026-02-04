import { MinLength } from "class-validator";
import { IsNotEmpty, IsString } from "class-validator";

export class RegisterDto {
    @IsNotEmpty()
    @IsString()
    @MinLength(3)
    fullName: string

    @IsNotEmpty()
    @IsString()
    email: string

    @IsString()
    @MinLength(8)
    @IsNotEmpty()
    password: string
}