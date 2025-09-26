import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from '@shared-db';

@Entity()
export class Supplier extends BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  name!: string;

  @Column({ unique: true })
  document!: string;

  @Column()
  email!: string;

  @Column({ nullable: true })
  phone?: string;
}
