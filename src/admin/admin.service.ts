import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Like } from 'typeorm';
import { AdminEntity } from './admin.entity';
import { AdminDto } from './admin.dto';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(AdminEntity)
    private readonly adminRepo: Repository<AdminEntity>,
  ) {}

  async create(adminDto: AdminDto) {
    const admin = this.adminRepo.create({
      ...adminDto,
      fileName: adminDto.file ? adminDto.file.originalname : null,
    });

    await this.adminRepo.save(admin);

    return {
      message: 'Admin created successfully',
      "name": admin.name,
      "email": admin.email, 
      "phone": admin.phone,
      "fileName": admin.fileName,
    };
  }

  async findAll() {
    return this.adminRepo.find();
  }

  async findByEmail(email: string) {
    return this.adminRepo.find({
      where: { email: Like(`%${email}%`) },
    });
  }

  async findOne(id: number) {
    const admin = await this.adminRepo.findOne({ where: { id } });
    if (!admin) throw new NotFoundException('Admin not found');
    return admin;
  }

  async update(id: number, adminDto: AdminDto) {
    const admin = await this.findOne(id);
    Object.assign(admin, adminDto);
    await this.adminRepo.save(admin);

    return {
      message: 'Admin updated successfully',
      "name": admin.name,
      "email": admin.email, 
      "phone": admin.phone,
      "fileName": admin.fileName,
    };
  }

  async patchEmail(id: number, email: string) {
    const admin = await this.findOne(id);
    admin.email = email;
    await this.adminRepo.save(admin);

    return {
      message: 'Email updated successfully',
      "name": admin.name,
      "email": admin.email, 
      "phone": admin.phone,
      "fileName": admin.fileName,
    };
  }

  async remove(id: number) {
    const admin = await this.findOne(id);
    await this.adminRepo.remove(admin);

    return { message: 'Admin removed successfully', admin };
  }

  async deleteAll() {
    await this.adminRepo.clear();
    return { message: 'All admins deleted successfully' };
  }

  async findByFullName(substring: string) {
    return this.adminRepo.find({ where: { fullName: Like(`%${substring}%`) } });
  }

  async findByUsername(username: string) {
    const user = await this.adminRepo.findOne({ where: { username } });
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async removeByUsername(username: string) {
    const user = await this.findByUsername(username);
    await this.adminRepo.remove(user);
    return { message: 'User removed', user };
  }

}