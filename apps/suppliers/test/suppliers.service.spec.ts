import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SuppliersService } from '../src/suppliers.service';
import { Supplier } from '../src/entities/supplier.entity';

describe('SuppliersService', () => {
  let service: SuppliersService;
  let repo: Repository<Supplier>;

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
        SuppliersService,
        {
          provide: getRepositoryToken(Supplier),
          useValue: mockRepo,
        },
      ],
    }).compile();

    service = module.get<SuppliersService>(SuppliersService);
    repo = module.get(getRepositoryToken(Supplier));
  });

  it('should create a supplier', async () => {
    mockRepo.findOne.mockResolvedValue(null);
    mockRepo.create.mockReturnValue({ id: '1', name: 'Test', email: 'test@mail.com', document: '123' });
    mockRepo.save.mockResolvedValue({ id: '1', name: 'Test', email: 'test@mail.com', document: '123' });

    const result = await service.create({ name: 'Test', email: 'test@mail.com', document: '123' });
    expect(result.name).toBe('Test');
  });

  it('should not allow duplicate email or document', async () => {
    mockRepo.findOne.mockResolvedValue({ id: '1', name: 'Test', email: 'test@mail.com', document: '123' });
    await expect(
      service.create({ name: 'Test', email: 'test@mail.com', document: '123' }),
    ).rejects.toThrow('Supplier with given email or document already exists');
  });
});
