import { Injectable, NotFoundException } from '@nestjs/common';
import { ProductDto, CreateUserDto } from './seller.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SellerEntity } from './seller.entity';
import { UserEntity } from 'src/auth/user.entity';

@Injectable()
export class SellerService {
  private products: any[] = [];
  private productIdCounter = 1;

  constructor(
    @InjectRepository(SellerEntity)
    private sellerRepo: Repository<SellerEntity>,
  ) {}

  // ========== PRODUCT METHODS (In-memory) ==========

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

  async createUser(userEntity: UserEntity, dto: CreateUserDto) {
    const user = this.sellerRepo.create({
      fullName: dto.fullName,
      email: dto.email,  // default email
      address: dto.address,  // default address
      phone: dto.phone,  // default phone
      nidNumber: dto.nidNumber,  // default nid
      status: 'active',
      role: 'seller',
    } as any);

    const savedSeller = await this.sellerRepo.save(user);
    return { message: 'Seller user created successfully', data: savedSeller };
  }

  async updateUserStatus(id: number, status: 'active' | 'inactive') {
    const user = await this.sellerRepo.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException('Seller user not found');
    }
    user.status = status;
    const updatedUser = await this.sellerRepo.save(user);
    return { message: 'User status updated successfully', data: updatedUser };
  }

  async getInactiveUsers() {
    const inactiveUsers = await this.sellerRepo.find({
      where: { status: 'inactive' },
    });
    return {
      message: 'All inactive users fetched',
      data: inactiveUsers,
      count: inactiveUsers.length,
    };
  }

  async getUsersOlderThan40() {
    // Note: SellerEntity doesn't have 'age' field, so this is a demo that returns all active sellers
    const users = await this.sellerRepo.find({
      where: { status: 'active' },
    });
    return {
      message: 'All active sellers fetched',
      data: users,
      count: users.length,
    };
  }
}
