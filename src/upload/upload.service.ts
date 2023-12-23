import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/CreateProductDto ';
import { Product } from '.prisma/client';
import { PrismaService } from 'src/lib/prisma.service';

@Injectable()
export class UploadService {
  constructor(private readonly prismaService: PrismaService) {}

  async uploadImages(files: Express.Multer.File[]): Promise<string[]> {
    const uploadedImages: string[] = [];

    for (const file of files) {
      uploadedImages.push(`/src/public/${file.filename}`);
    }

    return uploadedImages;
  }

 

  async createProduct(
    createProductDto: CreateProductDto,
    imageUrls: string[],
  ): Promise<Product> {
    const productData = {
      title: createProductDto.title,
      description: createProductDto.description,
      price: createProductDto.price,
      discountPercentage: createProductDto.discountPercentage,
      rating: createProductDto.rating,
      stock: createProductDto.stock,
      Color: createProductDto.Color,
      category: createProductDto.category,
      Tag: createProductDto.Tag,
      Taille: createProductDto.Taille,
      images: {
        create: imageUrls.map((url) => ({ url })),
      },
      checkoutId: createProductDto.checkoutId,
    };

    if (createProductDto.checkoutId) {
      productData.checkoutId = createProductDto.checkoutId;
    }

    const product = await this.prismaService.product.create({
      data: productData,
    });

    return product;
  }
}
