import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { PrismaService } from '../lib/prisma.service';
import { Product } from '@prisma/client';

@Injectable()
export class ProductService {
  constructor(private readonly prismaService: PrismaService) {}

  create(createProductDto: CreateProductDto) {
    return 'This action adds a new product';
  }

  async findAll(): Promise<Product[]> {
    const products = await this.prismaService.product.findMany({
      where: {
        checkoutId: null,
      },
      include: {
        images: true,
      },
    });

    return products;
  }
  
  async findByCategory(category: string): Promise<Product[]> {
    const products = await this.prismaService.product.findMany({
      where: {
        checkoutId: null,
        category: category,
      },
      include: {
        images: true,
      },
    });

    return products;
  }

  async findOne(id: number): Promise<Product> {
    const product = await this.prismaService.product.findUnique({
      where: { id },
      include: {
        images: true,
      },
    });

    if (!product) {
      throw new NotFoundException(`Product with id ${id} not found`);
    }

    return product;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  async remove(id: number) {
    try {
      const product = await this.prismaService.product.findUnique({
        where: { id },
        include: {
          images: true,
        },
      });

      if (!product) {
        throw new NotFoundException(`Product with id ${id} not found`);
      }

      await this.prismaService.productImage.deleteMany({
        where: {
          productId: id,
        },
      });

      await this.prismaService.product.delete({
        where: { id },
      }); 

      return `Product with id ${id} and its related images removed successfulyy`;
    } catch (error) {
      throw new Error(`Error removing product: ${error.message}`);
    }
  }
}
