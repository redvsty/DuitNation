import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { AnalyticsModule } from './analytics/analytics.module';

@Module({
  imports: [HttpModule, AnalyticsModule],
})
export class AppModule {}
