import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from './../prisma/prisma/prisma.service';
import { InvalidRalationError } from './../errors/invalid-relation.error';
import { CalculateValueInstallmentsDto } from './dto/calculate-value-installments.dto';

@Injectable()
export class ProductsService {
  constructor(private prismaService: PrismaService) {}

  async create(createProductDto: CreateProductDto) {
    const categoryExists = await (this.prismaService.category.count({
      where: { id: createProductDto.category_id }
    })) != 0;

    if (!categoryExists) {
      throw new InvalidRalationError('Category Not Found');
    }

    return this.prismaService.product.create({ data: createProductDto });
  }

  findAll() {
    return this.prismaService.product.findMany({
      include: { category: true }
    });
  }

  findOne(id: number) {
    return this.prismaService.product.findUniqueOrThrow({ where: { id } });
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return this.prismaService.product.update({
      where: { id },
      data: updateProductDto
    });
  }

  remove(id: number) {
    return this.prismaService.product.delete({ where: { id }});
  }

  async calculateValueInstallments(id: number, data: CalculateValueInstallmentsDto): Promise<string> {
    const { interest, installments } = data

    if (interest < 0.01 || installments < 2) {
      throw new BadRequestException('Interest or installments are invalid');
    }

    const interestRate = interest / 100;
    const product = await this.prismaService.product.findUniqueOrThrow({ where: { id }});
    return (product.price * interestRate / (1 - Math.pow(1 + interestRate, -installments))).toFixed(2);
  }
}
