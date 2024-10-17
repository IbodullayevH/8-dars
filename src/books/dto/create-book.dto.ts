import { IsInt, IsNotEmpty, IsString } from "class-validator";

export class CreateBookDto {
    @IsNotEmpty({ message: 'Title is required' })
    @IsString()
    title: string;

    @IsNotEmpty({ message: 'Author is required' })
    @IsString()
    author: string;

    @IsNotEmpty({ message: 'Year is required' })
    @IsInt({ message: 'Year must be a number' })
    year: number;

    @IsNotEmpty({ message: 'Genre is required' })
    @IsString()
    genre: string;
}
