import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Supplier } from './entities/supplier.entity';
import { CreateSupplierDto } from './dto/create-supplier.dto';
import { UpdateSupplierDto } from './dto/update-supplier.dto';

@Injectable()
export class SuppliersService {
  constructor(
    @InjectRepository(Supplier)
    private readonly repo: Repository<Supplier>,
  ) {}

  async create(dto: CreateSupplierDto): Promise<Supplier> {
    const exists = await this.repo.findOne({
      where: [{ email: dto.email }, { document: dto.document }],
    });
    if (exists) {
      throw new Error('Supplier with given email or document already exists');
    }
    const supplier = this.repo.create(dto);
    return this.repo.save(supplier);
  }

  findAll(): Promise<Supplier[]> {
    return this.repo.find();
  }

  async findOne(id: string): Promise<Supplier> {
    const supplier = await this.repo.findOne({ where: { id } });
    if (!supplier) {
      throw new Error('Supplier not found');
    }
    return supplier;
  }

  async update(id: string, dto: UpdateSupplierDto): Promise<Supplier> {
    const supplier = await this.findOne(id);
    Object.assign(supplier, dto);
    return this.repo.save(supplier);
  }

  async remove(id: string): Promise<Supplier> {
    const supplier = await this.findOne(id);
    return this.repo.remove(supplier);
  }
}
