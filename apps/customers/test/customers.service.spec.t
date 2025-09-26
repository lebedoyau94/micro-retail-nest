import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CustomersService } from '../src/customers.service';
import { Customer } from '../src/entities/customer.entity';

describe('CustomersService', () => {
  let service: CustomersService;
  let repo: Repository<Customer>;

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
        CustomersService,
        {
          provide: getRepositoryToken(Customer),
          useValue: mockRepo,
        },
      ],
    }).compile();

    service = module.get<CustomersService>(CustomersService);
    repo = module.get(getRepositoryToken(Customer));
  });

  it('should create a customer', async () => {
    mockRepo.findOne.mockResolvedValue(null);
    mockRepo.create.mockReturnValue({ id: '1', name: 'Test', email: 'test@mail.com', document: '123' });
    mockRepo.save.mockResolvedValue({ id: '1', name: 'Test', email: 'test@mail.com', document: '123' });

    const result = await service.create({ name: 'Test', email: 'test@mail.com', document: '123' });
    expect(result.email).toBe('test@mail.com');
  });

  it('should throw when creating duplicate', async () => {
    mockRepo.findOne.mockResolvedValue({ id: '1', email: 'test@mail.com', document: '123' });
    await expect(service.create({ name: 'Test', email: 'test@mail.com', document: '123' }))
      .rejects.toThrow('Customer already exists');
  });
});
