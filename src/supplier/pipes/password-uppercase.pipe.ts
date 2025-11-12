// src/supplier/pipes/password-uppercase.pipe.ts
import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class PasswordUppercasePipe implements PipeTransform {
  transform(value: any) {
    if (!value || typeof value !== 'string') {
      throw new BadRequestException('Password is required');
    }
    
    if (value.length < 6) {
      throw new BadRequestException('Password must be at least 6 characters long');
    }
    
    if (!/(?=.*[A-Z])/.test(value)) {
      throw new BadRequestException('Password must contain at least one uppercase letter');
    }
    
    return value;
  }
}