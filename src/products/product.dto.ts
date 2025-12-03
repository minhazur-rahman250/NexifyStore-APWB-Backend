import { IsInt, IsNotEmpty, IsNumber, IsOptional, IsString, Min } from 'class-validator';
 
export class ProductDto {
  @IsString()
  @IsNotEmpty()
  name: string;
 
  @IsNumber()
  @Min(0)
  price: number;
 
  @IsInt()
  @Min(0)
  stock: number;
 
  // কোন seller এর product
  @IsString()
  @IsNotEmpty()
  sellerId: string;
}