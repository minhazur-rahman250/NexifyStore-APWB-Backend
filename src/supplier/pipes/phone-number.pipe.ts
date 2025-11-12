// src/supplier/pipes/phone-number.pipes.ts
import { PipeTransform, Injectable, BadRequestException } from '@nestjs/common';

@Injectable()
export class PhoneNumberPipe  {
  transform(value: any) {
    if (!value) {
      throw new BadRequestException('Phone number is required');
    }

    const phoneString = value.toString();
    if (!/^[0-9]+$/.test(phoneString)) {
      throw new BadRequestException('Phone number must contain only numbers');
    }

    return phoneString;
  }
}