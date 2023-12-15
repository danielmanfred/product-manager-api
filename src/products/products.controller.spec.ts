import { Test, TestingModule } from '@nestjs/testing';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { PrismaService } from '../prisma/prisma/prisma.service';
import { CalculateValueInstallmentsDto } from './dto/calculate-value-installments.dto';
import { BadRequestException } from '@nestjs/common';

describe('ProductsController', () => {
  let controller: ProductsController;
  let service: ProductsService;

  beforeEach(async () => {
    const serviceMock = {
      calculateValueInstallments: jest.fn().mockReturnValue('453.27')
    };

    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsController],
      providers: [
        ProductsService,
        PrismaService, 
        { provide: ProductsService, useFactory: () => serviceMock }
      ],
    }).compile();

    controller = module.get<ProductsController>(ProductsController);
    service = module.get<ProductsService>(ProductsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('calculateValueInstallments()', () => {
    it('should throw when service throws', async () => {
      (service.calculateValueInstallments as jest.Mock).mockRejectedValue(new BadRequestException());
      await expect(controller.calculateValueInstallments(0,0,0)).rejects.toThrow(new BadRequestException());
    });

    it('should call the service with correct params', async () => {
      await controller.calculateValueInstallments(1,5,10);
      expect(service.calculateValueInstallments).toHaveBeenCalledWith({
        productId: 1, interest: 5, installments: 10
      } as CalculateValueInstallmentsDto);
    });

    it('should calculate and return the correctly value', async () => {
      const result = await controller.calculateValueInstallments(1,5,10);
      expect(result).toEqual('453.27');
    });
  });
});
