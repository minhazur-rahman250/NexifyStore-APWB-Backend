import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bodyParser: true,
  });

  // Clean GET request body
  app.use((req, res, next) => {
    if (req.method === 'GET') {
      req.body = {};
    }
    next();
  });

  // Global Validation Pipe
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  // Enable CORS
  app.enableCors();

  await app.listen(7000);
  console.log('Supplier Service running on http://localhost:7000');
}
bootstrap();
