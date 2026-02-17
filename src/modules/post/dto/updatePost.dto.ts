import { IsNotEmpty, IsOptional, IsString, MinLength } from "class-validator"

export class UpdatePostDto {
    @IsOptional()
    userId: string
    
    @IsOptional()
    postId: string

    @IsString()
    @IsNotEmpty()
    @MinLength(3)
    title: string

    @IsString()
    @IsOptional()
    description: string
}