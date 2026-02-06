import { IsNotEmpty, IsString } from "class-validator";

export class GetSessionDto {
    @IsString()
    @IsNotEmpty()
    userId: string
}