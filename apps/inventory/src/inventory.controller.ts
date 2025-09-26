import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { InventoryService } from './inventory.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InventoryPatterns } from '@shared-kernel';
@Controller()
export class InventoryController {
  constructor(private readonly inventoryService: InventoryService) {}

  @MessagePattern('INV_CREATE')
  create(@Payload() dto: CreateProductDto) {
    return this.inventoryService.create(dto);
  }

  @MessagePattern('INV_FIND_ALL')
  findAll() {
    return this.inventoryService.findAll();
  }

  @MessagePattern('INV_FIND_ONE')
  findOne(@Payload() id: string) {
    return this.inventoryService.findOne(id);
  }

  @MessagePattern('INV_UPDATE')
  update(@Payload() payload: { id: string; dto: UpdateProductDto }) {
    return this.inventoryService.update(payload.id, payload.dto);
  }

  @MessagePattern('INV_DELETE')
  remove(@Payload() id: string) {
    return this.inventoryService.remove(id);
  }

  @MessagePattern('INV_UPDATE_STOCK')
  updateStock(@Payload() payload: { id: string; quantity: number }) {
    return this.inventoryService.updateStock(payload.id, payload.quantity);
  }
}
