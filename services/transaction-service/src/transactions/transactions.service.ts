import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateTransactionDto } from './dto/create-transaction.dto';
import { UpdateTransactionDto } from './dto/update-transaction.dto';
import { FilterTransactionDto } from './dto/filter-transaction.dto';
import { Prisma } from '@prisma/client';

@Injectable()
export class TransactionsService {
  constructor(private readonly prisma: PrismaService) {}

  create(dto: CreateTransactionDto) {
    const data: Prisma.TransactionCreateInput = {
      userId: dto.userId,
      accountId: dto.accountId,
      categoryId: dto.categoryId,
      type: dto.type,
      amount: new Prisma.Decimal(dto.amount),
      description: dto.description || '',
      date: new Date(dto.date),
      recurring: dto.recurring ?? false,
      recurringFrequency: dto.recurringFrequency ?? null,
    };

    return this.prisma.transaction.create({ data });
  }

  findAll(filter: FilterTransactionDto) {
    const where: Prisma.TransactionWhereInput = {};

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

    const data: Prisma.TransactionUpdateInput = {};
    
    if (dto.userId !== undefined) data.userId = dto.userId;
    if (dto.accountId !== undefined) data.accountId = dto.accountId;
    if (dto.categoryId !== undefined) data.categoryId = dto.categoryId;
    if (dto.type !== undefined) data.type = dto.type;
    if (dto.amount !== undefined) data.amount = new Prisma.Decimal(dto.amount);
    if (dto.description !== undefined) data.description = dto.description;
    if (dto.date !== undefined) data.date = new Date(dto.date);
    if (dto.recurring !== undefined) data.recurring = dto.recurring;
    if (dto.recurringFrequency !== undefined) data.recurringFrequency = dto.recurringFrequency;

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
    const where: Prisma.TransactionWhereInput = { recurring: true };
    if (userId) where.userId = userId;

    return this.prisma.transaction.findMany({
      where,
      orderBy: { date: 'desc' },
    });
  }
}