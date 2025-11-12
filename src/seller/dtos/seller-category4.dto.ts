// src/seller/dtos/seller-category4.dto.ts
import { IsNotEmpty, Matches } from 'class-validator';

export class SellerCategory4Dto {
  @IsNotEmpty({ message: 'Name is required' })
  // ensures there are no numeric characters in name
  @Matches(/^[^\d]+$/, { message: 'Name must not contain numbers' })
  name: string;

  @IsNotEmpty({ message: 'Password is required' })
  // must contain at least one of @ # $ &
  @Matches(/.*[@#$&].*/, { message: 'Password must contain at least one special character (@, #, $, &)' })
  password: string;

  @IsNotEmpty({ message: 'dateOfBirth is required' })
  // will be validated by DateValidationPipe in controller
  dateOfBirth: string;

  @IsNotEmpty({ message: 'socialLink is required' })
  // will be validated by UrlValidationPipe in controller
  socialLink: string;
}
