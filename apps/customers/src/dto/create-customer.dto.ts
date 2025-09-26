import { IsEmail, IsNotEmpty } from 'class-validator';

export class CreateCustomerDto {
  @IsNotEmpty()
  name!: string;

  @IsNotEmpty()
  document!: string;

  @IsEmail()
  email!: string;
}
