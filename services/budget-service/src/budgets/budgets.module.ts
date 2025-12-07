import { Module } from '@nestjs/common';
import { BudgetsController } from './budgets.controller';
import { BudgetsService } from './budgets.service';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [BudgetsController],
  providers: [BudgetsService, PrismaService],
  exports: [BudgetsService],
})
export class BudgetsModule {}
