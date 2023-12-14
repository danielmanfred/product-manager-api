import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNotEmpty, IsNumber, IsString, MaxLength, Min } from "class-validator";

export class CreateProductDto {
    @ApiProperty()
    @MaxLength(255)
    @IsString()
    @IsNotEmpty()
    name: string;

    @ApiProperty({ type: 'string' })
    @MaxLength(255)
    @IsString()
    description: string | null;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    price: number;

    @ApiProperty()
    @Min(1)
    @IsInt()
    @IsNotEmpty()
    category_id: number;
}
