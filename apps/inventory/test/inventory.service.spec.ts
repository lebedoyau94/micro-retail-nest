import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { InventoryService } from '../src/inventory.service';
import { Product } from '../src/entities/product.entity';

describe('InventoryService', () => {
  let service: InventoryService;
  let repo: Repository<Product>;

  const mockRepo = {
    findOne: jest.fn(),
    find: jest.fn(),
    create: jest.fn(),
    save: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        InventoryService,
        {
          provide: getRepositoryToken(Product),
          useValue: mockRepo,
        },
      ],
    }).compile();

    service = module.get<InventoryService>(InventoryService);
    repo = module.get(getRepositoryToken(Product));
  });

  it('should create a product', async () => {
    mockRepo.findOne.mockResolvedValue(null);
    mockRepo.create.mockReturnValue({ id: '1', name: 'Test', price: 10, stock: 5 });
    mockRepo.save.mockResolvedValue({ id: '1', name: 'Test', price: 10, stock: 5 });

    const result = await service.create({ name: 'Test', price: 10, stock: 5 });
    expect(result.name).toBe('Test');
  });

  it('should not allow negative stock update', async () => {
    mockRepo.findOne.mockResolvedValue({ id: '1', name: 'Test', stock: 0 });
    await expect(service.updateStock('1', -1)).rejects.toThrow('Stock cannot be negative');
  });
});
