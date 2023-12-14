import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsInt, IsNotEmpty, Min } from "class-validator";

export class CalculateValueInstallmentsDto {
    @ApiProperty()
    @IsInt()
    @IsNotEmpty()
    @Min(1)
    productId: number;

    @ApiProperty()
    @IsNumber()
    @IsNotEmpty()
    @Min(0)
    interest: number;

    @ApiProperty()
    @IsInt()
    @Min(1)
    @IsNotEmpty()
    installments: number;
}