// src/common/pipes/date-validation.pipe.ts
import { Injectable, PipeTransform, BadRequestException } from '@nestjs/common';

@Injectable()
export class DateValidationPipe implements PipeTransform {
  transform(value: any) {
    if (!value) throw new BadRequestException('Date is required');
    const date = new Date(value);
    if (isNaN(date.getTime())) {
      throw new BadRequestException('Invalid date format. Use ISO format YYYY-MM-DD or a valid date string.');
    }
    // optionally return normalized ISO string
    return date.toISOString();
  }
}
