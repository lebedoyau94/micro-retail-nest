import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { SuppliersService } from './suppliers.service';
import { CreateSupplierDto } from './dto/create-supplier.dto';
import { UpdateSupplierDto } from './dto/update-supplier.dto';
import { SupplierPatterns } from '@shared-kernel';

@Controller()
export class SuppliersController {
  constructor(private readonly suppliersService: SuppliersService) {}

  @MessagePattern(SupplierPatterns.SUP_CREATE)
  create(@Payload() dto: CreateSupplierDto) {
    return this.suppliersService.create(dto);
  }

  @MessagePattern(SupplierPatterns.SUP_FIND_ALL)
  findAll() {
    return this.suppliersService.findAll();
  }

  @MessagePattern(SupplierPatterns.SUP_FIND_ONE)
  findOne(@Payload() id: string) {
    return this.suppliersService.findOne(id);
  }

  @MessagePattern(SupplierPatterns.SUP_UPDATE)
  update(@Payload() payload: { id: string; dto: UpdateSupplierDto }) {
    return this.suppliersService.update(payload.id, payload.dto);
  }

  @MessagePattern(SupplierPatterns.SUP_DELETE)
  remove(@Payload() id: string) {
    return this.suppliersService.remove(id);
  }
}
