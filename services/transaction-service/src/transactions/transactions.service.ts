import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { FilterTransactionDto } from './dto/filter-transaction.dto';

@Injectable()
export class TransactionsService {
  constructor(private readonly prisma: PrismaService) {}

  create(dto: CreateTransactionDto) {
    return this.prisma.transaction.create({
      data: {
        ...dto,
        amount: dto.amount as any,
      },
    });
  }

  findAll(filter: FilterTransactionDto) {
    const where: any = {};

    if (filter.userId) where.userId = filter.userId;
    if (filter.accountId) where.accountId = filter.accountId;
    if (filter.categoryId) where.categoryId = filter.categoryId;
    if (filter.type) where.type = filter.type;

    if (filter.from || filter.to) {
      where.date = {};
      if (filter.from) where.date.gte = new Date(filter.from);
      if (filter.to) where.date.lte = new Date(filter.to);
    }

    return this.prisma.transaction.findMany({
      where,
      orderBy: { date: 'desc' },
    });
  }

  async findOne(id: string) {
    const tx = await this.prisma.transaction.findUnique({ where: { id } });
    if (!tx) throw new NotFoundException('Transaction not found');
    return tx;
  }

  async update(id: string, dto: UpdateTransactionDto) {
    await this.findOne(id);

    const data: any = { ...dto };
    if (dto.amount !== undefined) data.amount = dto.amount as any;

    return this.prisma.transaction.update({
      where: { id },
      data,
    });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.transaction.delete({ where: { id } });
  }

  findRecurring(userId?: string) {
    const where: any = { recurring: true };
    if (userId) where.userId = userId;

    return this.prisma.transaction.findMany({
      where,
      orderBy: { date: 'desc' },
    });
  }
}
