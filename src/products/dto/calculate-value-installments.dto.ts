import { ApiProperty } from "@nestjs/swagger";
import { IsNumber, IsInt, IsNotEmpty, Min, IsString, IsOptional } from "class-validator";

export class CalculateValueInstallmentsDto {
    @ApiProperty({ 
        description: 'Porcentagem do juros dividido por 100',
        minimum: 0.1,
        example: 5,
        type: Number
    })
    @IsNumber()
    @IsNotEmpty()
    @Min(0.1)
    interest: number;

    @ApiProperty({
        description: 'Número de parcelas',
        minimum: 2,
        example: 10,
        type: Number
    })
    @IsInt()
    @Min(2)
    @IsNotEmpty()
    installments: number;
}