import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  // Enable CORS for frontend
  app.enableCors({
    origin: ['http://localhost:3007', 'http://frontend:3000'],
    credentials: true,
  });
  
  app.setGlobalPrefix('api');
  await app.listen(3000);
  console.log('Gateway running on port 3000');
}
bootstrap();