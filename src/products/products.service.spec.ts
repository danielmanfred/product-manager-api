import { Test, TestingModule } from '@nestjs/testing';
import { ProductsService } from './products.service';
import { PrismaService } from '../prisma/prisma/prisma.service';
import { BadRequestException, InternalServerErrorException } from '@nestjs/common';
import { CalculateValueInstallmentsDto } from './dto/calculate-value-installments.dto';

describe('ProductsService', () => {
  let service: ProductsService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const prismaServiceMock = {
      product: { findUniqueOrThrow: jest.fn().mockReturnValue({
        id: 1,
        name: 'Notebook',
        description: 'Notebook Dell 16g ram',
        price: 3500,
        category_id: 1
      }) }
    }
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductsService, { provide: PrismaService, useFactory: () => prismaServiceMock }],
    }).compile();

    service = module.get<ProductsService>(ProductsService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('calculateValueInstallments()', () => {
    let mockData: CalculateValueInstallmentsDto;

    beforeEach(() => {
      mockData = {
        productId: 1,
        interest: 5,
        installments: 10
      } as CalculateValueInstallmentsDto;
    })

    it('should be throw if called with invalid params', async () => {
      const result = service.calculateValueInstallments({
        productId: 0,
        interest: -1,
        installments: 0
      });

      await expect(result).rejects.toThrow(new BadRequestException());
    });

    it('should be called repository with correct params', async () => {
      service.calculateValueInstallments(mockData);
      expect(prismaService.product.findUniqueOrThrow).toHaveBeenCalledWith({ where: { id: mockData.productId }});
    });

    it('should be not thorw if repository return successfully', async () => {
      const result = service.calculateValueInstallments(mockData);

      await expect(result).resolves.not.toThrow();
    });

    it('should be return calculate value', async () => {
      const result = await service.calculateValueInstallments(mockData);

      expect(result).toEqual('453.27')
    });
  });
});
