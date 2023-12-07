import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/CreateProductDto ';
import { Product } from '@prisma/client';
import { PrismaService } from 'src/lib/prisma.service';

@Injectable()
export class UploadService {
    constructor(private readonly prismaService: PrismaService) {}

    async uploadImages(files: Express.Multer.File[]): Promise<string[]> {
       
      
        const uploadedImages: string[] = [];
      
        for (const file of files) {
          uploadedImages.push(`./images/${file.filename}`);
        }
      
        return uploadedImages;
      }
  
    async createProduct(createProductDto: CreateProductDto, imageUrls: string[]): Promise<Product> {

        const product = await this.prismaService.product.create({
        data: {
          title: createProductDto.title,
          description: createProductDto.description,
          price: createProductDto.price,
          discountPercentage: createProductDto.discountPercentage,
          rating: createProductDto.rating,
          stock: createProductDto.stock,
          brand: createProductDto.brand,
          category: createProductDto.category,
          thumbnail: createProductDto.thumbnail,
          images: {
            create: imageUrls.map(url => ({ url })),
          },
        },
      });
  
      return product;
    }


    async getAllProducts(): Promise<{ product: Product; firstImageUrl: string }[]> {
      const products = await this.prismaService.product.findMany({
          include: {
              images: {
                  select: {
                      url: true,
                  },
                
              },
          },
      });

      return products.map(product => ({
          product,
          firstImageUrl: product.images.length > 0 ? product.images[0].url : null,
      }));
  }
}
