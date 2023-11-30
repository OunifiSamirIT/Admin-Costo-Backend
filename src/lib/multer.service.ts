// import { Injectable } from '@nestjs/common';
// import {
//   MulterModuleOptions,
//   MulterOptionsFactory,
// } from '@nestjs/platform-express';
// import { diskStorage } from 'multer';
// import path from 'path';

// FileUploadService
import { Injectable } from '@nestjs/common';
import { MulterModuleOptions, MulterOptionsFactory } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import path from 'path';
import {extname} from 'path';
@Injectable()
export class FileUploadService implements MulterOptionsFactory {
  createMulterOptions(): MulterModuleOptions {
    return {
      storage: diskStorage({
        destination: './images',
        filename: (req, file, callback) => {
          const randomName = Array(32)
            .fill(null)
            .map(() => Math.round(Math.random() * 16).toString(16))
            .join('');

          const originalname = file.originalname || ''; // Ensure originalname exists
          const originalExt = extname(originalname);
          
          callback(null, `${randomName}${originalExt}`);
        },
      }),
      limits: {
        fileSize: 1000000,
      },
      fileFilter: (req, file, callback) => {
        const fileType = /jpeg|png|jpg/;
        const originalname = file.originalname || ''; // Ensure originalname exists
        const ext = fileType.test(extname(originalname));
        
        if (ext) {
          callback(null, true);
        } else {
          return callback(new Error('Invalid mime type'), false);
        }
      },
    };
  }
}
