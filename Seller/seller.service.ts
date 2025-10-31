import { Injectable } from '@nestjs/common';

@Injectable()
export class SellerService {
  getHello(): string {
    return 'Hello World!';
  }
}
