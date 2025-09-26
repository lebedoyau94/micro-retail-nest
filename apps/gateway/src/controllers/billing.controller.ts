import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseFilters, UseGuards } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';
import { getClient } from '../common/tcp-client.provider';
import { AllExceptionsFilter } from '../common/filters/all-exceptions.filter';
import { JwtAuthGuard } from '@shared-auth';

@Controller('billing')
@UseFilters(AllExceptionsFilter)
@UseGuards(JwtAuthGuard)
export class BillingController {
  private client = getClient('billing');

  @Get()
  async findAll(@Query() q: any) {
    return await lastValueFrom(this.client.send({ cmd: 'BILL_FIND_MANY' }, q ?? {}));
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await lastValueFrom(this.client.send({ cmd: 'BILL_FIND_ONE' }, { id }));
  }

  @Post()
  async create(@Body() dto: any) {
    // Crear factura (el MS de billing internamente coordina stock con inventory vía TCP)
    return await lastValueFrom(this.client.send({ cmd: 'BILL_CREATE' }, dto));
  }

  @Post(':id/return')
  async createReturn(@Param('id') id: string, @Body() dto: any) {
    // Devolución de productos: billing notifica a inventory para reponer stock
    return await lastValueFrom(this.client.send({ cmd: 'BILL_RETURN' }, { id, ...dto }));
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() dto: any) {
    return await lastValueFrom(this.client.send({ cmd: 'BILL_UPDATE' }, { id, ...dto }));
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await lastValueFrom(this.client.send({ cmd: 'BILL_DELETE' }, { id }));
  }
}
