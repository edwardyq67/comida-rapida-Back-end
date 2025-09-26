// src/main.ts
import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';
import cookieParser from 'cookie-parser';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Cookie parser para leer cookies
  app.use(cookieParser());

  // Configuración CORS ESPECÍFICA para tu frontend
  app.enableCors({
    origin: [
      'http://localhost:3000', // Desarrollo local
      'https://comida-rapida-front-end.vercel.app', // TU FRONTEND
    ],
    credentials: true, // ← CRÍTICO para cookies
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: [
      'Content-Type',
      'Authorization',
      'X-Requested-With',
      'Cookie',
      'Set-Cookie',
    ],
  });

  const configService = app.get(ConfigService);
  const port = configService.get<number>('PORT');

  if (!port) {
    throw new Error('PORT environment variable is required');
  }

  await app.listen(port);
  console.log(`🚀 Application is running on: http://localhost:${port}`);
}

bootstrap().catch((error) => {
  console.error('Application failed to start:', error.message);
  process.exit(1);
});
