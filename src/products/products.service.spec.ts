import { Test, TestingModule } from '@nestjs/testing';
import { ProductsService } from './products.service';
import { PrismaService } from '../prisma/prisma/prisma.service';
import { BadRequestException } from '@nestjs/common';
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
    };
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
    const id = 1;

    beforeEach(() => {
      mockData = {
        interest: 5,
        installments: 10
      } as CalculateValueInstallmentsDto;
    })

    it('should be throw if called with invalid params', async () => {
      const result = service.calculateValueInstallments(id, {
        interest: 0,
        installments: 0
      });

      await expect(result).rejects.toThrow(new BadRequestException('Interest or installments are invalid'));
    });

    it('should be called repository with correct params', async () => {
      service.calculateValueInstallments(id, mockData);
      expect(prismaService.product.findUniqueOrThrow).toHaveBeenCalledWith({ where: { id }});
    });

    it('should be not throw if repository return successfully', async () => {
      const result = service.calculateValueInstallments(id, mockData);

      await expect(result).resolves.not.toThrow();
    });

    it('should return the correct calculate value', async () => {
      const result = await service.calculateValueInstallments(id, mockData);

      expect(result).toEqual('453.27')
    });
  });
});
