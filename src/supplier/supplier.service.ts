import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SupplierDto } from './supplier.dto';
import { Category4Supplier } from './supplier.entity';
import { UserEntity } from 'src/auth/user.entity';

@Injectable()
export class SupplierService {
  constructor(
    @InjectRepository(Category4Supplier)
    private category4Repo: Repository<Category4Supplier>,
  ) {}

  // ========== IN-MEMORY SUPPLIERS STORAGE ==========
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
      category: 'original',
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
      category: 'original',
    },
  ];

  private supplierIdCounter = 3;
  private category2IdCounter = 1;

  // ========== ORIGINAL SUPPLIER METHODS ==========

  create(createSupplierDto: SupplierDto) {
    const newSupplier = {
      id: this.supplierIdCounter++,
      ...createSupplierDto,
      category: 'original',
    };
    this.suppliers.push(newSupplier);
    return { message: 'Supplier created successfully', data: newSupplier };
  }

  async createCategory4FromUser(user: UserEntity) {
  const supplier = this.category4Repo.create({
    country: 'Unknown',
  });
  return this.category4Repo.save(supplier);
}

  findAll() {
    return { message: 'All suppliers fetched', data: this.suppliers };
  }

  findOne(id: number) {
    const supplier = this.suppliers.find((s) => s.id === id);
    if (!supplier) throw new NotFoundException('Supplier not found');
    return { message: 'Supplier found', data: supplier };
  }

  findByEmail(email: string) {
    if (!email) return { message: 'No email provided', data: [] };
    const result = this.suppliers.filter(
      (s) => s.email && s.email.toLowerCase().includes(email.toLowerCase()),
    );
    return { message: 'Suppliers filtered by email', data: result };
  }

  update(id: number, updateSupplierDto: Partial<SupplierDto>) {
    const index = this.suppliers.findIndex((s) => s.id === id);
    if (index === -1) throw new NotFoundException('Supplier not found');

    this.suppliers[index] = { ...this.suppliers[index], ...updateSupplierDto };
    return {
      message: 'Supplier updated successfully',
      data: this.suppliers[index],
    };
  }

  patch(id: number, partialData: Partial<SupplierDto>) {
    const supplier = this.suppliers.find((s) => s.id === id);
    if (!supplier) throw new NotFoundException('Supplier not found');

    Object.assign(supplier, partialData);
    return { message: 'Supplier partially updated', data: supplier };
  }

  delete(id: number) {
    const index = this.suppliers.findIndex((s) => s.id === id);
    if (index === -1) throw new NotFoundException('Supplier not found');

    const [removed] = this.suppliers.splice(index, 1);
    return { message: 'Supplier deleted successfully', data: removed };
  }

  countAll() {
    return { message: 'Total suppliers', count: this.suppliers.length };
  }

  // ========== CATEGORY 2 SUPPLIER METHODS ==========

  createCategory2(supplierData: SupplierDto & { profileImage?: string }) {
    const newSupplier = {
      id: this.category2IdCounter++,
      ...supplierData,
      category: 'category2',
    };
    this.suppliers.push(newSupplier);
    return {
      message: 'Category2 Supplier created successfully',
      data: newSupplier,
    };
  }

  findAllCategory2() {
    const data = this.suppliers.filter((s) => s.category === 'category2');
    return {
      message: 'All Category2 suppliers fetched',
      data,
      count: data.length,
    };
  }

  findOneCategory2(id: number) {
    const supplier = this.suppliers.find(
      (s) => s.id === id && s.category === 'category2',
    );
    if (!supplier) throw new NotFoundException('Category2 supplier not found');
    return { message: 'Category2 supplier found', data: supplier };
  }

  updateCategory2(id: number, updateData: Partial<SupplierDto>) {
    const index = this.suppliers.findIndex(
      (s) => s.id === id && s.category === 'category2',
    );
    if (index === -1) throw new NotFoundException('Category2 supplier not found');

    this.suppliers[index] = { ...this.suppliers[index], ...updateData };
    return {
      message: 'Category2 supplier updated successfully',
      data: this.suppliers[index],
    };
  }

  patchCategory2(id: number, partialData: Partial<SupplierDto>) {
    const supplier = this.suppliers.find(
      (s) => s.id === id && s.category === 'category2',
    );
    if (!supplier) throw new NotFoundException('Category2 supplier not found');

    Object.assign(supplier, partialData);
    return {
      message: 'Category2 supplier partially updated',
      data: supplier,
    };
  }

  deleteCategory2(id: number) {
    const index = this.suppliers.findIndex(
      (s) => s.id === id && s.category === 'category2',
    );
    if (index === -1) throw new NotFoundException('Category2 supplier not found');

    const [deleted] = this.suppliers.splice(index, 1);
    return { message: 'Category2 supplier deleted successfully', data: deleted };
  }

  countAllCategory2() {
    const data = this.suppliers.filter((s) => s.category === 'category2');
    return { message: 'Total Category2 suppliers', count: data.length };
  }

  findCategory2ByEmail(email: string) {
    if (!email) return { message: 'No email provided', data: [] };
    const result = this.suppliers.filter(
      (s) =>
        s.category === 'category2' &&
        s.email?.toLowerCase().includes(email.toLowerCase()),
    );
    return {
      message: 'Category2 suppliers filtered by email',
      data: result,
    };
  }

  findCategory2ByName(name: string) {
    if (!name) return { message: 'No name provided', data: [] };
    const result = this.suppliers.filter(
      (s) =>
        s.category === 'category2' &&
        s.name?.toLowerCase().includes(name.toLowerCase()),
    );
    return {
      message: 'Category2 suppliers filtered by name',
      data: result,
    };
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
    } catch (error) {
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
    } catch (error) {
      throw new BadRequestException('Failed to fetch Category4 suppliers');
    }
  }

  async getCategory4ById(id: number) {
    try {
      const supplier = await this.category4Repo.findOne({ where: { id } });
      if (!supplier)
        throw new NotFoundException('Category4 supplier not found');
      return {
        message: 'Category4 supplier found',
        data: supplier,
      };
    } catch (error) {
      throw error;
    }
  }

  async updateCountry(id: number, country: string) {
    try {
      const supplier = await this.category4Repo.findOne({ where: { id } });
      if (!supplier)
        throw new NotFoundException('Category4 supplier not found');

      supplier.country = country;
      const updatedSupplier = await this.category4Repo.save(supplier);

      return {
        message: 'Country updated successfully',
        data: updatedSupplier,
      };
    } catch (error) {
      throw error;
    }
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
    } catch (error) {
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
    } catch (error) {
      throw new BadRequestException(
        'Failed to fetch suppliers with default country',
      );
    }
  }

  async deleteCategory4(id: number) {
    try {
      const result = await this.category4Repo.delete(id);
      if (result.affected === 0) {
        throw new NotFoundException('Category4 supplier not found');
      }
      return {
        message: 'Category4 supplier deleted successfully',
      };
    } catch (error) {
      throw error;
    }
  }
}
