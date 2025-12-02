 import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bodyParser: true,
  });

  // ========== GLOBAL VALIDATION PIPE ==========
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      stopAtFirstError: false,
    }),
  );

  // ========== ENABLE CORS ==========
  app.enableCors({
    origin: '*',
    credentials: true,
  });

  // ========== CUSTOM MIDDLEWARE ==========
  app.use((req, res, next) => {
    // Clean GET request body
    if (req.method === 'GET') {
      req.body = {};
    }
    next();
  });

  await app.listen(7000);
  console.log('NexifyStore - Buyer Service running on http://localhost:7000');
}
bootstrap();
