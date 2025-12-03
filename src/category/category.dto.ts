import { IsNotEmpty, IsOptional, IsString, MaxLength } from 'class-validator';
 
export class CategoryDto {
  @IsOptional()
  id?: number;
 
  @IsString()
  @IsNotEmpty()
  @MaxLength(100)
  name: string;
 
  @IsString()
  @IsOptional()
  description?: string;
}