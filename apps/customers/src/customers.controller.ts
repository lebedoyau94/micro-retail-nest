import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { CustomersService } from './customers.service';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { CustomerPatterns } from '@shared-kernel';

@Controller()
export class CustomersController {
  constructor(private readonly service: CustomersService) {}

  @MessagePattern(CustomerPatterns.CUST_CREATE)
  create(@Payload() dto: CreateCustomerDto) {
    return this.service.create(dto);
  }

  @MessagePattern(CustomerPatterns.CUST_FIND_ALL)
  findAll() {
    return this.service.findAll();
  }

  @MessagePattern(CustomerPatterns.CUST_FIND_ONE)
  findOne(@Payload() id: string) {
    return this.service.findOne(id);
  }

  @MessagePattern(CustomerPatterns.CUST_UPDATE)
  update(@Payload() data: { id: string; dto: UpdateCustomerDto }) {
    return this.service.update(data.id, data.dto);
  }

  @MessagePattern(CustomerPatterns.CUST_DELETE)
  remove(@Payload() id: string) {
    return this.service.remove(id);
  }
}
