import { Module } from '@nestjs/common';
import { AuthController } from './controllers/auth.controller';
import { InventoryController } from './controllers/inventory.controller';
import { SuppliersController } from './controllers/suppliers.controller';
import { CustomersController } from './controllers/customers.controller';
import { BillingController } from './controllers/billing.controller';
import { UsersController } from './controllers/users.controller';
@Module({
  controllers: [
    AuthController,
    InventoryController,
    SuppliersController,
    CustomersController,
    BillingController,
    UsersController,
  ],
  providers: [],
})
export class AppModule {}
