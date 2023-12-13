import { Test, TestingModule } from '@nestjs/testing';
import { ProductsController } from './products.controller';
import { ProductsService } from './products.service';
import { Request, Response } from 'express';

describe('ProductsController', () => {
  let controller: ProductsController;
  const requestMock = {
    query: {}
  } as unknown as Request;
  const responseMock = {
    status: jest.fn(x => x),
    send: jest.fn(x => x)
  } as unknown as Response;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductsController],
      providers: [ProductsService],
    }).compile();

    controller = module.get<ProductsController>(ProductsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('calculateValueInstallments', () => {
    it('should return a status 400 if missing any parameters', () => {
      controller.calculateValueInstallments(requestMock, responseMock);
    });
  });
});
