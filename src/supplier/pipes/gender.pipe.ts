// src/supplier/pipes/gender.pipe.ts
import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class GenderValidationPipe {
  private readonly allowedGenders = ['male', 'female'];

  transform(value: any) {
    if (!value) {
      throw new BadRequestException('Gender is required');
    }

    const gender = value.toLowerCase();
    if (!this.allowedGenders.includes(gender)) {
      throw new BadRequestException('Gender must be either male or female');
    }

    return gender;
  }
}