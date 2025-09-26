import { Entity, Column, PrimaryGeneratedColumn, Unique } from 'typeorm';
import { BaseEntity } from '@shared-db';

@Entity('customers')
@Unique(['email'])
@Unique(['document'])
export class Customer extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  name!: string;

  @Column()
  document!: string;

  @Column()
  email!: string;
}
