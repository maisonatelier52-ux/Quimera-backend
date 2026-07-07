import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const allowedOrigins = process.env.NODE_ENV === 'production'
    ? ['https://quimera-eight.vercel.app']
    : ['http://localhost:3000', 'http://127.0.0.1:3000'];

  app.enableCors({
    origin: process.env.FRONTEND_URL || allowedOrigins,
    credentials: true,
  });
  await app.listen(process.env.PORT ?? 5000);
}
bootstrap();
