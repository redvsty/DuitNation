import { Controller, Get, Query } from '@nestjs/common';
import { AnalyticsService } from './analytics.service';

@Controller('analytics')
export class AnalyticsController {
  constructor(private readonly analyticsService: AnalyticsService) {}

  // GET /api/analytics/cashflow?userId=...&from=YYYY-MM-DD&to=YYYY-MM-DD
  @Get('cashflow')
  getCashflow(
    @Query('userId') userId: string,
    @Query('from') from?: string,
    @Query('to') to?: string,
  ) {
    return this.analyticsService.getCashflow({ userId, from, to });
  }

  // GET /api/analytics/expenses?userId=...&from=...&to=...
  @Get('expenses')
  getExpenseBreakdown(
    @Query('userId') userId: string,
    @Query('from') from?: string,
    @Query('to') to?: string,
  ) {
    return this.analyticsService.getExpenseBreakdown({ userId, from, to });
  }

  // GET /api/analytics/income?userId=...&from=...&to=...
  @Get('income')
  getIncomeBreakdown(
    @Query('userId') userId: string,
    @Query('from') from?: string,
    @Query('to') to?: string,
  ) {
    return this.analyticsService.getIncomeBreakdown({ userId, from, to });
  }

  // GET /api/analytics/summary?userId=...&from=...&to=...
  @Get('summary')
  getSummary(
    @Query('userId') userId: string,
    @Query('from') from?: string,
    @Query('to') to?: string,
  ) {
    return this.analyticsService.getSummary({ userId, from, to });
  }

  // GET /api/analytics/trends?userId=...&months=6
  @Get('trends')
  getTrends(
    @Query('userId') userId: string,
    @Query('months') months?: string,
  ) {
    return this.analyticsService.getTrends({ userId, months: months ? Number(months) : 6 });
  }

  // GET /api/analytics/comparison?userId=...&from=2025-01&to=2025-02
  @Get('comparison')
  getComparison(
    @Query('userId') userId: string,
    @Query('from') from: string,
    @Query('to') to: string,
  ) {
    return this.analyticsService.getComparison({ userId, from, to });
  }
}
