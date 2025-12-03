import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { NotificationEntity } from './notification.entity';
import { UserEntity } from '../auth/user.entity';
import { CreateNotificationDto } from './notification.dto';
 
@Injectable()
export class NotificationService {
  constructor(
    @InjectRepository(NotificationEntity)
    private readonly notificationRepo: Repository<NotificationEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepo: Repository<UserEntity>,
  ) {}
 
  async create(dto: CreateNotificationDto) {
    const user = await this.userRepo.findOne({ where: { id: dto.userId } });
    if (!user) throw new NotFoundException('User not found');
 
    const notification = this.notificationRepo.create({
      user,
      title: dto.title,
      message: dto.message,
      status: 'Unread',
    });
 
    const saved = await this.notificationRepo.save(notification);
    return { message: 'Notification created', data: saved };
  }
 
  async findByUser(userId: string) {
    const list = await this.notificationRepo.find({
      where: { user: { id: userId } },
      relations: ['user'],
      order: { id: 'DESC' },
    });
    return { message: 'Notifications fetched', data: list, count: list.length };
  }
 
  async markAsRead(id: number) {
    const n = await this.notificationRepo.findOne({ where: { id } });
    if (!n) throw new NotFoundException('Notification not found');
    n.status = 'Read';
    const updated = await this.notificationRepo.save(n);
    return { message: 'Notification marked as read', data: updated };
  }
 
  async remove(id: number) {
    const n = await this.notificationRepo.findOne({ where: { id } });
    if (!n) throw new NotFoundException('Notification not found');
    await this.notificationRepo.remove(n);
    return { message: 'Notification deleted' };
  }
}