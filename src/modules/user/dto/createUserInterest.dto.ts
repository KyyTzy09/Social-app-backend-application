import { IsArray, IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator";

export class CreateUserInterestDto {
    @IsString()
    @IsOptional()
    userId: string

    @IsArray()
    @IsNotEmpty()
    categoriesId: string[]
}