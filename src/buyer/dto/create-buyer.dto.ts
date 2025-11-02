import { IsString, IsNotEmpty, IsEmail, IsOptional, IsBoolean } from 'class-validator';


export class CreateBuyerDto {
@IsString()
@IsNotEmpty()
name: string;


@IsEmail()
email: string;


@IsOptional()
@IsString()
address?: string;


@IsOptional()
@IsBoolean()
isActive?: boolean;
}