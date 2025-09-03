import { Test, TestingModule } from '@nestjs/testing';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';

describe('ProductController', () => {
  let controller: ProductController;
  let service: ProductService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProductController],
      providers: [ProductService],
    }).compile();

    controller = module.get<ProductController>(ProductController);
    service = module.get<ProductService>(ProductService);
  });

  it('should return data with products', async () => {
    const products = [{ id: 1, name: 'Product 1',price: 100 }, { id: 2, name: 'Product 2',price: 200 }, { id: 3, name: 'Product 3',price: 300 }, { id: 4, name: 'Product 4',price: 400 }];
    jest.spyOn(service, 'findAll').mockResolvedValue(products);

    const result = await controller.findAll();
    expect(result).toEqual({
      users: 150,
      sales: 9999,
      activeSessions: 42,
      products,
    });
  });

  it('should return data with empty products', async () => {
    jest.spyOn(service, 'findAll').mockResolvedValue([]);

    const result = await controller.findAll();
    expect(result).toEqual({
      users: 150,
      sales: 9999,
      activeSessions: 42,
      products: [],
    });
  });

  it('should throw an error when productService.findAll() fails', async () => {
    jest.spyOn(service, 'findAll').mockRejectedValue(new Error('Error retrieving products'));

    await expect(controller.findAll()).rejects.toThrow('Error retrieving products');
  });
});