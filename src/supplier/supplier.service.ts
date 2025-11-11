// src/supplier/supplier.service.ts
import { Injectable } from '@nestjs/common';
import { SupplierDto } from './supplier.dto';

@Injectable()
export class SupplierService {
  findByName(name: string) {
    throw new Error('Method not implemented.');
  }
 
  private suppliers: Array<any> = [
    {
        id: 1,
        name: 'Rahim Traders',
        email: 'rahim@example.com',
        phone: '01711111111',
        address: 'Dhaka, Bangladesh'
    },
    {
        id: 2,
        name: 'Karim Enterprises',
        email: 'karim@example.com',
        phone: '01722222222',
        address: 'Chittagong, Bangladesh'
    },
    {
        id: 3,
        name: 'ABC Supplies',
        email: 'abc@example.com',
        phone: '01733333333',
        address: 'Khulna, Bangladesh'
    },
    {
        id: 4,
        name: 'XYZ Distributors',
        email: 'xyz@example.com',
        phone: '01744444444',
        address: 'Sylhet, Bangladesh'
    },
    {
        id: 5,
        name: 'Global Traders',
        email: 'global@example.com',
        phone: '01755555555',
        address: 'Rajshahi, Bangladesh'
    }
];


  // 1) Create supplier (POST)
  create(createSupplierDto: SupplierDto) {
    const newSupplier = { id: Date.now(), ...createSupplierDto };
    this.suppliers.push(newSupplier);
    return { message: 'Supplier created successfully', data: newSupplier };
  }

  // 2) Get all suppliers (GET)
  findAll() {
    return { message: 'All suppliers fetched', data: this.suppliers };
  }

  // 3) Get single supplier by id (GET)
  findOne(id: number) {
    const supplier = this.suppliers.find(s => s.id === id);
    if (!supplier) return { message: 'Supplier not found', data: null };
    return { message: 'Supplier found', data: supplier };
  }

 
// 4) Search by email using query (GET /supplier/search/byemail?emai=...)
  findByEmail(email: string) {
    if (!email) return { message: 'No email provided', data: [] };
    const result = this.suppliers.filter(s =>
      s.email && s.email.toLowerCase().includes(email.toLowerCase())
    );
    return { message: 'Suppliers filtered by email', data: result };
  }



  // 5) Full update (PUT)
  update(id: number, updateSupplierDto: Partial<SupplierDto>) {
    const index = this.suppliers.findIndex(s => s.id === id);
    if (index === -1) return { message: 'Supplier not found', data: null };
    
    this.suppliers[index] = { ...this.suppliers[index], ...updateSupplierDto };
    return { message: 'Supplier updated successfully', data: this.suppliers[index] };
  }

  // 6) Partial update (PATCH)
  patch(id: number, partialData: Partial<SupplierDto>) {
    const supplier = this.suppliers.find(s => s.id === id);
    if (!supplier) return { message: 'Supplier not found', data: null };
    Object.assign(supplier, partialData);
    return { message: 'Supplier partially updated', data: supplier };
  }

  // 7) Delete (DELETE)
  delete(id: number) {
    const index = this.suppliers.findIndex(s => s.id === id);
    if (index === -1) return { message: 'Supplier not found', data: null };
    const [removed] = this.suppliers.splice(index, 1);
    return { message: 'Supplier deleted successfully', data: removed };
  }

  // 8) Count (GET /supplier/count/all)
  countAll() {
    return { message: 'Total suppliers', count: this.suppliers.length };
  }
}
