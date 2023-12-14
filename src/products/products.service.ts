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

  async calculateValueInstallments(data: CalculateValueInstallmentsDto): Promise<number> {
    const { productId, interest, installments } = data

    if (productId <= 0 || interest < 0 || installments <= 0) {
      throw new BadRequestException();
    }

    const interestRate = interest / 100
    const product = { price: 1550.00 }
    //await this.prismaService.product.findUniqueOrThrow({ where: { id: productId }});
    return product.price * interestRate / (1 - Math.pow(1 + interestRate, -installments))
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
}
