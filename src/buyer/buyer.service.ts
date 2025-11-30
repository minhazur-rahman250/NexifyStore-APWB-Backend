import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { BuyerEntity } from './buyer.entity';
import { BuyerDto } from './buyer.dto';

@Injectable()
export class BuyerService {
  constructor(
    @InjectRepository(BuyerEntity)
    private readonly buyerRepository: Repository<BuyerEntity>,
  ) {}

  // ========== CREATE BUYER ==========
  async createBuyer(
    dto: Partial<BuyerDto & { phone: any }>,
  ): Promise<BuyerEntity> {
    try {
      // Check if email already exists
      const existingBuyer = await this.buyerRepository.findOne({
        where: { email: dto.email },
      });

      if (existingBuyer) {
        throw new BadRequestException('Email already registered');
      }

      // Create entity instance
      const buyer = this.buyerRepository.create({
        name: dto.name ?? null,
        email: dto.email,
        address: dto.address,
        phone: dto.phone,
        nidNumber: dto.nidNumber,
        isActive: true,
      });

      return await this.buyerRepository.save(buyer);
    } catch (error) {
      if (error.message.includes('already registered')) {
        throw error;
      }
      throw new BadRequestException('Failed to create buyer');
    }
  }

  // ========== GET ALL BUYERS ==========
  async findAll(): Promise<BuyerEntity[]> {
    try {
      return await this.buyerRepository.find();
    } catch (error) {
      throw new BadRequestException('Failed to fetch buyers');
    }
  }

  // ========== GET BUYER BY ID ==========
  async findOne(id: number): Promise<BuyerEntity> {
    try {
      const buyer = await this.buyerRepository.findOne({ where: { id } });
      if (!buyer) throw new NotFoundException('Buyer not found');
      return buyer;
    } catch (error) {
      throw error;
    }
  }

  // ========== UPDATE BUYER ==========
  async updateBuyer(
    id: number,
    updated: Partial<BuyerEntity>,
  ): Promise<BuyerEntity> {
    try {
      const existing = await this.findOne(id);
      const merged = Object.assign(existing, updated);
      await this.buyerRepository.save(merged);
      return await this.findOne(id);
    } catch (error) {
      throw error;
    }
  }

  // ========== DELETE BUYER BY ID ==========
  async remove(id: number): Promise<any> {
    try {
      const buyer = await this.buyerRepository.findOne({ where: { id } });

      if (!buyer) {
        throw new NotFoundException('Buyer not found');
      }

      await this.buyerRepository.remove(buyer);

      return { message: 'Buyer removed successfully', id };
    } catch (error) {
      throw error;
    }
  }

  // ========== DELETE BUYER BY PHONE ==========
  async removeByPhone(phone: string): Promise<any> {
    try {
      const buyer = await this.buyerRepository.findOne({ where: { phone } });

      if (!buyer) {
        throw new NotFoundException('Buyer not found');
      }

      await this.buyerRepository.remove(buyer);

      return { message: 'Buyer removed successfully by phone', phone };
    } catch (error) {
      throw error;
    }
  }

  // ========== CLEAR ALL BUYERS ==========
  async clear(): Promise<any> {
    try {
      await this.buyerRepository.clear();
      return { message: 'All buyers cleared successfully' };
    } catch (error) {
      throw new BadRequestException('Failed to clear buyers');
    }
  }

  // ========== SEARCH BY NAME ==========
  async searchByName(name: string): Promise<BuyerEntity[]> {
    try {
      if (!name) {
        return [];
      }
      return await this.buyerRepository.find({
        where: { name: Like(`%${name}%`) },
      });
    } catch (error) {
      throw new BadRequestException('Failed to search by name');
    }
  }

  // ========== SEARCH BY EMAIL ==========
  async searchByEmail(email: string): Promise<BuyerEntity[]> {
    try {
      if (!email) {
        return [];
      }
      return await this.buyerRepository.find({
        where: { email: Like(`%${email}%`) },
      });
    } catch (error) {
      throw new BadRequestException('Failed to search by email');
    }
  }

  // ========== COUNT TOTAL BUYERS ==========
  async count(): Promise<number> {
    try {
      return await this.buyerRepository.count();
    } catch (error) {
      throw new BadRequestException('Failed to count buyers');
    }
  }
}
