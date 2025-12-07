import { IsOptional, IsString } from 'class-validator';

export class UpdateGoalProgressDto {
  @IsOptional()
  @IsString()
  current?: string;

  @IsOptional()
  @IsString()
  increment?: string;
}
