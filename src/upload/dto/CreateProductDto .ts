export class CreateProductDto {
    title: string;
    description: string;
    price: string;
    discountPercentage: string;
    rating: string;
    stock: string;
    Tag: string;
    category: string;
    Color: string;
    Taille: string;
    images: CreateProductImageDto[];
    checkoutId?: number;
  }
  
  export class CreateProductImageDto {
    url: string;
  }
  