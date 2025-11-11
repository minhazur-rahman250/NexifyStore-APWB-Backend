// src/common/pipes/url-validation.pipe.ts
import { Injectable, PipeTransform, BadRequestException } from '@nestjs/common';

@Injectable()
export class UrlValidationPipe implements PipeTransform {
  transform(value: any) {
    if (!value) throw new BadRequestException('URL is required');
    try {
      const url = new URL(value);
      if (!['http:', 'https:'].includes(url.protocol)) {
        throw new BadRequestException('URL must use http or https protocol');
      }
      return value;
    } catch (err) {
      throw new BadRequestException('Invalid URL format');
    }
  }
}
