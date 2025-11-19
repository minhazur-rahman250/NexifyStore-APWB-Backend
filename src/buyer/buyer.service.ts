import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like, Repository } from 'typeorm';
import { BuyerEntity } from './buyer.entity';
import { BuyerDto } from './buyer.dto';

@Injectable()
export class BuyerService {
  constructor(
    @InjectRepository(BuyerEntity)
    private readonly buyerRepository: Repository<BuyerEntity>,
  ) {}

  // Create buyer
  async createBuyer(dto: Partial<BuyerDto & { phone?: any }>): Promise<BuyerEntity> {
    // Create entity instance
    const buyer = this.buyerRepository.create({
      name: dto.name ?? null,
      phone: dto.phone,
      isActive: true,
      // other fields you might want to store (address, email, nidNumber) are not in the entity;
      // you can expand entity columns if you need to persist those
    });
    return this.buyerRepository.save(buyer);
  }

  // Get all buyers
  async findAll(): Promise<BuyerEntity[]> {
    return this.buyerRepository.find();
  }

  // Find one by id (throws if not found)
  async findOne(id: number): Promise<BuyerEntity> {
    const buyer = await this.buyerRepository.findOne({ where: { id } });
    if (!buyer) throw new NotFoundException('Buyer not found');
    return buyer;
  }

  // Update buyer: merge and return updated
  async updateBuyer(id: number, updated: Partial<BuyerEntity>): Promise<BuyerEntity> {
    const existing = await this.findOne(id);
    const merged = Object.assign(existing, updated);
    await this.buyerRepository.save(merged);
    return this.findOne(id);
  }

  // Remove buyer
  async remove(id: number): Promise<{ message: string; id: number }> {
    const buyer = await this.findOne(id);
    await this.buyerRepository.remove(buyer);
    return { message: 'Buyer removed', id };
  }

  // Clear all buyers
  async clear(): Promise<{ message: string }> {
    await this.buyerRepository.clear();
    return { message: 'All buyers cleared' };
  }

  // Search helpers (these assume other fields persisted; adjust if not)
  // If you later add email/name columns to entity, these work.
  async searchByName(name: string) {
    return this.buyerRepository.find({
      where: { name: name ? name : null }, // simple exact match; you can use Like(...)
    });
  }

   
  async count(): Promise<number> {
    return this.buyerRepository.count();
  }
}
