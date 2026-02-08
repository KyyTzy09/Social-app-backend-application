import { IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator";

export class CreatePostDto {
    @IsString()
    @IsOptional()
    userId: string

    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    title: string

    @IsString()
    @IsOptional()
    description: string

    @IsOptional()
    content: Express.Multer.File
}