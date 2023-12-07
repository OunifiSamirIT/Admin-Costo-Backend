import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { ProductController } from './product.controller';
import { PrismaService } from 'src/lib/prisma.service';
import { AnyFilesInterceptor } from '@nestjs/platform-express';
import { UploadService } from 'src/upload/upload.service';

@Module({
  controllers: [ProductController],
  providers: [ProductService , PrismaService ,UploadService]
})
export class ProductModule {}
