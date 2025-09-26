import { Injectable } from '@nestjs/common';
import { DataSource } from 'typeorm';

@Injectable()
export class DatabaseService {
  constructor(private readonly dataSource: DataSource) {}

  getRepository<T>(entity: new () => T) {
    return this.dataSource.getRepository(entity);
  }
}
