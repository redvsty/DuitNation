import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateBudgetDto } from './dto/create-budget.dto';
import { UpdateBudgetDto } from './dto/update-budget.dto';

type BudgetFilter = {
  userId?: string;
  month?: string;
};

@Injectable()
export class BudgetsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateBudgetDto) {
    return this.prisma.budget.create({ data: dto });
  }

  async findAll(filter: BudgetFilter) {
    const where: any = {};
    if (filter.userId) where.userId = filter.userId;
    if (filter.month) where.month = filter.month;

    return this.prisma.budget.findMany({ where });
  }

  async findOne(id: string) {
    const budget = await this.prisma.budget.findUnique({ where: { id } });
    if (!budget) throw new NotFoundException('Budget not found');
    return budget;
  }

  async update(id: string, dto: UpdateBudgetDto) {
    await this.findOne(id);
    return this.prisma.budget.update({
      where: { id },
      data: dto,
    });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.budget.delete({ where: { id } });
  }

  /**
   * Get budget progress for a user in a given month.
   * Di design ini kita pakai field `spent` yang sudah tersimpan di tabel Budget
   * (sesuai schema PDF: ada field limit & spent).
   * Nanti kalau mau lebih canggih bisa sync dari transaction-service.
   */
  async getProgress(userId: string, month: string) {
    const budgets = await this.prisma.budget.findMany({
      where: { userId, month },
      orderBy: { createdAt: 'asc' },
    });

    return budgets.map((b) => {
      const limit = Number(b.limit);
      const spent = Number(b.spent);
      const percentage = limit > 0 ? Math.min((spent / limit) * 100, 999) : 0;

      return {
        id: b.id,
        userId: b.userId,
        categoryId: b.categoryId,
        month: b.month,
        limit,
        spent,
        percentage,
        isOverBudget: spent > limit,
      };
    });
  }
}
