import {
  IsString,
  IsNotEmpty,
  IsNumberString,
  IsOptional,
  Matches,
  IsUrl,
  IsDateString,
  IsInt,
  Min,
  IsIn,
} from 'class-validator';

// ========== PRODUCT DTO ==========
export class ProductDto {
  @IsString()
  @IsNotEmpty()
  @Matches(/^[A-Za-z\s]+$/, {
    message: 'name must contain only letters and spaces (no numbers allowed)',
  })
  name: string;

  @IsNumberString({}, { message: 'price must be numeric' })
  @IsOptional()
  price: number;

  @IsNumberString({}, { message: 'stock must be numeric' })
  @IsOptional()
  stock: number;

  @IsString()
  @IsOptional()
  category: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsDateString({}, { message: 'date must be a valid ISO date string (YYYY-MM-DD or full ISO)' })
  @IsOptional()
  addedDate?: string;

  @IsUrl({}, { message: 'socialLink must be a valid URL (include http/https)' })
  @IsOptional()
  socialLink?: string;

  @IsString()
  @IsNotEmpty({ message: 'password is required' })
  @Matches(/^(?=.*[@#$&]).+$/, {
    message: 'password must contain at least one special character (@, #, $, &)',
  })
  @IsOptional()
  password?: string;
}

// ========== USER DTO ==========
export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  fullName: string;

  @IsInt()
  @Min(1)
  age: number;
}

export class UpdateStatusDto {
  @IsString()
  @IsIn(['active', 'inactive'])
  status: 'active' | 'inactive';
}
