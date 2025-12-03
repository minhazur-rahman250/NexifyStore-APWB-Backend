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
 
   
  @IsString()
  @IsNotEmpty()
  sellerId: string;
}