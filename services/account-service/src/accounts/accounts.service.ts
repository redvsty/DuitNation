import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateAccountDto } from './dto/create-account.dto';
import { UpdateAccountDto } from './dto/update-account.dto';

@Injectable()
export class AccountsService {
  constructor(private readonly prisma: PrismaService) {}

  create(dto: CreateAccountDto) {
    return this.prisma.account.create({ data: dto });
  }

  findAll() {
    return this.prisma.account.findMany();
  }

  async findOne(id: string) {
    const acc = await this.prisma.account.findUnique({ where: { id } });
    if (!acc) throw new NotFoundException('Account not found');
    return acc;
  }

  async update(id: string, dto: UpdateAccountDto) {
    await this.findOne(id);
    return this.prisma.account.update({ where: { id }, data: dto });
  }

  async remove(id: string) {
    await this.findOne(id);
    return this.prisma.account.delete({ where: { id } });
  }

  async updateBalance(id: string, balance: string) {
    await this.findOne(id);
    return this.prisma.account.update({
      where: { id },
      data: { balance: balance as any }
    });
  }
}
