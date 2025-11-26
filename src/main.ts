import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bodyParser: true 
  });

  
  app.use((req, res, next) => {
    if (req.method === 'GET') {
      req.body = {};  
    }
    next();
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    })
  );

  await app.listen(7000);
  console.log('Server running on http://localhost:7000');
}
bootstrap();
