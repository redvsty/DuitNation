import { Module } from '@nestjs/common';
import { BudgetsModule } from './budgets/budgets.module';

@Module({
  imports: [BudgetsModule],
})
export class AppModule {}
