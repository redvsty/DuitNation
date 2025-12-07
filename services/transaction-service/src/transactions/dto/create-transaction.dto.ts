import { IsBoolean, IsDateString, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateTransactionDto {
  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsString()
  @IsNotEmpty()
  accountId: string;

  @IsString()
  @IsNotEmpty()
  categoryId: string;

  @IsString()
  @IsNotEmpty()
  type: 'income' | 'expense';

  @IsString()
  @IsNotEmpty()
  amount: string; // Decimal sebagai string

  @IsString()
  @IsOptional()
  description?: string;

  @IsDateString()
  date: string;

  @IsBoolean()
  @IsOptional()
  recurring?: boolean;

  @IsString()
  @IsOptional()
  recurringFrequency?: string | null;
}
