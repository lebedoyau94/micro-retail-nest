import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { ClientProxy } from '@nestjs/microservices';
import { of, throwError } from 'rxjs';
import { Repository } from 'typeorm';
import { BillingService } from '../src/billing.service';
import { Invoice } from '../src/entities/invoice.entity';
import { InvoiceItem } from '../src/entities/invoice-item.entity';
import { ReturnEntity } from '../src/entities/return.entity';

describe('BillingService', () => {
  let service: BillingService;
  let invoiceRepo: Repository<Invoice>;
  let itemRepo: Repository<InvoiceItem>;
  let returnRepo: Repository<ReturnEntity>;
  let inventoryClient: ClientProxy;

  const invoiceMock = {
    create: jest.fn(),
    save: jest.fn(),
    findOne: jest.fn(),
  };

  const itemMock = {
    create: jest.fn(),
  };

  const returnMock = {
    create: jest.fn(),
    save: jest.fn(),
  };

  const inventoryMock: Partial<ClientProxy> = {
    send: jest.fn(),
  };

  beforeEach(async () => {
  const module: TestingModule = await Test.createTestingModule({
    providers: [
      BillingService,
      { provide: getRepositoryToken(Invoice), useValue: invoiceMock },
      { provide: getRepositoryToken(InvoiceItem), useValue: itemMock },
      { provide: getRepositoryToken(ReturnEntity), useValue: returnMock },
      { provide: 'INVENTORY_CLIENT', useValue: inventoryMock },
    ],
  }).compile();

  service = module.get(BillingService);
  invoiceRepo = module.get(getRepositoryToken(Invoice));
  itemRepo = module.get(getRepositoryToken(InvoiceItem));
  returnRepo = module.get(getRepositoryToken(ReturnEntity));
  inventoryClient = module.get('INVENTORY_CLIENT');

   (invoiceRepo.create as jest.Mock).mockImplementation(() => ({ id: 'inv-mock', items: [] }));

  jest.clearAllMocks();
});


  it('should create invoice and decrease stock', async () => {
    (inventoryClient.send as jest.Mock).mockReturnValue(of({ ok: true }));
    (itemRepo.create as jest.Mock).mockImplementation((i) => i);
    (invoiceRepo.create as jest.Mock).mockImplementation(() => ({ id: 'inv-mock', items: [] }));
    (invoiceRepo.save as jest.Mock).mockImplementation((i) => Promise.resolve({ ...i, id: 'inv1' }));

    const res = await service.createInvoice({
      items: [
        { productId: 'p1', quantity: 2, price: 10 },
        { productId: 'p2', quantity: 1, price: 30 },
      ],
    });

    expect(res.id).toBe('inv1');
    expect(inventoryClient.send).toHaveBeenCalledTimes(2);
  });

  it('should fail if inventory is unavailable', async () => {
    (inventoryClient.send as jest.Mock).mockReturnValue(throwError(() => new Error('down')));

    await expect(
      service.createInvoice({
        items: [{ productId: 'p1', quantity: 1, price: 5 }],
      }),
    ).rejects.toThrow('Inventory service unavailable');
  });

  it('should process a return and increase stock', async () => {
    (inventoryClient.send as jest.Mock).mockReturnValue(of({ ok: true }));
    (invoiceRepo.findOne as jest.Mock).mockResolvedValue({
      id: 'inv1',
      items: [{ productId: 'p1', quantity: 3 }],
    });
    (returnRepo.create as jest.Mock).mockImplementation((r) => r);
    (returnRepo.save as jest.Mock).mockImplementation((r) => Promise.resolve({ ...r, id: 'ret1' }));

    const res = await service.createReturn({
      invoiceId: 'inv1',
      productId: 'p1',
      quantity: 2,
    });

    expect(res.ok).toBe(true);
    expect(res.return.id).toBe('ret1');
    expect(inventoryClient.send).toHaveBeenCalledWith(expect.any(String), {
      productId: 'p1',
      delta: 2,
    });
  });
});
