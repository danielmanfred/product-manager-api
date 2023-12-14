import { Test, TestingModule } from '@nestjs/testing';
import { ProductsService } from './products.service';
import { PrismaService } from '../prisma/prisma/prisma.service';
import { BadRequestException } from '@nestjs/common';

describe('ProductsService', () => {
  let service: ProductsService;
  let prismaService: PrismaService 

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
    it('should be throw if called with invalid params', async () => {
      const result = service.calculateValueInstallments({
        productId: 0,
        interest: -1,
        installments: 0
      });

      await expect(result).rejects.toThrow(new BadRequestException());
    })

    xit('should be resolves if called with valid params', async () => {
      const result = await service.calculateValueInstallments({
        productId: 1,
        interest: 5,
        installments: 10
      });

      expect(result).resolves.not.toThrow();
    })

    xit('should be throw when findUniqueOrThrow throw', async () => {
      (prismaService.product.findFirstOrThrow as jest.Mock).mockRejectedValue(new Error());
      await service.calculateValueInstallments({
        productId: 1,
        interest: 5,
        installments: 10
      });

      expect(prismaService.product.findUniqueOrThrow).rejects.toThrow();
    });

    it('should be return calculate value', async () => {
      const result = await service.calculateValueInstallments({
        productId: 1,
        interest: 5,
        installments: 10
      });

      expect(result).toEqual('453.27')
    });
  });
});
