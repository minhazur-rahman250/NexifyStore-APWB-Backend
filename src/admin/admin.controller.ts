import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  Query,
  UseGuards,
  Request,
  ParseUUIDPipe,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { AdminService } from './admin.service';
import {
  ApproveRejectDto,
  BanUserDto,
  UpdateUserStatusDto,
  GetLogsQueryDto,
} from './admin.dto';
import { JwtAuthGuard } from '../auth/jwt.guard';
// import { RoleGuard } from '../auth/role.guard';

@Controller('admin')
@UseGuards(JwtAuthGuard)
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  // ========== DASHBOARD & STATS ==========

  // GET /admin/dashboard/stats
  @Get('dashboard/stats')
  async getDashboardStats() {
    return await this.adminService.getDashboardStats();
  }

  // ========== USER MANAGEMENT ==========

  // GET /admin/users - Get All Users
  @Get('users')
  async getAllUsers() {
    return await this.adminService.getAllUsers();
  }

  // GET /admin/users/role/:role - Get Users by Role
  @Get('users/role/:role')
  async getUsersByRole(@Param('role') role: string) {
    return await this.adminService.getUsersByRole(role);
  }

  // GET /admin/users/status/:status - Get Users by Status
  @Get('users/status/:status')
  async getUsersByStatus(@Param('status') status: string) {
    return await this.adminService.getUsersByStatus(status);
  }

  // ========== USER ACTIONS ==========

  // POST /admin/users/:id/approve - Approve User
  @Post('users/:id/approve')
  @HttpCode(HttpStatus.OK)
  async approveUser(
    @Request() req,
    @Param('id', ParseUUIDPipe) userId: string,
    @Body() dto: ApproveRejectDto,
  ) {
    dto.targetUserId = userId;
    return await this.adminService.approveUser(req.user.userId, dto);
  }

  // POST /admin/users/:id/reject - Reject User
  @Post('users/:id/reject')
  @HttpCode(HttpStatus.OK)
  async rejectUser(
    @Request() req,
    @Param('id', ParseUUIDPipe) userId: string,
    @Body() dto: ApproveRejectDto,
  ) {
    dto.targetUserId = userId;
    return await this.adminService.rejectUser(req.user.userId, dto);
  }

  // POST /admin/users/:id/suspend - Suspend User
  @Post('users/:id/suspend')
  @HttpCode(HttpStatus.OK)
  async suspendUser(
    @Request() req,
    @Param('id', ParseUUIDPipe) userId: string,
    @Body() dto: ApproveRejectDto,
  ) {
    dto.targetUserId = userId;
    return await this.adminService.suspendUser(req.user.userId, dto);
  }

  // POST /admin/users/:id/ban - Ban User
  @Post('users/:id/ban')
  @HttpCode(HttpStatus.OK)
  async banUser(
    @Request() req,
    @Param('id', ParseUUIDPipe) userId: string,
    @Body() dto: BanUserDto,
  ) {
    dto.targetUserId = userId;
    return await this.adminService.banUser(req.user.userId, dto);
  }

  // PATCH /admin/users/:id/role - Update User Role
  @Patch('users/:id/role')
  async updateUserRole(
    @Request() req,
    @Param('id', ParseUUIDPipe) userId: string,
    @Body('newRole') newRole: string,
  ) {
    return await this.adminService.updateUserRole(req.user.userId, userId, newRole);
  }

  // DELETE /admin/users/:id - Delete User
  @Delete('users/:id')
  @HttpCode(HttpStatus.OK)
  async deleteUser(@Request() req, @Param('id', ParseUUIDPipe) userId: string) {
    return await this.adminService.deleteUser(req.user.userId, userId);
  }

  // ========== ACTION LOGS ==========

  // GET /admin/logs - Get All Logs
  @Get('logs')
  async getAllLogs() {
    return await this.adminService.getAllLogs();
  }

  // GET /admin/logs/:id - Get Log by ID
  @Get('logs/:id')
  async getLogById(@Param('id') id: number) {
    return await this.adminService.getLogById(id);
  }

  // GET /admin/logs/admin/:adminId - Get Logs by Admin
  @Get('logs/admin/:adminId')
  async getLogsByAdmin(@Param('adminId', ParseUUIDPipe) adminId: string) {
    return await this.adminService.getLogsByAdmin(adminId);
  }

  // GET /admin/logs/target/:targetUserId - Get Logs by Target User
  @Get('logs/target/:targetUserId')
  async getLogsByTargetUser(
    @Param('targetUserId', ParseUUIDPipe) targetUserId: string,
  ) {
    return await this.adminService.getLogsByTargetUser(targetUserId);
  }

  // GET /admin/logs/action/:actionType - Get Logs by Action Type
  @Get('logs/action/:actionType')
  async getLogsByActionType(@Param('actionType') actionType: string) {
    return await this.adminService.getLogsByActionType(actionType);
  }
}
