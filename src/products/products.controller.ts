import { Controller, Get, Post, Body, Patch, Param, Delete, Req, Res, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { CalculateValueInstallmentsDto } from './dto/calculate-value-installments.dto';
import { ApiBody } from '@nestjs/swagger';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Get()
  findAll() {
    console.log('Why is falling here???')
    return this.productsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.productsService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(+id, updateProductDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.productsService.remove(+id);
  }

  @ApiBody({ type: [CalculateValueInstallmentsDto]})
  @Get('/calculateValueInstallments/:id')
  async calculateValueInstallments(@Param('id') id: string, @Body() data: CalculateValueInstallmentsDto): Promise<{ valueInstallments: string }> {
    const valueInstallments = await this.productsService.calculateValueInstallments(+id, data);
    return { valueInstallments };
  }
}
