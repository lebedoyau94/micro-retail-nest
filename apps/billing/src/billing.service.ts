import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { ClientProxy } from '@nestjs/microservices';
import { Invoice } from './entities/invoice.entity';
import { InvoiceItem } from './entities/invoice-item.entity';
import { ReturnEntity } from './entities/return.entity';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class BillingService {
  constructor(
    @InjectRepository(Invoice) private invoiceRepo: Repository<Invoice>,
    @InjectRepository(InvoiceItem) private itemRepo: Repository<InvoiceItem>,
    @InjectRepository(ReturnEntity) private returnRepo: Repository<ReturnEntity>,
    @Inject('INVENTORY_CLIENT') private inventoryClient: ClientProxy,
  ) {}

  async createInvoice(dto: { items: { productId: string; quantity: number; price: number }[] }) {
    const invoice = this.invoiceRepo.create();
    invoice.items = [];

    for (const item of dto.items) {
      // reducimos stock
      const res = await firstValueFrom(
        this.inventoryClient.send('decrease_stock', {
          productId: item.productId,
          delta: item.quantity,
        }),
      ).catch(() => {
        throw new Error('Inventory service unavailable');
      });

      if (!res?.ok) {
        throw new Error('Inventory update failed');
      }

      const entity = this.itemRepo.create({
        productId: item.productId,
        quantity: item.quantity,
        price: item.price,
        invoice,
      });

      invoice.items.push(entity);
    }

    return this.invoiceRepo.save(invoice);
  }

  async createReturn(dto: { invoiceId: string; productId: string; quantity: number; reason?: string }) {
    const invoice = await this.invoiceRepo.findOne({
      where: { id: dto.invoiceId },
      relations: ['items'],
    });

    if (!invoice) {
      throw new Error('Invoice not found');
    }

    const item = invoice.items.find((i) => i.productId === dto.productId);
    if (!item) {
      throw new Error('Product not in invoice');
    }

    // aumentamos stock
    const res = await firstValueFrom(
      this.inventoryClient.send('increase_stock', {
        productId: dto.productId,
        delta: dto.quantity,
      }),
    ).catch(() => {
      throw new Error('Inventory service unavailable');
    });

    if (!res?.ok) {
      throw new Error('Inventory update failed');
    }

    const returnEntity = this.returnRepo.create({
      invoiceId: dto.invoiceId,
      productId: dto.productId,
      quantity: dto.quantity,
      reason: dto.reason ?? null,
    });

    const saved = await this.returnRepo.save(returnEntity);

    return { ok: true, return: saved };
  }
}
