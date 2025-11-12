import { Injectable, NotFoundException } from '@nestjs/common';
import { BuyerDto } from './buyer.dto'; 

@Injectable()
export class BuyerService {
  private buyers: BuyerDto[] = [
    { 
      id: 1, 
      name: 'Kazi Sakib', 
      email: 'kazisakib@example.xyz', 
      address: '123 Main St, Dhaka', 
      phone: '+88011111111', 
      nidNumber: '1234567890'
    },

    { 
      id: 2, 
      name: 'Leanne Graham', 
      email: 'leanne@example.xyz', 
      address: '456 Gulshan Ave, Dhaka', 
      phone: '+88011133333', 
      nidNumber: '2345678901'
    },

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
    return { buyer: this.buyers[index] };
  }

  // // Update buyer document
  // updateDocument(id: number, documentName: string) {
  //   const index = this.buyers.findIndex((b) => b.id === id);
  //   if (index === -1) throw new NotFoundException('Buyer not found');

  //   this.buyers[index].document = documentName;
  //   return { message: 'Document uploaded successfully', document: documentName };
  // }
  
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

   // Search buyer by name (using query)
  searchByEmail(email: string) {
    const results = this.buyers.filter((b) =>
      b.email.toLowerCase() === (email || '').toLowerCase(),
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

}
