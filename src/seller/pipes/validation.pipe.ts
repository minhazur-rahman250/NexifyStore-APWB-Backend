// src/pipes/validation.pipes.ts
import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class UserValidationPipe implements PipeTransform {
  transform(value: any) {
    if (!value) {
      throw new BadRequestException('Body is required');
    }

    const { fullName, age } = value;

    if (!fullName || typeof fullName !== 'string' || fullName.trim().length === 0) {
      throw new BadRequestException('fullName is required and must be a non-empty string');
    }
    if (fullName.length > 100) {
      throw new BadRequestException('fullName must be at most 100 characters');
    }

    if (age === undefined || age === null) {
      throw new BadRequestException('age is required');
    }

    const numericAge = typeof age === 'string' ? parseInt(age, 10) : age;
    if (!Number.isInteger(numericAge) || numericAge < 1) {
      throw new BadRequestException('age must be a positive integer');
    }

    return { ...value, fullName: fullName.trim(), age: numericAge };
  }
}
