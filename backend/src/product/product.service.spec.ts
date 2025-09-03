import { Test, TestingModule } from '@nestjs/testing';
import { ProductService } from './product.service';

describe('ProductService', () => {
  let service: ProductService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProductService],
    }).compile();

    service = module.get<ProductService>(ProductService);
  });

  it('should return an array of products', async () => {
    const result = await service.findAll();
    expect(result).toBeInstanceOf(Array);
  });

  it('should return an array of products with correct length', async () => {
    const result = await service.findAll();
    expect(result.length).toBe(4);
  });

  it('should return products with correct properties', async () => {
    const result = await service.findAll();
    result.forEach((product) => {
      expect(product).toHaveProperty('id');
      expect(product).toHaveProperty('name');
      expect(product).toHaveProperty('price');
    });
  });

  it('should return products with correct values', async () => {
    const result = await service.findAll();
    expect(result[0]).toEqual({ id: 1, name: 'Product 1', price: 100 });
    expect(result[1]).toEqual({ id: 2, name: 'Product 2', price: 200 });
    expect(result[2]).toEqual({ id: 3, name: 'Product 3', price: 300 });
    expect(result[3]).toEqual({ id: 4, name: 'Product 4', price: 400 });
  });
});