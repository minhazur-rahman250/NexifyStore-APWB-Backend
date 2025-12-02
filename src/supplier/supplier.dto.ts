import {
  IsEmail,
  IsNotEmpty,
  IsString,
  MinLength,
  Matches,
  IsEnum,
  IsOptional,
  IsDateString,
  MaxLength,
} from 'class-validator';

export enum Gender {
  MALE = 'male',
  FEMALE = 'female',
}

// ========== BASE SUPPLIER DTO (Common for All Categories) ==========
export class SupplierDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  @MinLength(6)
  @Matches(/(?=.*[A-Z])/, {
    message: 'Password must contain at least one uppercase letter',
  })
  password?: string;

  @IsOptional()
  @IsEnum(Gender, {
    message: 'Gender must be either male or female',
  })
  gender?: Gender;

  @IsOptional()
  @Matches(/^[0-9]+$/, {
    message: 'Phone number must contain only numbers',
  })
  contactNumber?: string;

  @IsNotEmpty()
  @IsString()
  address: string;

  profileImage?: string;
  category?: string;
}

// ========== CATEGORY 2 DTO (AIUB Email, Strict Validation) ==========
export class Category2SupplierDto extends SupplierDto {
  @Matches(/@aiub\.edu$/, {
    message: 'Email must contain aiub.edu domain',
  })
  declare email: string;

  @MinLength(6)
  @Matches(/(?=.*[A-Z])/, {
    message: 'Password must contain at least one uppercase letter',
  })
  declare password: string;

  @IsEnum(Gender, {
    message: 'Gender must be either male or female',
  })
  declare gender: Gender;

  @Matches(/^[0-9]+$/, {
    message: 'Phone number must contain only numbers',
  })
  declare contactNumber: string;
}

// ========== CATEGORY 4 DTO (TypeORM) ==========
export class Category4SupplierDto {
  @IsOptional()
  @IsString()
  @MaxLength(30)
  country?: string;

  @IsOptional()
  @IsDateString()
  joiningDate?: string;
}
