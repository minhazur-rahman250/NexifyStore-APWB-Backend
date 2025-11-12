import { IsEmail, IsOptional, IsString, Matches  } from 'class-validator';


export class BuyerDto {
  
  @IsOptional()
  id?: number;

   // Name should contain only alphabets and spaces
  @IsString()
  @Matches(/^[A-Za-z\s]+$/, {
    message: 'Name must contain only alphabets and spaces',
  })
  name: string;  
  
   
  // Email required and must have .xyz domain (as per lab spec)
  @IsEmail({}, { message: 'Invalid email format' })
  @Matches(/^[\w.+-]+@[\w-]+\.(xyz)$/, {
    message: 'Email must be a valid address and use .xyz domain',
  })
  email: string;
   
  
  @IsString()
  address: string;
  
  // phone kept as string; category 1 didn't constrain phone format specifically
  @IsString()
  phone: string;

  // NID related fields (NID number validated; file handled in controller)
  @IsString()
  @Matches(/^\d{10,17}$/, {
    message: 'NID must be numeric and between 10 and 17 digits',
  })
  nidNumber: string;
  
  
}
