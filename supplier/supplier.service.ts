import { Injectable } from '@nestjs/common';

@Injectable()
export class SupplierService {
  getHello(): string {
    return 'Hello World!';
  }
}
