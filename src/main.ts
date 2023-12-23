import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import * as express from 'express';
import { join } from 'path';
import * as dotenv from 'dotenv';
import { hostname } from 'os';

async function bootstrap() {
  dotenv.config();
  const app = await NestFactory.create(AppModule);
  const logger = new Logger('MAIN');

  app.use('/src/public', express.static(join(__dirname, '..', '/src/public')));

  const corsOptions: CorsOptions = {
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  };

  app.enableCors(corsOptions);

  app.setGlobalPrefix('/api');

  const port = process.env.PORT || 5000; 
  await app.listen(port , '0.0.0.0');
  logger.log(`Server running on port ${port}`);
}

bootstrap();
