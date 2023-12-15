import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsInt, IsNotEmpty, Min } from "class-validator";
import { Type } from "class-transformer";

export class CalculateValueInstallmentsDto {
    @Type(() => Number)
    @ApiProperty({
        description: 'Interest percentage',
        minimum: 0.1,
        example: 5,
        type: Number
    })
    @IsNumber()
    @IsNotEmpty()
    @Min(0.1)
    readonly interest: number;

    @Type(() => Number)
    @ApiProperty({
        description: 'Number of installments',
        minimum: 2,
        example: 10,
        type: Number
    })
    @IsInt()
    @Min(2)
    @IsNotEmpty()
    readonly installments: number;
}
