import { Module } from '@nestjs/common';
import { UploadService } from './upload.service';
import { UploadController } from './upload.controller';
import { FileUploadService } from 'src/lib/multer.service';
import { MulterModule } from '@nestjs/platform-express/multer';
import { PrismaService } from 'src/lib/prisma.service';
@Module({
  imports:[
    MulterModule.registerAsync({
      useClass: FileUploadService,
    }),
  ],
  providers: [UploadService,PrismaService],
  controllers: [UploadController]
})
export class UploadModule {}
