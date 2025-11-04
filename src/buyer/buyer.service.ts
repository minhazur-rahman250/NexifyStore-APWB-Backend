import { Injectable } from '@nestjs/common';
import { BuyerDto } from './buyer.dto'; 

//type ServiceResult<T> = T | { status: 'error'; message: string };

@Injectable()
export class BuyerService {
  private buyers: BuyerDto[] = [
    { id: 1, name: 'Leanne Graham', email: 'leanne@example.com', address: '123 Main St, Dhaka', phone: '+88011111111' },
    { id: 2, name: 'Ervin Howell', email: 'ervin@example.com', address: '456 Gulshan Ave, Dhaka', phone: '+88011133333' },
    { id: 3, name: 'Clementine Bauch', email: 'clementine@example.com', address: '789 Banani St, Dhaka', phone: '+880111555555' },
    { id: 4, name: 'Patricia Lebsack', email: 'patricia@example.com', address: '101 Dhanmondi Rd, Dhaka', phone: '+880114444' },
    { id: 5, name: 'Chelsey Dietrich', email: 'chelsey@example.com', address: '202 Uttara Sector 6, Dhaka', phone: '+880111443523' },
  ];


     

    // Get all buyers
  findAll() {
    return { message: 'All buyers fetched', data: this.buyers };
  }
  
  // Get buyer by id
  findOne(id: number) {
    const buyer = this.buyers.find((b) => b.id === id);
    if (!buyer) return { message: 'Buyer not found' };
    return { message: 'Buyer found', buyer };
  }

  // Create buyer
  create(buyer: BuyerDto) {
    buyer.id = this.buyers.length + 1;
    this.buyers.push(buyer);
    return { message: 'Buyer created successfully', buyer };
  }

  // Update buyer
  update(id: number, dto: BuyerDto) {
    const index = this.buyers.findIndex((b) => b.id === id);
    if (index === -1) return { message: 'Buyer not found' };

    this.buyers[index] = { ...this.buyers[index], ...dto };
    return { message: 'Buyer updated successfully', buyer: this.buyers[index] };
  }

  // Delete buyer
  remove(id: number) {
    const index = this.buyers.findIndex((b) => b.id === id);
    if (index === -1) return { message: 'Buyer not found' };

    const deleted = this.buyers.splice(index, 1);
    return { message: 'Buyer deleted', buyer: deleted[0] };
  }

  // Search buyer by name (using query)
  searchByName(name: string) {
    const results = this.buyers.filter((b) =>
      b.name.toLowerCase().includes(name.toLowerCase()),
    );
    return { message: 'Search results', results };
  }

   // Get buyers count
  count() {
    return { message: 'Total buyers', total: this.buyers.length };
  }

  // Clear all buyers
  clear() {
    this.buyers = [];
    return { message: 'All buyers cleared' };
  }

//   findAll(): Buyer[] {
//     const out: Buyer[] = [];
//     for (let i = 0; i < this.buyers.length; i++) out.push({ ...this.buyers[i] });
//     return out;
//   }

//   findOne(id: number): ServiceResult<Buyer> {
//     for (let i = 0; i < this.buyers.length; i++) {
//       if (this.buyers[i].id === id) return this.buyers[i];
//     }
//     return { status: 'error', message: 'Buyer not found' };
//   }

//   create(dto: BuyerDto): Buyer {
//     // manual max
//     let highest = 0;
//     for (let i = 0; i < this.buyers.length; i++) {
//       if (this.buyers[i].id > highest) highest = this.buyers[i].id;
//     }
//     const newBuyer: Buyer = {
//       id: highest + 1,
//       name: dto.name,
//       email: dto.email,
//       address: dto.address,
//     };
//     this.buyers.push(newBuyer);
//     return newBuyer;
//   }

//   update(id: number, dto: BuyerDto): ServiceResult<Buyer> {
//     for (let i = 0; i < this.buyers.length; i++) {
//       if (this.buyers[i].id === id) {
//         if (typeof dto.name !== 'undefined') this.buyers[i].name = dto.name;
//         if (typeof dto.email !== 'undefined') this.buyers[i].email = dto.email;
//         if (typeof dto.address !== 'undefined') this.buyers[i].address = dto.address;
//         return this.buyers[i];
//       }
//     }
//     return { status: 'error', message: 'Buyer not found' };
//   }

//   remove(id: number): ServiceResult<Buyer> {
//     for (let i = 0; i < this.buyers.length; i++) {
//       if (this.buyers[i].id === id) {
//         const removed = this.buyers[i];
//         for (let j = i; j < this.buyers.length - 1; j++) this.buyers[j] = this.buyers[j + 1];
//         this.buyers.length = this.buyers.length - 1;
//         return removed;
//       }
//     }
//     return { status: 'error', message: 'Buyer not found' };
//   }

//   search(q: string) {
//     // manual trim -> build trimmed string
//     const raw = q ?? '';
//     let s = 0;
//     let e = raw.length - 1;
//     function isWs(c: string) { return c === ' ' || c === '\t' || c === '\n' || c === '\r' || c === '\f' || c === '\v'; }
//     while (s <= e && isWs(raw.charAt(s))) s++;
//     while (e >= s && isWs(raw.charAt(e))) e--;
//     let trimmed = '';
//     for (let k = s; k <= e; k++) trimmed += raw.charAt(k);

//     // manual lowercase of trimmed (ASCII only)
//     let normQuery = '';
//     for (let k = 0; k < trimmed.length; k++) {
//       const code = trimmed.charCodeAt(k);
//       if (code >= 65 && code <= 90) normQuery += String.fromCharCode(code + 32);
//       else normQuery += trimmed.charAt(k);
//     }

//     const result: Buyer[] = [];
//     for (let i = 0; i < this.buyers.length; i++) {
//       // norm name and email
//       const name = this.buyers[i].name;
//       const email = this.buyers[i].email;
//       let nameNorm = '';
//       let emailNorm = '';

//       for (let k = 0; k < name.length; k++) {
//         const code = name.charCodeAt(k);
//         if (code >= 65 && code <= 90) nameNorm += String.fromCharCode(code + 32);
//         else nameNorm += name.charAt(k);
//       }
//       for (let k = 0; k < email.length; k++) {
//         const code = email.charCodeAt(k);
//         if (code >= 65 && code <= 90) emailNorm += String.fromCharCode(code + 32);
//         else emailNorm += email.charAt(k);
//       }

//       // simple substring search: check nameNorm contains normQuery or emailNorm contains normQuery
//       function includes(h: string, n: string): boolean {
//         if (n === '') return true;
//         if (n.length > h.length) return false;
//         for (let a = 0; a <= h.length - n.length; a++) {
//           let jj = 0;
//           for (; jj < n.length; jj++) {
//             if (h.charAt(a + jj) !== n.charAt(jj)) break;
//           }
//           if (jj === n.length) return true;
//         }
//         return false;
//       }

//       if (includes(nameNorm, normQuery) || includes(emailNorm, normQuery)) {
//         result.push({ ...this.buyers[i] });
//       }
//     }

//     // manual count
//     let total = 0;
//     for (let t = 0; t < result.length; t++) total++;
//     return { total, data: result };
//   }
}
