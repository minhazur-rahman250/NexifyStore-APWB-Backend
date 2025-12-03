import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ILike } from 'typeorm';
import { ProductEntity } from './product.entity';
import { UserEntity } from '../auth/user.entity';
import { ProductDto } from './product.dto';
 
@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly productRepo: Repository<ProductEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepo: Repository<UserEntity>,
  ) {}
 
  async create(dto: ProductDto) {
    const seller = await this.userRepo.findOne({ where: { id: dto.sellerId } });
    if (!seller) {
      throw new NotFoundException('Seller not found');
    }
 
    const product = this.productRepo.create({
      name: dto.name,
      price: dto.price,
      stock: dto.stock,
      seller,
    });
 
    const saved = await this.productRepo.save(product);
    return { message: 'Product created', data: saved };
  }
 
  async findAll(search?: string) {
    const where = search
      ? { name: ILike(`%${search}%`) }
      : {};
 
    const products = await this.productRepo.find({
      where,
      relations: ['seller'],
    });
 
    return { message: 'Products fetched', data: products, count: products.length };
  }
 
  async findOne(id: number) {
    const product = await this.productRepo.findOne({
      where: { id },
      relations: ['seller'],
    });
    if (!product) throw new NotFoundException('Product not found');
    return { message: 'Product found', data: product };
  }
 
  async update(id: number, dto: Partial<ProductDto>) {
    const product = await this.productRepo.findOne({ where: { id } });
    if (!product) throw new NotFoundException('Product not found');
 
    Object.assign(product, {
      name: dto.name ?? product.name,
      price: dto.price ?? product.price,
      stock: dto.stock ?? product.stock,
    });
 
    const updated = await this.productRepo.save(product);
    return { message: 'Product updated', data: updated };
  }
 
  async remove(id: number) {
    const product = await this.productRepo.findOne({ where: { id } });
    if (!product) throw new NotFoundException('Product not found');
    await this.productRepo.remove(product);
    return { message: 'Product deleted' };
  }
}