import { Test, TestingModule } from '@nestjs/testing';
import { BillingController } from '../src/billing.controller';
import { BillingService } from '../src/billing.service';

describe('BillingController', () => {
  let controller: BillingController;
  let service: BillingService;

  const serviceMock = {
    createInvoice: jest.fn(),
    createReturn: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [BillingController],
      providers: [{ provide: BillingService, useValue: serviceMock }],
    }).compile();

    controller = module.get(BillingController);
    service = module.get(BillingService);
    jest.clearAllMocks();
  });

  it('should delegate invoice creation', async () => {
    (service.createInvoice as jest.Mock).mockResolvedValue({ id: 'inv1' });
    const res = await controller.createInvoice({
      items: [{ productId: 'p1', quantity: 1, price: 10 }],
    } as any);
    expect(res.id).toBe('inv1');
    expect(service.createInvoice).toHaveBeenCalled();
  });

  it('should delegate return creation', async () => {
    (service.createReturn as jest.Mock).mockResolvedValue({ ok: true });
    const res = await controller.createReturn({
      invoiceId: 'inv1',
      productId: 'p1',
      quantity: 1,
    } as any);
    expect(res.ok).toBe(true);
    expect(service.createReturn).toHaveBeenCalled();
  });
});
