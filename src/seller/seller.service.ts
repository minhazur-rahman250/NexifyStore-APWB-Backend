// src/seller/seller.service.ts
import { Injectable } from '@nestjs/common';
import { ProductDto } from './seller.dto';

// import DTO for category4
import { SellerCategory4Dto } from './dtos/seller-category4.dto';

@Injectable()
export class SellerService {
  private products: any[] = [
    { id: 'p_1' , name: 'Table', price: 800, stock: 20, category: 'Furniture', description: "Wooden dining table" },
    { id: 'p_2' , name: 'Laptop', price: 50000, stock: 80, category: 'Electronics', description: "High performance laptop" },
    { id: 'p_3', name: 'T-Shirt', price: 300, stock: 50, category: 'Clothing', description: "Cotton T-Shirt in various sizes" },
    { id: 'p_4', name: 'Stationary', price: 100, stock: 30, category: 'General', description: "Set of pens and notebooks"},
    { id: 'p_5', name: 'Watch', price: 2500, stock: 10, category: 'Electronics', description: "Waterproof fitness tracker"},
  ];

  // NEW: in-memory seller-users for category 4
  private sellerUsers: any[] = [];

  // 1) (POST) product
  create(dto: ProductDto) {
    const newProduct = { id: Date.now().toString(), ...dto };
    this.products.push(newProduct);
    return { message: 'Product created successfully', data: newProduct };
  }

  // NEW: createCategory4 for seller users
  createCategory4(dto: SellerCategory4Dto) {
    // optional duplicate check: by name + socialLink or other logic
    const exists = this.sellerUsers.find(u => u.name === dto.name && u.socialLink === dto.socialLink);
    if (exists) {
      return { message: 'Seller user already exists', data: null };
    }

    const newUser = {
      id: `suser_${Date.now()}`,
      name: dto.name,
      // Password stored as plain here (for lab). In real app -> hash then store.
      password: dto.password,
      dateOfBirth: dto.dateOfBirth, // this is normalized ISO from DateValidationPipe (we returned ISO)
      socialLink: dto.socialLink,
      createdAt: new Date().toISOString(),
    };

    this.sellerUsers.push(newUser);

    // Do not return password in response
    const safe = { ...newUser, password: undefined };
    return { message: 'Seller Category4 user created', data: safe };
  }

  // 2) (GET) products
  findAll() {
    return { message: 'All products fetched', data: this.products };
  }

  // (existing methods unchanged) findOne, findByName, findByCategory, update, patch, delete, countAll
  findOne(id: string) {
    const product = this.products.find(p => p.id === id);
    if (!product) return { message: 'Product not found', data: null };
    return { message: 'Product found', data: product };
  }

  findByName(name: string) {
    if (!name) return { message: 'No name provided', data: [] };
    const result = this.products.filter(p =>
      p.name && p.name.toLowerCase().includes(name.toLowerCase())
    );
    return { message: 'Products filtered by name', data: result };
  }

  findByCategory(category: string) {
    if (!category) return { message: 'No category provided', data: [] };
    const result = this.products.filter(p => p.category === category);
    return { message: 'Products filtered by category', data: result };
  }

  update(id: string, updateDto: ProductDto) {
    const index = this.products.findIndex(p => p.id === id);
    if (index === -1) return { message: 'Product not found', data: null };
    this.products[index] = { ...this.products[index], ...updateDto };
    return { message: 'Product updated successfully', data: this.products[index] };
  }

  patch(id: string, partialDto: Partial<ProductDto>) {
    const product = this.products.find(p => p.id === id);
    if (!product) return { message: 'Product not found', data: null };
    Object.assign(product, partialDto);
    return { message: 'Product partially updated', data: product };
  }

  delete(id: string) {
    const index = this.products.findIndex(p => p.id === id);
    if (index === -1) return { message: 'Product not found', data: null };
    const [removed] = this.products.splice(index, 1);
    return { message: 'Product deleted successfully', data: removed };
  }

  countAll() {
    return { message: 'Total products', count: this.products.length };
  }

  // optional: expose sellerUsers for debug/testing
  getSellerUsers() {
    return { message: 'Seller users fetched', data: this.sellerUsers.map(u => ({ ...u, password: undefined })) };
  }
}
