import { Body, Controller, Delete, Get, Param, Patch, Post, Query } from '@nestjs/common';
import { GoalsService } from './goals.service';
import { CreateGoalDto } from './dto/create-goal.dto';
import { UpdateGoalDto } from './dto/update-goal.dto';
import { UpdateGoalProgressDto } from './dto/update-goal-progress.dto';

@Controller('goals')
export class GoalsController {
  constructor(private readonly goalsService: GoalsService) {}

  // POST /api/goals
  @Post()
  create(@Body() dto: CreateGoalDto) {
    return this.goalsService.create(dto);
  }

  // GET /api/goals
  @Get()
  findAll(@Query('userId') userId?: string) {
    return this.goalsService.findAll(userId);
  }

  // GET /api/goals/:id
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.goalsService.findOne(id);
  }

  // PATCH /api/goals/:id
  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: UpdateGoalDto) {
    return this.goalsService.update(id, dto);
  }

  // DELETE /api/goals/:id
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.goalsService.remove(id);
  }

  // PATCH /api/goals/:id/progress
  // body bisa "current" langsung, atau "increment"
  @Patch(':id/progress')
  updateProgress(@Param('id') id: string, @Body() dto: UpdateGoalProgressDto) {
    return this.goalsService.updateProgress(id, dto);
  }
}
