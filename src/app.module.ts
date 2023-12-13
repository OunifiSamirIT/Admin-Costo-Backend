import {  Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ProductModule } from './product/product.module';
import { UploadModule } from './upload/upload.module';
import { CheckoutModule } from './checkout/checkout.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath:
        process.env.NODE_ENV === 'production'
          ? '.env.production'
          : '.env.development',
    }),
    UsersModule,
    AuthModule,
    ProductModule,
    UploadModule,
    CheckoutModule,
    
  ],
})
export class AppModule {}
