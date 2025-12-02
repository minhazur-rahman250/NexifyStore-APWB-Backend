import {
  Injectable,
  NotFoundException,
  BadRequestException,
  ForbiddenException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UserEntity } from '../auth/user.entity';
import { AdminActionLogEntity } from './admin-action-log.entity';
import { ApproveRejectDto, BanUserDto, UpdateUserStatusDto } from './admin.dto';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(AdminActionLogEntity)
    private actionLogRepo: Repository<AdminActionLogEntity>,
    @InjectRepository(UserEntity)
    private userRepo: Repository<UserEntity>,
  ) {}

  // ========== APPROVE USER ==========
  async approveUser(adminId: string, dto: ApproveRejectDto) {
    try {
      // Find target user
      const targetUser = await this.userRepo.findOne({
        where: { id: dto.targetUserId },
      });

      if (!targetUser) {
        throw new NotFoundException('User not found');
      }

      // Update user status to active
      targetUser.status = 'active';
      await this.userRepo.save(targetUser);

      // Log the action
      const log = this.actionLogRepo.create({
        adminId,
        targetUserId: dto.targetUserId,
        actionType: 'Approve',
        comments: dto.comments || 'User approved by admin',
      });

      await this.actionLogRepo.save(log);

      return {
        message: 'User approved successfully',
        data: {
          userId: targetUser.id,
          email: targetUser.email,
          status: targetUser.status,
          approvedAt: new Date(),
        },
      };
    } catch (error) {
      throw error;
    }
  }

  // ========== REJECT USER ==========
  async rejectUser(adminId: string, dto: ApproveRejectDto) {
    try {
      // Find target user
      const targetUser = await this.userRepo.findOne({
        where: { id: dto.targetUserId },
      });

      if (!targetUser) {
        throw new NotFoundException('User not found');
      }

      // Update user status to inactive
      targetUser.status = 'inactive';
      await this.userRepo.save(targetUser);

      // Log the action
      const log = this.actionLogRepo.create({
        adminId,
        targetUserId: dto.targetUserId,
        actionType: 'Reject',
        comments: dto.comments || 'User rejected by admin',
      });

      await this.actionLogRepo.save(log);

      return {
        message: 'User rejected successfully',
        data: {
          userId: targetUser.id,
          email: targetUser.email,
          status: targetUser.status,
          rejectedAt: new Date(),
        },
      };
    } catch (error) {
      throw error;
    }
  }

  // ========== SUSPEND USER ==========
  async suspendUser(adminId: string, dto: ApproveRejectDto) {
    try {
      const targetUser = await this.userRepo.findOne({
        where: { id: dto.targetUserId },
      });

      if (!targetUser) {
        throw new NotFoundException('User not found');
      }

      targetUser.status = 'inactive';
      await this.userRepo.save(targetUser);

      const log = this.actionLogRepo.create({
        adminId,
        targetUserId: dto.targetUserId,
        actionType: 'Suspend',
        comments: dto.comments || 'User suspended by admin',
      });

      await this.actionLogRepo.save(log);

      return {
        message: 'User suspended successfully',
        data: {
          userId: targetUser.id,
          status: targetUser.status,
        },
      };
    } catch (error) {
      throw error;
    }
  }

  // ========== BAN USER ==========
  async banUser(adminId: string, dto: BanUserDto) {
    try {
      const targetUser = await this.userRepo.findOne({
        where: { id: dto.targetUserId },
      });

      if (!targetUser) {
        throw new NotFoundException('User not found');
      }

      targetUser.status = 'inactive';
      await this.userRepo.save(targetUser);

      const log = this.actionLogRepo.create({
        adminId,
        targetUserId: dto.targetUserId,
        actionType: 'Ban',
        comments: dto.reason,
      });

      await this.actionLogRepo.save(log);

      return {
        message: 'User banned successfully',
        data: {
          userId: targetUser.id,
          bannedAt: new Date(),
        },
      };
    } catch (error) {
      throw error;
    }
  }

  // ========== UPDATE USER ROLE ==========
  async updateUserRole(
    adminId: string,
    userId: string,
    newRole: string,
  ) {
    try {
      const validRoles = ['admin', 'seller', 'buyer', 'supplier'];
      if (!validRoles.includes(newRole)) {
        throw new BadRequestException('Invalid role');
      }

      const targetUser = await this.userRepo.findOne({
        where: { id: userId },
      });

      if (!targetUser) {
        throw new NotFoundException('User not found');
      }

      const oldRole = targetUser.role;
      targetUser.role = newRole as any;
      await this.userRepo.save(targetUser);

      const log = this.actionLogRepo.create({
        adminId,
        targetUserId: userId,
        actionType: 'Approve',
        comments: `Role changed from ${oldRole} to ${newRole}`,
      });

      await this.actionLogRepo.save(log);

      return {
        message: 'User role updated successfully',
        data: {
          userId: targetUser.id,
          email: targetUser.email,
          oldRole,
          newRole: targetUser.role,
        },
      };
    } catch (error) {
      throw error;
    }
  }

  // ========== DELETE USER ==========
  async deleteUser(adminId: string, targetUserId: string) {
    try {
      const targetUser = await this.userRepo.findOne({
        where: { id: targetUserId },
      });

      if (!targetUser) {
        throw new NotFoundException('User not found');
      }

      await this.userRepo.remove(targetUser);

      const log = this.actionLogRepo.create({
        adminId,
        targetUserId: targetUserId,
        actionType: 'Delete',
        comments: 'User deleted by admin',
      });

      await this.actionLogRepo.save(log);

      return {
        message: 'User deleted successfully',
        data: {
          userId: targetUserId,
          deletedAt: new Date(),
        },
      };
    } catch (error) {
      throw error;
    }
  }

  // ========== GET ALL LOGS ==========
  async getAllLogs() {
    try {
      const logs = await this.actionLogRepo.find({
        relations: ['admin', 'targetUser'],
        order: { createdAt: 'DESC' },
      });

      return {
        message: 'All action logs fetched',
        data: logs,
        count: logs.length,
      };
    } catch (error) {
      throw new BadRequestException('Failed to fetch logs');
    }
  }

  // ========== GET LOG BY ID ==========
  async getLogById(logId: number) {
    try {
      const log = await this.actionLogRepo.findOne({
        where: { actionId: logId },
        relations: ['admin', 'targetUser'],
      });

      if (!log) {
        throw new NotFoundException('Log not found');
      }

      return {
        message: 'Log found',
        data: log,
      };
    } catch (error) {
      throw error;
    }
  }

  // ========== GET LOGS BY ADMIN ==========
  async getLogsByAdmin(adminId: string) {
    try {
      const logs = await this.actionLogRepo.find({
        where: { adminId },
        relations: ['admin', 'targetUser'],
        order: { createdAt: 'DESC' },
      });

      return {
        message: `All logs by admin ${adminId}`,
        data: logs,
        count: logs.length,
      };
    } catch (error) {
      throw new BadRequestException('Failed to fetch logs');
    }
  }

  // ========== GET LOGS BY TARGET USER ==========
  async getLogsByTargetUser(targetUserId: string) {
    try {
      const logs = await this.actionLogRepo.find({
        where: { targetUserId },
        relations: ['admin', 'targetUser'],
        order: { createdAt: 'DESC' },
      });

      return {
        message: `All logs for user ${targetUserId}`,
        data: logs,
        count: logs.length,
      };
    } catch (error) {
      throw new BadRequestException('Failed to fetch logs');
    }
  }

  // ========== GET LOGS BY ACTION TYPE ==========
  async getLogsByActionType(actionType: string) {
    try {
      const validActions = ['Approve', 'Suspend', 'Reject', 'Warn', 'Delete', 'Ban'];
      if (!validActions.includes(actionType)) {
        throw new BadRequestException('Invalid action type');
      }

      const logs = await this.actionLogRepo.find({
        where: { actionType: actionType as any },
        relations: ['admin', 'targetUser'],
        order: { createdAt: 'DESC' },
      });

      return {
        message: `All logs with action type ${actionType}`,
        data: logs,
        count: logs.length,
      };
    } catch (error) {
      throw error;
    }
  }

  // ========== GET ALL USERS (For Admin Dashboard) ==========
  async getAllUsers() {
    try {
      const users = await this.userRepo.find({
        select: ['id', 'fullName', 'email', 'role', 'status', 'createdAt'],
      });

      return {
        message: 'All users fetched',
        data: users,
        count: users.length,
      };
    } catch (error) {
      throw new BadRequestException('Failed to fetch users');
    }
  }

  // ========== GET USERS BY ROLE ==========
  async getUsersByRole(role: string) {
    try {
      const validRoles = ['admin', 'seller', 'buyer', 'supplier'];
      if (!validRoles.includes(role)) {
        throw new BadRequestException('Invalid role');
      }

      const users = await this.userRepo.find({
        where: { role: role as any },
      });

      return {
        message: `All ${role}s fetched`,
        data: users,
        count: users.length,
      };
    } catch (error) {
      throw error;
    }
  }

  // ========== GET USERS BY STATUS ==========
  async getUsersByStatus(status: string) {
    try {
      const validStatus = ['active', 'inactive'];
      if (!validStatus.includes(status)) {
        throw new BadRequestException('Invalid status');
      }

      const users = await this.userRepo.find({
        where: { status: status as any },
      });

      return {
        message: `All ${status} users fetched`,
        data: users,
        count: users.length,
      };
    } catch (error) {
      throw error;
    }
  }

  // ========== GET DASHBOARD STATS ==========
  async getDashboardStats() {
    try {
      const totalUsers = await this.userRepo.count();
      const activeUsers = await this.userRepo.count({ where: { status: 'active' } });
      const inactiveUsers = await this.userRepo.count({ where: { status: 'inactive' } });

      const buyerCount = await this.userRepo.count({ where: { role: 'buyer' } });
      const sellerCount = await this.userRepo.count({ where: { role: 'seller' } });
      const supplierCount = await this.userRepo.count({ where: { role: 'supplier' } });
      const adminCount = await this.userRepo.count({ where: { role: 'admin' } });

      const totalActions = await this.actionLogRepo.count();

      return {
        message: 'Dashboard stats retrieved',
        data: {
          users: {
            total: totalUsers,
            active: activeUsers,
            inactive: inactiveUsers,
          },
          usersByRole: {
            buyer: buyerCount,
            seller: sellerCount,
            supplier: supplierCount,
            admin: adminCount,
          },
          totalActions,
        },
      };
    } catch (error) {
      throw new BadRequestException('Failed to fetch dashboard stats');
    }
  }
}
