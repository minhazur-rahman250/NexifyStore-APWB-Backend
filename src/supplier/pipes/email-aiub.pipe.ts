// src/supplier/pipes/email-aiub.pipe.ts
import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class EmailAiubPipe implements PipeTransform {
  transform(value: any) {
    if (!value || typeof value !== 'string') {
      throw new BadRequestException('Email is required');
    }
    
    if (!value.includes('@aiub.edu')) {
      throw new BadRequestException('Email must contain aiub.edu domain');
    }
    
    return value;
  }
}