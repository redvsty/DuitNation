import { IsDateString, IsNotEmpty, IsString } from 'class-validator';

export class CreateGoalDto {
  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  target: string; // Decimal (string)

  @IsString()
  current?: string; // default 0 di schema

  @IsDateString()
  deadline: string;
}
