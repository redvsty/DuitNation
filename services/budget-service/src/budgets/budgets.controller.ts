import { Controller, Get, Param, Patch, Delete, Body, Post, Query } from '@nestjs/common';
import { BudgetsService } from './budgets.service';
import { CreateBudgetDto } from './dto/create-budget.dto';
import { UpdateBudgetDto } from './dto/update-budget.dto';

@Controller('budgets')
export class BudgetsController {
  constructor(private readonly budgetsService: BudgetsService) {}

  @Post()
  create(@Body() dto: CreateBudgetDto) {
    return this.budgetsService.create(dto);
  }

  // GET /api/budgets?userId=...&month=...
  @Get()
  findAll(@Query('userId') userId?: string, @Query('month') month?: string) {
    return this.budgetsService.findAll({ userId, month });
  }

  // GET /api/budgets/progress?userId=...&month=YYYY-MM (harus sebelum :id)
  @Get('progress')
  getProgress(
    @Query('userId') userId: string,
    @Query('month') month: string,
  ) {
    return this.budgetsService.getProgress(userId, month);
  }

  // GET /api/budgets/:id
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.budgetsService.findOne(id);
  }

  // PATCH /api/budgets/:id
  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateBudgetDto) {
    return this.budgetsService.update(id, dto);
  }

  // DELETE /api/budgets/:id
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.budgetsService.remove(id);
  }
}