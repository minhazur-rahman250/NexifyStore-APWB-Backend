// src/seller/seller.service.ts

import { Injectable, NotFoundException } from '@nestjs/common';
import { ProductDto, CreateUserDto } from './seller.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SellerUserEntity } from './user.entity';

@Injectable()
export class SellerService {
  // ========== IN-MEMORY PRODUCTS STORAGE ==========
  private productIdCounter = 6;
  private products: any[] = [
    {
      id: 'p_1',
      name: 'Table',
      price: 800,
      stock: 20,
      category: 'Furniture',
      description: 'Wooden dining table',
    },
    {
      id: 'p_2',
      name: 'Laptop',
      price: 50000,
      stock: 80,
      category: 'Electronics',
      description: 'High performance laptop',
    },
    {
      id: 'p_3',
      name: 'T-Shirt',
      price: 300,
      stock: 50,
      category: 'Clothing',
      description: 'Cotton T-Shirt in various sizes',
    },
    {
      id: 'p_4',
      name: 'Stationary',
      price: 100,
      stock: 30,
      category: 'General',
      description: 'Set of pens and notebooks',
    },
    {
      id: 'p_5',
      name: 'Watch',
      price: 2500,
      stock: 10,
      category: 'Electronics',
      description: 'Waterproof fitness tracker',
    },
  ];

  constructor(
    @InjectRepository(SellerUserEntity)
    private userRepo: Repository<SellerUserEntity>,
  ) {}

  // ========== PRODUCT METHODS ==========

  create(dto: ProductDto) {
    const newProduct = { id: `p_${this.productIdCounter++}`, ...dto };
    this.products.push(newProduct);
    return { message: 'Product created successfully', data: newProduct };
  }

  findAll() {
    return { message: 'All products fetched', data: this.products };
  }

  findOne(id: string) {
    const product = this.products.find((p) => p.id === id);
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    return { message: 'Product found', data: product };
  }

  findByName(name: string) {
    if (!name) {
      return { message: 'No name provided', data: [] };
    }
    const result = this.products.filter((p) =>
      p.name.toLowerCase().includes(name.toLowerCase()),
    );
    return { message: 'Products filtered by name', data: result };
  }

  findByCategory(category: string) {
    if (!category) {
      return { message: 'No category provided', data: [] };
    }
    const result = this.products.filter((p) => p.category === category);
    return { message: 'Products filtered by category', data: result };
  }

  update(id: string, updateDto: ProductDto) {
    const index = this.products.findIndex((p) => p.id === id);
    if (index === -1) {
      throw new NotFoundException('Product not found');
    }
    this.products[index] = { ...this.products[index], ...updateDto };
    return {
      message: 'Product updated successfully',
      data: this.products[index],
    };
  }

  patch(id: string, partialDto: Partial<ProductDto>) {
    const product = this.products.find((p) => p.id === id);
    if (!product) {
      throw new NotFoundException('Product not found');
    }
    Object.assign(product, partialDto);
    return { message: 'Product partially updated', data: product };
  }

  delete(id: string) {
    const index = this.products.findIndex((p) => p.id === id);
    if (index === -1) {
      throw new NotFoundException('Product not found');
    }
    const [removed] = this.products.splice(index, 1);
    return { message: 'Product deleted successfully', data: removed };
  }

  countAll() {
    return { message: 'Total products', count: this.products.length };
  }

  // ========== USER METHODS (TypeORM) ==========

  async createUser(dto: CreateUserDto) {
    const user = this.userRepo.create(dto);
    const savedUser = await this.userRepo.save(user);
    return { message: 'User created successfully', data: savedUser };
  }

  async updateUserStatus(id: number, status: 'active' | 'inactive') {
    const user = await this.userRepo.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    user.status = status;
    const updatedUser = await this.userRepo.save(user);
    return { message: 'User status updated successfully', data: updatedUser };
  }

  async getInactiveUsers() {
    const inactiveUsers = await this.userRepo.find({
      where: { status: 'inactive' },
    });
    return {
      message: 'All inactive users fetched',
      data: inactiveUsers,
      count: inactiveUsers.length,
    };
  }

  async getUsersOlderThan40() {
    const users = await this.userRepo
      .createQueryBuilder('u')
      .where('u.age > :age', { age: 40 })
      .getMany();
    return {
      message: 'All users older than 40 fetched',
      data: users,
      count: users.length,
    };
  }
}

