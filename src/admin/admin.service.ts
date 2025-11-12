import { Injectable } from '@nestjs/common';
import { AdminDto } from './admin.dto';

@Injectable()
export class AdminService {
  private admins: AdminDto[] = [
    { id: 1, name: 'Minhaz Rahman', email: 'minhaz1@gmail.com', password: 'pass123', phone: '01700000000' },
    { id: 2, name: 'Arif Khan', email: 'arifkhan@gmail.com', password: 'pass234', phone: '01700000001' },
    { id: 3, name: 'Rafiul Islam', email: 'rafiul@gmail.com', password: 'pass345', phone: '01700000002' },
    { id: 4, name: 'Sadia Jahan', email: 'sadia@gmail.com', password: 'pass456', phone: '01700000003' },
    { id: 5, name: 'Tanmoy Hasan', email: 'tanmoy@gmail.com', password: 'pass567', phone: '01700000004' },
    { id: 6, name: 'Nusrat Alam', email: 'nusrat@gmail.com', password: 'pass678', phone: '01700000005' },
    { id: 7, name: 'Ruhul Amin', email: 'ruhul@gmail.com', password: 'pass789', phone: '01700000006' },
    { id: 8, name: 'Tahsin Rahman', email: 'tahsin@gmail.com', password: 'pass890', phone: '01700000007' },
    { id: 9, name: 'Farhana Akter', email: 'farhana@gmail.com', password: 'pass901', phone: '01700000008' },
    { id: 10, name: 'Hasan Mahmud', email: 'hasan@gmail.com', password: 'pass012', phone: '01700000009' },
    {
      id: 11,
      name: 'Minhaz Rahman mahi',
      email: 'minhaz@minhazmahi',
      password: 'pass1234567',
      phone: '01711112222'
    }
  ];

  create(adminDto: AdminDto) {
    const admin = { ...adminDto, id: this.admins.length + 1 };

    this.admins.push(admin);

    return {
      message: 'Admin created successfully',
      name: admin.name,
      email: admin.email,
      phone: admin.phone,
      file: admin.file ? admin.file.originalname : 'No file uploaded'
    };
  }

  postEmail(payload: object) {
    return {
      message: 'Email received successfully!',
      data: payload,
    };
  }

  findAll() {
    return this.admins;
  }

  findByEmail(email: string) {
    return this.admins.filter(a => a.email.includes(email));
  }

  findOne(id: number) {
    return this.admins.find(admin => admin.id === id) || { message: 'Admin not found' };
  }

  update(id: number, adminDto: AdminDto) {
    const admin = this.admins.find(a => a.id === id);
    if (!admin) return { message: 'Admin not found' };
    Object.assign(admin, adminDto);
    return { message: 'Admin updated successfully', admin };
  }

  patchEmail(id: number, email: string) {
    const admin = this.admins.find(a => a.id === id);
    if (!admin) return { message: 'Admin not found' };
    admin.email = email;
    return { message: 'Email updated successfully', admin };
  }

  remove(id: number) {
    const index = this.admins.findIndex(a => a.id === id);
    if (index === -1) return { message: 'Admin not found' };
    const deleted = this.admins.splice(index, 1)[0];
    return { message: 'Admin deleted successfully', deleted };
  }

  deleteAll() {
    this.admins = [];
    return { message: 'All admins deleted successfully' };
  }
}