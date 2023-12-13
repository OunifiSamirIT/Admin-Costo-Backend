export class CreateProductDto {
    title: string;
    description: string;
    price: string;
    discountPercentage: string;
    rating: string;
    stock: string;
    brand: string;
    category: string;
    thumbnail: string;
    images: CreateProductImageDto[];
    checkoutId?: number;
  }
  
  export class CreateProductImageDto {
    url: string;
  }
  