// src/supplier/supplier.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { SupplierDto } from './supplier.dto';

@Injectable()
export class SupplierService {
  private suppliers: Array<any> = [
    {
      id: 1,
      name: 'Rahim Traders',
      email: 'rahim@aiub.edu',
      password: 'Secure123',
      gender: 'male',
      contactNumber: '01711111111',
      address: 'Dhaka, Bangladesh',
      profileImage: null,
      category: 'category2'
    },
    {
      id: 2,
      name: 'Karim Enterprises',
      email: 'karim@aiub.edu',
      password: 'StrongPass1',
      gender: 'male', 
      contactNumber: '01722222222',
      address: 'Chittagong, Bangladesh',
      profileImage: null,
      category: 'category2'
    },
    {
      id: 3,
      name: 'ABC Supplies',
      email: 'abc@example.com',
      contactNumber: '01733333333',
      address: 'Khulna, Bangladesh',
      category: 'original'
    }
  ];

  // ==================== ORIGINAL SUPPLIER METHODS ====================

  // 1) Create supplier (POST) - Original
  create(createSupplierDto: SupplierDto) {
    const newSupplier = { 
      id: Date.now(), 
      ...createSupplierDto,
      category: 'original'
    };
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
    if (!supplier) {
      throw new NotFoundException('Supplier not found');
    }
    return { message: 'Supplier found', data: supplier };
  }

  // 4) Search by email using query
  findByEmail(email: string) {
    if (!email) return { message: 'No email provided', data: [] };
    const result = this.suppliers.filter(s =>
      s.email && s.email.toLowerCase().includes(email.toLowerCase())
    );
    return { message: 'Suppliers filtered by email', data: result };
  }

  // 5) Full update (PUT) - Original
  update(id: number, updateSupplierDto: Partial<SupplierDto>) {
    const index = this.suppliers.findIndex(s => s.id === id);
    if (index === -1) {
      throw new NotFoundException('Supplier not found');
    }
    
    this.suppliers[index] = { ...this.suppliers[index], ...updateSupplierDto };
    return { message: 'Supplier updated successfully', data: this.suppliers[index] };
  }

  // 6) Partial update (PATCH) - Original
  patch(id: number, partialData: Partial<SupplierDto>) {
    const supplier = this.suppliers.find(s => s.id === id);
    if (!supplier) {
      throw new NotFoundException('Supplier not found');
    }
    Object.assign(supplier, partialData);
    return { message: 'Supplier partially updated', data: supplier };
  }

  // 7) Delete (DELETE) - Original
  delete(id: number) {
    const index = this.suppliers.findIndex(s => s.id === id);
    if (index === -1) {
      throw new NotFoundException('Supplier not found');
    }
    const [removed] = this.suppliers.splice(index, 1);
    return { message: 'Supplier deleted successfully', data: removed };
  }

  // 8) Count (GET /supplier/count/all)
  countAll() {
    return { message: 'Total suppliers', count: this.suppliers.length };
  }

  // ==================== CATEGORY2 SUPPLIER METHODS ====================

  // Create Category 2 Supplier
  createCategory2(supplierData: any) {
    const newSupplier = {
      id: Date.now(),
      ...supplierData,
      category: 'category2'
    };
    this.suppliers.push(newSupplier);
    return { 
      message: 'Category 2 Supplier created successfully', 
      data: newSupplier 
    };
  }

  // Get All Category2 Suppliers
  findAllCategory2() {
    const category2Suppliers = this.suppliers.filter(s => s.category === 'category2');
    return { 
      message: 'All Category2 suppliers fetched', 
      data: category2Suppliers,
      count: category2Suppliers.length
    };
  }

  // Get Category2 Supplier by ID
  findOneCategory2(id: number) {
    const supplier = this.suppliers.find(s => s.id === id && s.category === 'category2');
    if (!supplier) {
      throw new NotFoundException('Category2 supplier not found');
    }
    return { 
      message: 'Category2 supplier found', 
      data: supplier 
    };
  }

  // Update Category2 Supplier (PUT - Full Update)
  updateCategory2(id: number, updateData: any) {
    const index = this.suppliers.findIndex(s => s.id === id && s.category === 'category2');
    if (index === -1) {
      throw new NotFoundException('Category2 supplier not found');
    }
    
    this.suppliers[index] = { ...this.suppliers[index], ...updateData };
    return { 
      message: 'Category2 supplier updated successfully', 
      data: this.suppliers[index] 
    };
  }

  // Partial Update Category2 Supplier (PATCH - Partial Update)
  patchCategory2(id: number, partialData: any) {
    const supplier = this.suppliers.find(s => s.id === id && s.category === 'category2');
    if (!supplier) {
      throw new NotFoundException('Category2 supplier not found');
    }
    
    Object.assign(supplier, partialData);
    return { 
      message: 'Category2 supplier partially updated', 
      data: supplier 
    };
  }

  // Delete Category2 Supplier
  deleteCategory2(id: number) {
    const index = this.suppliers.findIndex(s => s.id === id && s.category === 'category2');
    if (index === -1) {
      throw new NotFoundException('Category2 supplier not found');
    }
    
    const [deleted] = this.suppliers.splice(index, 1);
    return { 
      message: 'Category2 supplier deleted successfully', 
      data: deleted 
    };
  }

  // Count All Category2 Suppliers
  countAllCategory2() {
    const category2Suppliers = this.suppliers.filter(s => s.category === 'category2');
    return { 
      message: 'Total Category2 suppliers', 
      count: category2Suppliers.length 
    };
  }

  // Search Category2 by Email
  findCategory2ByEmail(email: string) {
    if (!email) return { message: 'No email provided', data: [] };
    const result = this.suppliers.filter(s => 
      s.category === 'category2' && 
      s.email && 
      s.email.toLowerCase().includes(email.toLowerCase())
    );
    return { message: 'Category2 suppliers filtered by email', data: result };
  }

  // Search Category2 by Name
  findCategory2ByName(name: string) {
    if (!name) return { message: 'No name provided', data: [] };
    const result = this.suppliers.filter(s => 
      s.category === 'category2' && 
      s.name && 
      s.name.toLowerCase().includes(name.toLowerCase())
    );
    return { message: 'Category2 suppliers filtered by name', data: result };
  }

  // ==================== UTILITY METHODS ====================

  // Find supplier by any field
  findByField(field: string, value: string) {
    const result = this.suppliers.filter(s => 
      s[field] && s[field].toString().toLowerCase().includes(value.toLowerCase())
    );
    return { 
      message: `Suppliers filtered by ${field}`, 
      data: result 
    };
  }

  // Get suppliers by category
  findByCategory(category: string) {
    const result = this.suppliers.filter(s => s.category === category);
    return { 
      message: `Suppliers filtered by category: ${category}`, 
      data: result,
      count: result.length
    };
  }

  // Update profile image only
  updateProfileImage(id: number, profileImage: string) {
    const supplier = this.suppliers.find(s => s.id === id);
    if (!supplier) {
      throw new NotFoundException('Supplier not found');
    }
    supplier.profileImage = profileImage;
    return { 
      message: 'Profile image updated successfully', 
      data: supplier 
    };
  }
}