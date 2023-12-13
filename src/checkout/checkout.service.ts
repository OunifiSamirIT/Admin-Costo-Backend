// checkout/service/checkout.service.ts

import { Injectable } from '@nestjs/common';
import { CreateCheckoutDto } from './dto/create-checkout.dto';
import { PrismaService } from 'src/lib/prisma.service';
import { Checkout } from '@prisma/client';

@Injectable()
export class CheckoutService {
  constructor(private readonly prismaService: PrismaService) {}

  async createOrder(createOrderDto: CreateCheckoutDto) {
    const { name, phone, email, address, governorate, delivery, products, total } = createOrderDto;

    const newOrder = await this.prismaService.checkout.create({
      data: {
        name,
        phone,
        email,
        address,
        governorate,
        delivery,
        total,
        products: {
          create: products.map((product) => ({
            title: product.title,
            description: product.description,
            price: product.price,
            discountPercentage: product.discountPercentage,
            rating: product.rating,
            stock: product.stock,
            brand: product.brand,
            category: product.category,
            thumbnail: product.thumbnail,
            images: {
              create: product.images.map((image) => ({ url: image.url })),
            },
          })),
        },
      },
    });
    console.log('create created:', newOrder);

    return newOrder;
  }
}
