// src/pipes/validation.pipes.ts
import { PipeTransform, Injectable, BadRequestException, ArgumentMetadata } from '@nestjs/common';

@Injectable()
export class ValidateDatePipe implements PipeTransform<string, Date> {
  transform(value: string, metadata: ArgumentMetadata): Date {
    if (!value) {
      throw new BadRequestException(`${metadata.data || 'date'} is required`);
    }

    // Try parse ISO date or common formats
    const d = new Date(value);
    if (isNaN(d.getTime())) {
      throw new BadRequestException(`${metadata.data || 'date'} is not a valid date`);
    }
    return d;
  }
}
