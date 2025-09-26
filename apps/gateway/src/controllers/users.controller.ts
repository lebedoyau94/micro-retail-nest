import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Delete,
  UseFilters,
} from '@nestjs/common';
import { lastValueFrom } from 'rxjs';
import { getClient } from '../common/tcp-client.provider';
import { AllExceptionsFilter } from '../common/filters/all-exceptions.filter';

@Controller('users')
@UseFilters(AllExceptionsFilter)
export class UsersController {
  private client = getClient('auth');

  @Get()
  async findAll() {
    const obs$ = this.client.send({ cmd: 'USER_FIND_ALL' }, {});
    return await lastValueFrom(obs$);
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const obs$ = this.client.send({ cmd: 'USER_FIND_ONE' }, { id });
    return await lastValueFrom(obs$);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() dto: any) {
    const obs$ = this.client.send({ cmd: 'USER_UPDATE' }, { id, ...dto });
    return await lastValueFrom(obs$);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const obs$ = this.client.send({ cmd: 'USER_DELETE' }, { id });
    return await lastValueFrom(obs$);
  }
}
