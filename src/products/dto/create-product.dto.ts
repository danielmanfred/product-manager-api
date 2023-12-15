import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNotEmpty, IsNumber, IsString, MaxLength, Min } from "class-validator";

export class CreateProductDto {
    @ApiProperty({ example: 'Product Name' })
    @MaxLength(255)
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({ 
        type: 'string',
        example: 'Product description'
    })
    @MaxLength(255)
    @IsString()
    description: string | null;

    @ApiProperty({ example: 3500 })
    @IsNotEmpty()
    @IsNumber()
    price: number;

    @ApiProperty({ example: 1 })
    @Min(1)
    @IsInt()
    @IsNotEmpty()
    category_id: number;
}
