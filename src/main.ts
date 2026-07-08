import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from '@nestjs/platform-express';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.set('trust proxy', 1);

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
