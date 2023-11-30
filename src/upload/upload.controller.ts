
import { Controller, Get, Param, Post, Res, UploadedFile, UseInterceptors, Body, UploadedFiles } from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { UploadService } from './upload.service'; 
import { CreateProductDto } from './dto/CreateProductDto ';

@Controller('upload')
export class UploadController {
    constructor(private readonly uploadService: UploadService) {}

    @Post()
  @UseInterceptors(FilesInterceptor('files', 5)) // 'files' is the field name, 5 is the max number of files
  async addProductWithImages(
    @UploadedFiles() files: Express.Multer.File[],
    @Body() createProductDto: CreateProductDto,
  ) {
    if (!files || files.length === 0) {
      console.log('No files uploaded');
      return;
    }

    for (const file of files) {
      if (file instanceof Error) {
        console.error('Error uploading file:', file.message);
        return;
      }
    }

    const uploadedImages = await this.uploadService.uploadImages(files);

    const product = await this.uploadService.createProduct(createProductDto, uploadedImages);

    console.log('Product created:', product);
  }
  

}
