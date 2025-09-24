// src/main.ts
import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './app.module';
import cookieParser from 'cookie-parser'; // ✅ import default

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Cookie parser para leer cookies
  app.use(cookieParser());

  // Habilitar CORS si tu frontend está en otro dominio/puerto
  app.enableCors({
    origin: true, // o el dominio de tu frontend
    credentials: true, // necesario para cookies
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
