// product.dto.ts
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
    images: string[]; // Assuming you are passing an array of image URLs
  }
  