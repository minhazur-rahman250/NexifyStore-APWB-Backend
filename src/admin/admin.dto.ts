import { IsNotEmpty, Matches, MinLength, MaxLength } from 'class-validator';

export class AdminDto {
  id?: number;

  @IsNotEmpty()
  @Matches(/^[a-zA-Z\s]+$/)
  @MaxLength(150)
  name: string;

  @IsNotEmpty()
  @MaxLength(100)
  username: string;

  @IsNotEmpty()
  @MaxLength(150)
  fullName: string;

  isActive?: boolean;

  @IsNotEmpty()
  @MaxLength(100)
  email: string;

  @IsNotEmpty()
  @MinLength(6)
  password: string;

  @IsNotEmpty()
  @Matches(/^01\d{9}$/)
  phone: string;

  file?: Express.Multer.File;
  fileName?: string | null;
}