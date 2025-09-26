import { IsEmail, IsNotEmpty, IsOptional } from 'class-validator';

export class CreateSupplierDto {
  @IsNotEmpty()
  name!: string;

  @IsNotEmpty()
  document!: string;

  @IsEmail()
  email!: string;

  @IsOptional()
  phone?: string;
}
