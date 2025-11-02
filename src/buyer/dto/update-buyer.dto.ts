import { IsString, IsOptional, IsEmail, IsBoolean } from 'class-validator';


export class UpdateBuyerDto {
@IsOptional()
@IsString()
name?: string;


@IsOptional()
@IsEmail()
email?: string;


@IsOptional()
@IsString()
address?: string;


@IsOptional()
@IsBoolean()
isActive?: boolean;
}