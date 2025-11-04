// src/supplier/supplier.service.ts
import { Injectable } from '@nestjs/common';
import { SupplierDto } from './supplier.dto';

@Injectable()
export class SupplierService {
  // in-memory storage (simple array)
  private suppliers: Array<any> = [];

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

  // 4) Search by name using query (GET /supplier/search/byname?name=...)
  findByName(name: string) {
    if (!name) return { message: 'No name provided', data: [] };
    const result = this.suppliers.filter(s =>
      s.name && s.name.toLowerCase().includes(name.toLowerCase())
    );
    return { message: 'Suppliers filtered by name', data: result };
  }

  // 5) Full update (PUT)
  update(id: number, updateSupplierDto: Partial<SupplierDto>) {
    const index = this.suppliers.findIndex(s => s.id === id);
    if (index === -1) return { message: 'Supplier not found', data: null };
    // replace fields (PUT considered full, but here we merge for simplicity)
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
