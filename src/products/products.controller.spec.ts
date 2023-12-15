import { Test, TestingModule } from '@nestjs/testing';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { PrismaService } from '../prisma/prisma/prisma.service';
import { CalculateValueInstallmentsDto } from './dto/calculate-value-installments.dto';
import { BadRequestException, NotFoundException } from '@nestjs/common';

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
    let mockData: CalculateValueInstallmentsDto;
    const id = '1';

    beforeEach(() => {
      mockData = {
        interest: 5,
        installments: 10
      } as CalculateValueInstallmentsDto;
    })

    it('should throw when service fail', async () => {
      (service.calculateValueInstallments as jest.Mock).mockRejectedValue(new BadRequestException());
      await expect(controller.calculateValueInstallments(id, {} as CalculateValueInstallmentsDto)).rejects.toThrow(new BadRequestException());
    });

    it('should return Not Found Exception if product was not found', async () => {
      (service.calculateValueInstallments as jest.Mock).mockRejectedValue(new NotFoundException())
      const result = controller.calculateValueInstallments(id, mockData);
      await expect(result).rejects.toThrow(new NotFoundException());
    });

    it('should call the service with correct params', async () => {
      await controller.calculateValueInstallments(id, mockData);
      expect(service.calculateValueInstallments).toHaveBeenCalledWith(+id, { 
        interest: 5, 
        installments: 10
      } as CalculateValueInstallmentsDto);
    });

    it('should calculate and return the correctly value', async () => {
      const result = await controller.calculateValueInstallments(id, mockData);
      expect(result).toEqual({ valueInstallments: '453.27' });
    });
  });
});
