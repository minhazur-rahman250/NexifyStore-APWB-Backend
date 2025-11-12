// src/seller/seller.service.ts
import { Injectable } from '@nestjs/common';
import { ProductDto } from './seller.dto';

@Injectable()
export class SellerService {
  private productIdCounter = 6;
  private products: any[] = [
    { id: 'p_1' , name: 'Table', price: 800, stock: 20, category: 'Furniture', description: "Wooden dining table" },
    { id: 'p_2' , name: 'Laptop', price: 50000, stock: 80, category: 'Electronics', description: "High performance laptop" },
    { id: 'p_3', name: 'T-Shirt', price: 300, stock: 50, category: 'Clothing', description: "Cotton T-Shirt in various sizes" },
    { id: 'p_4', name: 'Stationary', price: 100, stock: 30, category: 'General', description: "Set of pens and notebooks"},
    { id: 'p_5', name: 'Watch', price: 2500, stock: 10, category: 'Electronics', description: "Waterproof fitness tracker"},
  ];

  // 1) (POST)
  create(dto: ProductDto) {
    const newProduct = { id: `p_${this.productIdCounter++}`, ...dto };
    this.products.push(newProduct);
    return { message: 'Product created successfully', data: newProduct };
  }

  // 2) (GET)
  findAll() {
    return { message: 'All products fetched', data: this.products };
  }

  // 3) using id (GET)
  findOne(id: string) {
    const product = this.products.find(p => p.id === id);
    if (!product) return { message: 'Product not found', data: null };
    return { message: 'Product found', data: product };
  }

  // 4) Search (GET /seller/search/byname?name=...)
  findByName(name: string) {
    if (!name) return { message: 'No name provided', data: [] };
    const result = this.products.filter(p =>
      p.name && p.name.toLowerCase().includes(name.toLowerCase())
    );
    return { message: 'Products filtered by name', data: result };
  }

  // 5) Search (GET /seller/search/bycategory?category=...)
  findByCategory(category: string) {
    if (!category) return { message: 'No category provided', data: [] };
    const result = this.products.filter(p => p.category === category);
    return { message: 'Products filtered by category', data: result };
  }

  // 6) (PUT)
  update(id: string, updateDto: ProductDto) {
    const index = this.products.findIndex(p => p.id === id);
    if (index === -1) return { message: 'Product not found', data: null };
    this.products[index] = { ...this.products[index], ...updateDto };
    return { message: 'Product updated successfully', data: this.products[index] };
  }

  // 7) Partial update (PATCH)
  patch(id: string, partialDto: Partial<ProductDto>) {
    const product = this.products.find(p => p.id === id);
    if (!product) return { message: 'Product not found', data: null };
    Object.assign(product, partialDto);
    return { message: 'Product partially updated', data: product };
  }

  // 8) using id (DELETE)
  delete(id: string) {
    const index = this.products.findIndex(p => p.id === id);
    if (index === -1) return { message: 'Product not found', data: null };
    const [removed] = this.products.splice(index, 1);
    return { message: 'Product deleted successfully', data: removed };
  }

  // 9) Count all products (GET /seller/count/all)
  countAll() {
    return { message: 'Total products', count: this.products.length };
  }
}
