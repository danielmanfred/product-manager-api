import { IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength, Min } from "class-validator";

export class CreateProductDto {
    @MaxLength(255)
    @IsString()
    @IsNotEmpty()
    name: string;

    @MaxLength(255)
    @IsString()
    @IsOptional()
    description: string | null;

    @IsNotEmpty()
    @IsNumber()
    price: number;
    
    @Min(1)
    @IsInt()
    @IsNotEmpty()
    category_id: number;
}
