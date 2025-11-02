import { Injectable, NotFoundException} from '@nestjs/common';
import { randomUUID } from 'crypto';
import { CreateBuyerDto } from './dto/create-buyer.dto';
import { UpdateBuyerDto } from './dto/update-buyer.dto';
import { Buyer } from './buyer.entity';


@Injectable()
export class BuyerService {
    private buyers: Buyer[] = [
        {
    id: '1',
    name: 'Leanne Graham',
    email: 'leanne@example.com',
    address: '123 Main St, Dhaka',
    isActive: true,
    createdAt: '2025-11-02T05:00:00Z',
  },
  {
    id: '2',
    name: 'Ervin Howell',
    email: 'ervin@example.com',
    address: '456 Gulshan Ave, Dhaka',
    isActive: true,
    createdAt: '2025-11-02T05:10:00Z',
  },
  {
    id: '3',
    name: 'Clementine Bauch',
    email: 'clementine@example.com',
    address: '789 Banani St, Dhaka',
    isActive: false,
    createdAt: '2025-11-02T05:20:00Z',
  },
  {
    id: '4',
    name: 'Patricia Lebsack',
    email: 'patricia@example.com',
    address: '101 Dhanmondi Rd, Dhaka',
    isActive: true,
    createdAt: '2025-11-02T05:30:00Z',
  },
  {
    id: '5',
    name: 'Chelsey Dietrich',
    email: 'chelsey@example.com',
    address: '202 Uttara Sector 6, Dhaka',
    isActive: false,
    createdAt: '2025-11-02T05:40:00Z',
  },
  {
    id: '6',
    name: 'Mrs. Dennis Schulist',
    email: 'dennis@example.com',
    address: '303 Mirpur 10, Dhaka',
    isActive: true,
    createdAt: '2025-11-02T05:50:00Z',
  },
  {
    id: '7',
    name: 'Kurtis Weissnat',
    email: 'kurtis@example.com',
    address: '404 Banani Link Rd, Dhaka',
    isActive: true,
    createdAt: '2025-11-02T06:00:00Z',
  },
  {
    id: '8',
    name: 'Nicholas Runolfsdottir',
    email: 'nicholas@example.com',
    address: '505 Gulshan Lake Rd, Dhaka',
    isActive: false,
    createdAt: '2025-11-02T06:10:00Z',
  },
    ];


create(dto: CreateBuyerDto) {
const newBuyer: Buyer = { id: randomUUID(), ...dto, createdAt: new Date().toISOString() };
this.buyers.push(newBuyer);
return newBuyer;
}


findAll(query?: { isActive?: boolean; page?: number; limit?: number }) {
let result = this.buyers.slice();
if (query?.isActive !== undefined) result = result.filter(b => b.isActive === query.isActive);
const total = result.length;
const page = query?.page ?? 1;
const limit = query?.limit ?? 20;
const start = (page - 1) * limit;
return { total, page, limit, data: result.slice(start, start + limit) };
}


findOne(id: string) {
const buyer = this.buyers.find(b => b.id === id);
if (!buyer) throw new NotFoundException('Buyer not found');
return buyer;
}


update(id: string, dto: UpdateBuyerDto) {
const idx = this.buyers.findIndex(b => b.id === id);
if (idx === -1) throw new NotFoundException('Buyer not found');
this.buyers[idx] = { ...this.buyers[idx], ...dto, updatedAt: new Date().toISOString() };
return this.buyers[idx];
}


remove(id: string) {
const idx = this.buyers.findIndex(b => b.id === id);
if (idx === -1) throw new NotFoundException('Buyer not found');
const deleted = this.buyers.splice(idx, 1)[0];
return deleted;
}


activate(id: string, isActive: boolean) {
return this.update(id, { isActive });
}


search(q: string) {
const text = q.toLowerCase();
const data = this.buyers.filter(b => b.name.toLowerCase().includes(text) || b.email.toLowerCase().includes(text));
return { total: data.length, data };
}
}
