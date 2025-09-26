import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class InventoryService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepo: Repository<Product>,
  ) {}

  async create(dto: CreateProductDto) {
    const exists = await this.productRepo.findOne({ where: { name: dto.name } });
    if (exists) throw new BadRequestException('Product name already exists');

    const product = this.productRepo.create(dto);
    return this.productRepo.save(product);
  }

  findAll() {
    return this.productRepo.find();
  }

  async findOne(id: string) {
    const product = await this.productRepo.findOne({ where: { id } });
    if (!product) throw new NotFoundException('Product not found');
    return product;
  }

  async update(id: string, dto: UpdateProductDto) {
    const product = await this.findOne(id);
    Object.assign(product, dto);
    return this.productRepo.save(product);
  }

  async remove(id: string) {
    const product = await this.findOne(id);
    await this.productRepo.remove(product);
    return { deleted: true };
  }

  async updateStock(id: string, quantity: number) {
    const product = await this.findOne(id);
    if (product.stock + quantity < 0) {
      throw new BadRequestException('Stock cannot be negative');
    }
    product.stock += quantity;
    return this.productRepo.save(product);
  }
}
