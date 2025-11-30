//buyer.dto.ts
import {
  IsEmail,
  IsOptional,
  IsString,
  Matches,
  IsNotEmpty,
  MinLength,
} from 'class-validator';

export class BuyerDto {
  @IsOptional()
  id?: number;

  // name (fullName) is nullable in entity, but when provided validate chars
  @IsOptional()
  @IsString()
  @Matches(/^[A-Za-z\s]+$/, {
    message: 'Name must contain only alphabets and spaces',
  })
  name?: string;

  // Email required (your earlier code required .xyz domain); keep that behavior
  @IsNotEmpty()
  @IsEmail({}, { message: 'Invalid email format' })
  @Matches(/^[\w.+-]+@[\w-]+\.(xyz)$/, {
    message: 'Email must be a valid address and use .xyz domain',
  })
  email: string;

  @IsNotEmpty()
  @IsString()
  address: string;

  //@IsNotEmpty()
  @IsString()
  phone: string;

  // NID required for register-with-nid route
  @IsOptional()
  @IsString()
  @Matches(/^\d{10,17}$/, {
    message: 'NID must be numeric and between 10 and 17 digits',
  })
  nidNumber?: string;
}
