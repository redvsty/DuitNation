import { Module } from '@nestjs/common';
import { GoalsController } from './goals.controller';
import { GoalsService } from './goals.service';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [GoalsController],
  providers: [GoalsService, PrismaService],
  exports: [GoalsService],
})
export class GoalsModule {}
