import { Injectable, BadRequestException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ILike } from 'typeorm';
import { CategoryEntity } from './category.entity';
import { CategoryDto } from './category.dto';
 
@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(CategoryEntity)
    private readonly categoryRepo: Repository<CategoryEntity>,
  ) {}
 
  async create(dto: CategoryDto) {
     
    const existing = await this.categoryRepo.findOne({ where: { name: dto.name } });
    if (existing) {
      throw new BadRequestException('Category name already exists');
    }
 
    const category = this.categoryRepo.create(dto);
    const saved = await this.categoryRepo.save(category);
    return { message: 'Category created', data: saved };
  }
 
  async findAll(search?: string) {
    const where = search ? { name: ILike(`%${search}%`) } : {};
    const categories = await this.categoryRepo.find({ where });
    return {
      message: 'Categories fetched',
      data: categories,
      count: categories.length,
    };
  }
 
  async findOne(id: number) {
    const category = await this.categoryRepo.findOne({
      where: { id },
      relations: ['products'],
    });
    if (!category) throw new NotFoundException('Category not found');
    return { message: 'Category found', data: category };
  }
 
  async update(id: number, dto: Partial<CategoryDto>) {
    const category = await this.categoryRepo.findOne({ where: { id } });
    if (!category) throw new NotFoundException('Category not found');
 
    Object.assign(category, dto);
    const updated = await this.categoryRepo.save(category);
    return { message: 'Category updated', data: updated };
  }
 
  async remove(id: number) {
    const category = await this.categoryRepo.findOne({ where: { id } });
    if (!category) throw new NotFoundException('Category not found');
    await this.categoryRepo.remove(category);
    return { message: 'Category deleted' };
  }
}