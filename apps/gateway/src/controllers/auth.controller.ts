import { Body, Controller, Post, UseFilters } from '@nestjs/common';
import { lastValueFrom } from 'rxjs';
import { getClient } from '../common/tcp-client.provider';
import { AllExceptionsFilter } from '../common/filters/all-exceptions.filter';

@Controller('auth')
@UseFilters(AllExceptionsFilter)
export class AuthController {
  private client = getClient('auth');

  @Post('register')
  async register(@Body() dto: any) {
    const obs$ = this.client.send({ cmd: 'USER_REGISTER' }, dto);
    return await lastValueFrom(obs$);
  }

  @Post('login')
  async login(@Body() dto: any) {
    const obs$ = this.client.send({ cmd: 'USER_LOGIN' }, dto);
    return await lastValueFrom(obs$);
  }
}
