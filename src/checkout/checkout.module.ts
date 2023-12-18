import { Module } from '@nestjs/common';
import { CheckoutService } from './checkout.service';
import { CheckoutController } from './checkout.controller';
import { PrismaService } from '../lib/prisma.service';

@Module({
  controllers: [CheckoutController],
  providers: [CheckoutService , PrismaService]
})
export class CheckoutModule {}
