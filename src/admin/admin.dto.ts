import { IsNotEmpty, Matches, MinLength, IsString } from 'class-validator';

export class AdminDto {
    id?: number;

    @IsNotEmpty({ message: 'Name is required.' })
    @Matches(/^[a-zA-Z\s]+$/, { message: 'Name must not contain special characters.' })
    name: string;

    @IsNotEmpty({ message: 'Email is required.' })
    email: string;

    @IsNotEmpty({ message: 'Password is required.' })
    @MinLength(6, { message: 'Password must be at least 6 characters long.' })
    @Matches(/^(?=.*[a-z]).*$/, { message: 'Password must contain at least one lowercase character.' })
    password: string;

    @IsNotEmpty({ message: 'Phone number is required.' })
    @Matches(/^01\d{9}$/, { message: 'Phone number must start with 01 and be 11 digits long.' })
    phone: string;

    file?: Express.Multer.File; // for PDF upload, validated in controller
}


