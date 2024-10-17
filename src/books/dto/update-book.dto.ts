import { IsInt, IsOptional, IsString } from "class-validator";

export class UpdateBookDto {
    @IsOptional()
    @IsString()
    title?: string;

    @IsOptional()
    @IsString()
    author?: string;

    @IsOptional()
    @IsInt({ message: 'Year must be a number' })
    year?: number;

    @IsOptional()
    @IsString()
    genre?: string;
}