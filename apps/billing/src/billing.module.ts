import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { DatabaseModule } from '@shared-db';
import { BillingService } from './billing.service';
import { BillingController } from './billing.controller';
import { Invoice } from './entities/invoice.entity';
import { InvoiceItem } from './entities/invoice-item.entity';
import { ReturnEntity } from './entities/return.entity';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: 'apps/billing/.env.billing',
    }),
    DatabaseModule,
    TypeOrmModule.forFeature([Invoice, InvoiceItem, ReturnEntity]),
    ClientsModule.registerAsync([
      {
        name: 'INVENTORY_CLIENT',
        imports: [ConfigModule],
        inject: [ConfigService],
        useFactory: (cfg: ConfigService) => ({
          transport: Transport.TCP,
          options: {
            host: cfg.get<string>('INVENTORY_HOST', '127.0.0.1'),
            port: cfg.get<number>('INVENTORY_PORT', 3002),
          },
        }),
      },
    ]),
  ],
  controllers: [BillingController],
  providers: [BillingService],
})
export class BillingModule {}
