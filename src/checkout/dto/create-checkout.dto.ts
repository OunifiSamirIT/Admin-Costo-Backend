import { CreateProductDto } from 'src/product/dto/create-product.dto';

export class CreateCheckoutDto {
  name: string;

  phone: string;

  email: string;

  address: string;

  governorate: string;

  delivery: string;

  products: CreateProductDto[];

  total: number;
}
