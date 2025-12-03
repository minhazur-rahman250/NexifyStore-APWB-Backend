// src/supplier/supplier.service.ts
import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository } from 'typeorm';
import { SupplierDto } from './supplier.dto';
import { Category4Supplier } from './supplier.entity';
import { UserEntity } from 'src/auth/user.entity';
import { ProductEntity } from 'src/products/product.entity';

@Injectable()
export class SupplierService {
  constructor(
    @InjectRepository(Category4Supplier)
    private readonly category4Repo: Repository<Category4Supplier>,

    @InjectRepository(UserEntity)
    private readonly userRepo: Repository<UserEntity>,

    @InjectRepository(ProductEntity)
    private readonly productRepo: Repository<ProductEntity>,
  ) {}

  // ========== ORIGINAL SUPPLIER METHODS USING USERENTITY ==========

  async createCategory4FromUser(user: UserEntity) {
    const supplier = this.category4Repo.create({
      country: 'Unknown', // or user.country if you have it
      // map any other fields from user to Category4Supplier if needed
    });

    return this.category4Repo.save(supplier);
  }
  
  // POST /supplier
  async create(createSupplierDto: SupplierDto) {
    const supplierUser = this.userRepo.create({
      fullName: createSupplierDto.name,
      email: createSupplierDto.email,
      password: createSupplierDto.password,
      phone: createSupplierDto.contactNumber,
      address: createSupplierDto.address,
      role: 'supplier',
      status: 'active',
    });

    const saved = await this.userRepo.save(supplierUser);
    return { message: 'Supplier created successfully', data: saved };
  }

  // GET /supplier
  async findAll() {
    const suppliers = await this.userRepo.find({
      where: { role: 'supplier' },
    });
    return { message: 'All suppliers fetched', data: suppliers };
  }

  // GET /supplier/:id
  async findOne(id: string) {
    const supplier = await this.userRepo.findOne({
      where: { id, role: 'supplier' },
    });
    if (!supplier) throw new NotFoundException('Supplier not found');
    return { message: 'Supplier found', data: supplier };
  }

  // GET /supplier/search/byemail?email=...
  async findByEmail(email: string) {
    if (!email) return { message: 'No email provided', data: [] };
    const suppliers = await this.userRepo.find({
      where: { role: 'supplier', email },
    });
    return { message: 'Suppliers filtered by email', data: suppliers };
  }

  // PUT /supplier/:id
  async update(id: string, updateSupplierDto: Partial<SupplierDto>) {
    const supplier = await this.userRepo.findOne({
      where: { id, role: 'supplier' },
    });
    if (!supplier) throw new NotFoundException('Supplier not found');

    if (updateSupplierDto.name !== undefined) {
      supplier.fullName = updateSupplierDto.name;
    }
    if (updateSupplierDto.email !== undefined) {
      supplier.email = updateSupplierDto.email;
    }
    if (updateSupplierDto.password !== undefined) {
      supplier.password = updateSupplierDto.password;
    }
    if (updateSupplierDto.address !== undefined) {
      supplier.address = updateSupplierDto.address;
    }
    if (updateSupplierDto.contactNumber !== undefined) {
      supplier.phone = updateSupplierDto.contactNumber;
    }

    const saved = await this.userRepo.save(supplier);
    return { message: 'Supplier updated successfully', data: saved };
  }

  // PATCH /supplier/:id
  async patch(id: string, partialData: Partial<SupplierDto>) {
    return this.update(id, partialData);
  }

  // DELETE /supplier/:id
  async delete(id: string) {
    const supplier = await this.userRepo.findOne({
      where: { id, role: 'supplier' },
    });
    if (!supplier) throw new NotFoundException('Supplier not found');

    await this.userRepo.remove(supplier);
    return { message: 'Supplier deleted successfully', data: { id } };
  }

  // GET /supplier/count/all
  async countAll() {
    const count = await this.userRepo.count({ where: { role: 'supplier' } });
    return { message: 'Total suppliers', count };
  }

  // ========== SUPPLIER ↔ PRODUCT MANY-TO-MANY ==========

  // PUT /supplier/:supplierId/products
  async replaceSupplierProducts(supplierId: string, productIds: number[]) {
    const supplier = await this.userRepo.findOne({
      where: { id: supplierId, role: 'supplier' },
      relations: ['suppliedProducts'],
    });
    if (!supplier) {
      throw new NotFoundException('Supplier not found');
    }

    if (!productIds || productIds.length === 0) {
      supplier.suppliedProducts = [];
    } else {
      const products = await this.productRepo.find({
        where: { id: In(productIds) },
      });
      if (products.length === 0) {
        throw new NotFoundException('No products found for given IDs');
      }
      supplier.suppliedProducts = products;
    }

    const saved = await this.userRepo.save(supplier);
    return { message: 'Supplier products updated', data: saved.suppliedProducts };
  }

  // GET /supplier/:supplierId/products
  async getSupplierProducts(supplierId: string) {
    const supplier = await this.userRepo.findOne({
      where: { id: supplierId, role: 'supplier' },
      relations: ['suppliedProducts'],
    });
    if (!supplier) throw new NotFoundException('Supplier not found');
    return { message: 'Supplier products fetched', data: supplier.suppliedProducts };
  }

  // ========== CATEGORY 4 SUPPLIER METHODS (TypeORM) ==========

  async createCategory4(data: any) {
    try {
      const supplier = this.category4Repo.create({
        country: data.country || 'Unknown',
      });

      const savedSupplier = await this.category4Repo.save(supplier);
      return {
        message: 'Category4 supplier created successfully',
        data: savedSupplier,
      };
    } catch {
      throw new BadRequestException('Failed to create Category4 supplier');
    }
  }

  async getAllCategory4() {
    try {
      const result = await this.category4Repo.find();
      return {
        message: 'All Category4 suppliers fetched',
        data: result,
        count: result.length,
      };
    } catch {
      throw new BadRequestException('Failed to fetch Category4 suppliers');
    }
  }

  async getCategory4ById(id: number) {
    const supplier = await this.category4Repo.findOne({ where: { id } });
    if (!supplier) throw new NotFoundException('Category4 supplier not found');
    return { message: 'Category4 supplier found', data: supplier };
  }

  async updateCountry(id: number, country: string) {
    const supplier = await this.category4Repo.findOne({ where: { id } });
    if (!supplier) throw new NotFoundException('Category4 supplier not found');

    supplier.country = country;
    const updatedSupplier = await this.category4Repo.save(supplier);

    return {
      message: 'Country updated successfully',
      data: updatedSupplier,
    };
  }

  async getUsersByJoiningDate(date: string) {
    try {
      const result = await this.category4Repo
        .createQueryBuilder('supplier')
        .where('DATE(supplier.joiningDate) = :date', { date })
        .getMany();

      return {
        message: `Suppliers with joining date ${date}`,
        data: result,
      };
    } catch {
      throw new BadRequestException('Invalid date format');
    }
  }

  async getUsersWithDefaultCountry() {
    try {
      const result = await this.category4Repo.find({
        where: { country: 'Unknown' },
      });

      return {
        message: 'Suppliers with default country (Unknown)',
        data: result,
        count: result.length,
      };
    } catch {
      throw new BadRequestException(
        'Failed to fetch suppliers with default country',
      );
    }
  }

  async deleteCategory4(id: number) {
    const result = await this.category4Repo.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException('Category4 supplier not found');
    }
    return {
      message: 'Category4 supplier deleted successfully',
    };
  }
}
