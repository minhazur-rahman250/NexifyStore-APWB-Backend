import {
  Controller,
  Post,
  Get,
  Body,
  Param,
  Patch,
  Delete,
  UseGuards,
  Request,
  HttpCode,
  HttpStatus,
  BadRequestException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto, LoginDto } from './auth.dto';
import { JwtAuthGuard } from './jwt.guard';
import { RoleGuard } from './role.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  // ========== PUBLIC ROUTES ==========

  // POST /auth/register - Register New User
  @Post('register')
  @HttpCode(HttpStatus.CREATED)
  async register(@Body() registerDto: RegisterDto) {
    try {
      return await this.authService.register(registerDto);
    } catch (error) {
      throw error;
    }
  }

  // POST /auth/login - User Login (JWT)
  @Post('login')
  @HttpCode(HttpStatus.OK)
  async login(@Body() loginDto: LoginDto) {
    try {
      return await this.authService.login(loginDto);
    } catch (error) {
      throw error;
    }
  }

  // ========== PROTECTED ROUTES (JWT Required) ==========

  // GET /auth/profile - Get Logged-In User Profile
  @Get('profile')
  @UseGuards(JwtAuthGuard)
  async getProfile(@Request() req) {
    try {
      const user = req.user;
      return {
        message: 'Profile fetched',
        data: user,
      };
    } catch (error) {
      throw new NotFoundException('Failed to fetch profile');
    }
  }

  // GET /auth/users - Get All Users (Admin Only)
  @Get('users')
  @UseGuards(JwtAuthGuard, RoleGuard)
  async getAllUsers() {
    return await this.authService.getAllUsers();
  }

  // GET /auth/users/:id - Get User by ID
  @Get('users/:id')
  @UseGuards(JwtAuthGuard)
  async getUserById(@Param('id') id: string) {
    return await this.authService.getUserById(id);
  }

  // PATCH /auth/users/:id/role - Update User Role (Admin Only)
  @Patch('users/:id/role')
  @UseGuards(JwtAuthGuard, RoleGuard)
  async updateUserRole(@Param('id') id: string, @Body('role') role: string) {
    if (!['admin', 'seller', 'buyer', 'supplier'].includes(role)) {
      throw new BadRequestException('Invalid role');
    }
    return await this.authService.updateUserRole(id, role);
  }

  // DELETE /auth/users/:id - Delete User (Admin Only)
  @Delete('users/:id')
  @UseGuards(JwtAuthGuard, RoleGuard)
  async deleteUser(@Param('id') id: string) {
    return await this.authService.deleteUser(id);
  }
}
