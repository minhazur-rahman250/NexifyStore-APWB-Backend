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
// export class ProductDto {
//   @IsString()
//   @IsNotEmpty()
//   @Matches(/^[A-Za-z\s]+$/, {
//     message: 'name must contain only letters and spaces (no numbers allowed)',
//   })
//   name: string;

//   @IsNumberString({}, { message: 'price must be numeric' })
//   @IsOptional()
//   price: number;

//   @IsNumberString({}, { message: 'stock must be numeric' })
//   @IsOptional()
//   stock: number;

//   @IsString()
//   @IsOptional()
//   category: string;

//   @IsString()
//   @IsOptional()
//   description: string;

//   @IsDateString({}, { message: 'date must be a valid ISO date string' })
//   @IsOptional()
//   addedDate?: string;

//   @IsUrl({}, { message: 'socialLink must be a valid URL' })
//   @IsOptional()
//   socialLink?: string;
// }


export class ProductDto {
  @IsString()
  @IsNotEmpty()
  @Matches(/^[A-Za-z\s]+$/, { message: 'name must contain only letters and spaces' })
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

  @IsDateString({}, { message: 'date must be ISO date string' })
  @IsOptional()
  addedDate?: string;

  @IsUrl({}, { message: 'socialLink must be a valid URL' })
  @IsOptional()
  socialLink?: string;

  @IsInt()
  sellerId: number; // ✅ add sellerId
}


// ========== USER DTO ==========
export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  fullName: string;

  @IsInt()
  @Min(1)
  age: number;
  email: any;
  address: any;
  phone: any;
  nidNumber: any;
}

export class UpdateStatusDto {
  @IsString()
  @IsIn(['active', 'inactive'])
  status: 'active' | 'inactive';
}
