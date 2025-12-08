import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['error', 'warn', 'log', 'debug'],
  });
  
  // Enable CORS for frontend
  app.enableCors({
    origin: [
      'http://localhost:3007',
      'http://frontend:3000',
      'http://localhost:3000',
    ],
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'Accept'],
  });
  
  app.setGlobalPrefix('api');
  
  await app.listen(3000);
  console.log('=======================================');
  console.log('🚀 Gateway running on port 3000');
  console.log('📡 API available at http://localhost:3000/api');
  console.log('=======================================');
}
bootstrap();