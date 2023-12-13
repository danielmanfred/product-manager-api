import { PartialType } from '@nestjs/mapped-types';
import { CreateProductDto } from './create-product.dto';
import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, MaxLength, Min } from "class-validator";

export class UpdateProductDto extends PartialType(CreateProductDto) {
    @ApiProperty()
    @MaxLength(255)
    @IsString()
    @IsNotEmpty()
    @IsOptional()
    name: string;

    @ApiProperty({ type: 'string' })
    @MaxLength(255)
    @IsString()
    @IsOptional()
    description: string | null;

    @ApiProperty()
    @IsNotEmpty()
    @IsNumber()
    @IsOptional()
    price: number;

    @ApiProperty()
    @Min(1)
    @IsInt()
    @IsNotEmpty()
    @IsOptional()
    category_id: number;
}
