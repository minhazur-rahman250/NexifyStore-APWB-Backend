// src/supplier/dto/supplier-category2.dto.ts
import { IsEmail, IsNotEmpty, IsString, MinLength, Matches, IsEnum } from 'class-validator';

export enum Gender {
  MALE = 'male',
  FEMALE = 'female',
}

export class SupplierCategory2Dto {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsEmail()
  @Matches(/@aiub\.edu$/, {
    message: 'Email must contain aiub.edu domain'
  })
  email: string;

  @IsNotEmpty()
  @IsString()
  @MinLength(6)
  @Matches(/(?=.*[A-Z])/, {
    message: 'Password must contain at least one uppercase letter'
  })
  password: string;

  @IsNotEmpty()
  @IsEnum(Gender, {
    message: 'Gender must be either male or female'
  })
  gender: Gender;

  @IsNotEmpty()
  @Matches(/^[0-9]+$/, {
    message: 'Phone number must contain only numbers'
  })
  contactNumber: string;

  @IsNotEmpty()
  @IsString()
  address: string;
}