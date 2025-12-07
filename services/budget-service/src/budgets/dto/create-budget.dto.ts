import { IsNotEmpty, IsString, Matches } from 'class-validator';

export class CreateBudgetDto {
  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsString()
  @IsNotEmpty()
  categoryId: string;

  // Format: YYYY-MM
  @IsString()
  @Matches(/^\d{4}-\d{2}$/)
  month: string;

  @IsString()
  @IsNotEmpty()
  limit: string; // Decimal as string, sesuai Prisma Decimal

  @IsString()
  spent?: string; // optional, default 0 di schema
}
