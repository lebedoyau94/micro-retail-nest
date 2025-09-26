import { Controller, Post, Body } from '@nestjs/common';
import { BillingService } from './billing.service';
import { CreateInvoiceDto } from './dto/create-invoice.dto';

@Controller('billing')
export class BillingController {
  constructor(private readonly billing: BillingService) {}

  @Post('invoice')
  createInvoice(@Body() dto: CreateInvoiceDto) {
    return this.billing.createInvoice(dto);
  }

  @Post('return')
  createReturn(@Body() dto: { invoiceId: string; productId: string; quantity: number; reason?: string }) {
    return this.billing.createReturn(dto);
  }
}
