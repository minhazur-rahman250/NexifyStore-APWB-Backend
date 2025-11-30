import { IsEmail, IsOptional, IsString, Matches, IsNotEmpty, MinLength, } from 'class-validator';


export class BuyerDto {
  @IsOptional()
  id?: number;

  // ========== NAME VALIDATION ==========
  @IsOptional()
  @IsString()
  @Matches(/^[A-Za-z\s]+$/, {
    message: 'Name must contain only alphabets and spaces',
  })
  name?: string;

  // ========== EMAIL VALIDATION (.xyz domain required) ==========
  @IsNotEmpty()
  @IsEmail({}, { message: 'Invalid email format' })
  @Matches(/^[\w.+-]+@[\w-]+\.(xyz)$/, {
    message: 'Email must be a valid address and use .xyz domain',
  })
  email: string;

  // ========== ADDRESS VALIDATION ==========
  @IsNotEmpty()
  @IsString()
  address: string;

  // ========== PHONE VALIDATION ==========
  @IsString()
  phone: string;

  // ========== NID NUMBER VALIDATION ==========
  @IsOptional()
  @IsString()
  @Matches(/^\d{10,17}$/, {
    message: 'NID must be numeric and between 10 and 17 digits',
  })
  nidNumber?: string;
}
