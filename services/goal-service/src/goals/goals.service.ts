import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateGoalDto } from './dto/create-goal.dto';
import { UpdateGoalDto } from './dto/update-goal.dto';
import { UpdateGoalProgressDto } from './dto/update-goal-progress.dto';

@Injectable()
export class GoalsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(dto: CreateGoalDto) {
    return this.prisma.goal.create({ data: dto });
  }

  async findAll(userId?: string) {
    const where: any = {};
    if (userId) where.userId = userId;

    return this.prisma.goal.findMany({
      where,
      orderBy: { deadline: 'asc' },
    });
  }

  async findOne(id: string) {
    const goal = await this.prisma.goal.findUnique({ where: { id } });
    if (!goal) throw new NotFoundException('Goal not found');
    return goal;
  }

  async update(id: string, dto: UpdateGoalDto) {
    await this.findOne(id);
    return this.prisma.goal.update({
      where: { id },
      data: dto,
    });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.goal.delete({ where: { id } });
  }

  /**
   * Update progress tabungan goals.
   * - Kalau `current` dikirim → set langsung
   * - Kalau `increment` dikirim → tambahkan ke current
   */
  async updateProgress(id: string, dto: UpdateGoalProgressDto) {
    const goal = await this.findOne(id);

    let newCurrent = Number(goal.current);

    if (dto.current !== undefined) {
      newCurrent = Number(dto.current);
    }

    if (dto.increment !== undefined) {
      newCurrent += Number(dto.increment);
    }

    const updated = await this.prisma.goal.update({
      where: { id },
      data: { current: newCurrent.toString() },
    });

    const target = Number(updated.target);
    const percentage = target > 0 ? Math.min((Number(updated.current) / target) * 100, 999) : 0;

    return {
      ...updated,
      progress: percentage,
      isCompleted: Number(updated.current) >= target,
    };
  }
}
