import { IsInt, IsNotEmpty, IsString, Max, Min } from 'class-validator';
 
export class CreateReviewDto {
  @IsString()
  @IsNotEmpty()
  buyerId: string;
 
  @IsInt()
  @Min(1)
  productId: number;
 
  @IsInt()
  @Min(1)
  @Max(5)
  rating: number;
 
  @IsString()
  @IsNotEmpty()
  comment: string;
}