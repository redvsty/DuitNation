import { IsDecimal, IsNotEmpty, IsString } from 'class-validator';

export class CreateAccountDto {
  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  type: string; // bank, cash, ewallet, credit

  @IsDecimal()
  balance: string;

  @IsString()
  color: string;
}
