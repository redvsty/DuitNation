import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ProxyModule } from './proxy/proxy.module';

@Module({
  imports: [HttpModule, ProxyModule]
})
export class AppModule {}
