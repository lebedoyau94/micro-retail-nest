import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseFilters, UseGuards } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';
import { getClient } from '../common/tcp-client.provider';
import { AllExceptionsFilter } from '../common/filters/all-exceptions.filter';
import { JwtAuthGuard } from '@shared-auth';

@Controller('inventory')
@UseFilters(AllExceptionsFilter)
@UseGuards(JwtAuthGuard)
export class InventoryController {
  private client = getClient('inventory');

  @Get()
  async findAll(@Query() q: any) {
    return await lastValueFrom(this.client.send({ cmd: 'INV_FIND_MANY' }, q ?? {}));
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    return await lastValueFrom(this.client.send({ cmd: 'INV_FIND_ONE' }, { id }));
  }

  @Post()
  async create(@Body() dto: any) {
    return await lastValueFrom(this.client.send({ cmd: 'INV_CREATE' }, dto));
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() dto: any) {
    return await lastValueFrom(this.client.send({ cmd: 'INV_UPDATE' }, { id, ...dto }));
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await lastValueFrom(this.client.send({ cmd: 'INV_DELETE' }, { id }));
  }
}
