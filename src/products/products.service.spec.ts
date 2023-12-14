import { Test, TestingModule } from '@nestjs/testing';
import { ProductsService } from './products.service';
import { PrismaService } from '../prisma/prisma/prisma.service';
import { BadRequestException } from '@nestjs/common';

describe('ProductsService', () => {
  let service: ProductsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductsService, PrismaService],
    }).compile();

    service = module.get<ProductsService>(ProductsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('calculateValueInstallments()', () => {
    it('should be throw if called with invalid params', async () => {
      const result = service.calculateValueInstallments({
        productId: 0,
        interest: -1,
        installments: 0
      });

      await expect(result).rejects.toThrow(new BadRequestException());
    })

    it('should be resolves if called with valid params', async () => {
      const result = service.calculateValueInstallments({
        productId: 1,
        interest: 5,
        installments: 10
      });

      await expect(result).resolves.not.toThrow();
    })
  });
});
