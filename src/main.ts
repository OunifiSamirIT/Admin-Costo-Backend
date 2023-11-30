import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';



async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger('MAIN');


 const corsOptions: CorsOptions = {
    origin: 'http://localhost:3000', 
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  };

  app.enableCors(corsOptions);


  app.setGlobalPrefix('/api'); 
  const port = process.env.PORT;
  await app.listen(port);
  logger.log(`server run on port ${port}`);


 




}
bootstrap();
