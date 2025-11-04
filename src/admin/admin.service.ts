import { Injectable } from '@nestjs/common';
import { AdminDto } from './admin.dto';

@Injectable()
export class AdminService {
  private admins: any[] = [];

  create(adminDto: AdminDto) {
    const admin = { id: this.admins.length + 1, ...adminDto };
    this.admins.push(admin);
    return admin;
  }

  findAll() {
    return this.admins;
  }

  findOne(id: number) {
    return this.admins.find(admin => admin.id === id) || {};
  }

  update(id: number, adminDto: AdminDto) {
    const admin = this.admins.find(a => a.id === id);
    if (admin) {
      Object.assign(admin, adminDto);
      return admin;
    }
    return {};
  }

  remove(id: number) {
    const index = this.admins.findIndex(a => a.id === id);
    if (index !== -1) {
      return this.admins.splice(index, 1)[0];
    }
    return {};
  }
}
