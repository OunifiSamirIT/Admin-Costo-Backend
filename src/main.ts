import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger('MAIN');
  app.setGlobalPrefix('/api'); 
  const port = process.env.PORT;
  await app.listen(port);
  logger.log(`server run on port ${port}`);
}
bootstrap();
