import { IsArray, IsInt, IsNotEmpty, IsNumber, IsString, Min, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';
 
export class OrderItemInputDto {
  @IsInt()
  @Min(1)
  productId: number;
 
  @IsInt()
  @Min(1)
  quantity: number;
 
  @IsNumber()
  @Min(0)
  price: number;
}
 
export class CreateOrderDto {
  @IsString()
  @IsNotEmpty()
  buyerId: string;
 
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => OrderItemInputDto)
  items: OrderItemInputDto[];
}