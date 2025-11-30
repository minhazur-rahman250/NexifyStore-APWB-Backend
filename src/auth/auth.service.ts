import {
  Injectable,
  BadRequestException,
  UnauthorizedException,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { UserEntity } from './entities/user.entity';
import { RegisterDto, LoginDto } from './auth.dto';
import { MailerService } from '@nestjs-modules/mailer';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(UserEntity)
    private userRepo: Repository<UserEntity>,
    private jwtService: JwtService,
    private mailerService: MailerService,
  ) {}

  // ========== REGISTER (BCrypt Password Hashing) ==========
  async register(registerDto: RegisterDto) {
    const { email, password, fullName, phone, address } = registerDto;

    // Check if email already exists
    const existingUser = await this.userRepo.findOne({ where: { email } });
    if (existingUser) {
      throw new BadRequestException('Email already registered');
    }

    try {
      // Create new user (password will be hashed automatically in @BeforeInsert)
      const user = this.userRepo.create({
        fullName,
        email,
        password,
        phone,
        address,
        role: 'buyer', // Default role
        status: 'active',
      });

      const savedUser = await this.userRepo.save(user);

      // ========== MAILER (Bonus - Send Welcome Email) ==========
      await this.mailerService.sendMail({
        to: email,
        subject: 'Welcome to NexifyStore!',
        text: `Hello ${fullName},\n\nWelcome to NexifyStore! Your account has been successfully created.\n\nBest regards,\nNexifyStore Team`,
        html: `
          <h2>Welcome to NexifyStore!</h2>
          <p>Hello ${fullName},</p>
          <p>Your account has been successfully created.</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Role:</strong> Buyer</p>
          <p>Thank you for joining us!</p>
          <p>Best regards,<br/>NexifyStore Team</p>
        `,
      });

      return {
        message: 'User registered successfully',
        data: {
          id: savedUser.id,
          email: savedUser.email,
          fullName: savedUser.fullName,
          role: savedUser.role,
        },
      };
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'Registration failed',
          error: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // ========== LOGIN (JWT Token Generation) ==========
  async login(loginDto: LoginDto) {
    const { email, password } = loginDto;

    // Find user by email
    const user = await this.userRepo.findOne({ where: { email } });
    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    // Check if user is active
    if (user.status === 'inactive') {
      throw new UnauthorizedException('User account is inactive');
    }

    // Compare password using BCrypt
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid email or password');
    }

    // Generate JWT Token
    const payload = { id: user.id, email: user.email, role: user.role };
    const token = this.jwtService.sign(payload, {
      expiresIn: '24h',
      secret: 'your-secret-key-change-this-in-production',
    });

    return {
      message: 'Login successful',
      data: {
        accessToken: token,
        user: {
          id: user.id,
          email: user.email,
          fullName: user.fullName,
          role: user.role,
        },
      },
    };
  }

  // ========== GET ALL USERS ==========
  async getAllUsers() {
    try {
      const users = await this.userRepo.find();
      return {
        message: 'All users fetched',
        data: users,
        count: users.length,
      };
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.BAD_REQUEST,
          message: 'Failed to fetch users',
          error: error.message,
        },
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  // ========== GET USER BY ID ==========
  async getUserById(id: string) {
    try {
      const user = await this.userRepo.findOne({ where: { id } });
      if (!user) {
        throw new HttpException(
          {
            status: HttpStatus.NOT_FOUND,
            message: 'User not found',
          },
          HttpStatus.NOT_FOUND,
        );
      }
      return {
        message: 'User found',
        data: user,
      };
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          message: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // ========== UPDATE USER ROLE (Admin Only) ==========
  async updateUserRole(userId: string, role: string) {
    try {
      const user = await this.userRepo.findOne({ where: { id: userId } });
      if (!user) {
        throw new HttpException(
          {
            status: HttpStatus.NOT_FOUND,
            message: 'User not found',
          },
          HttpStatus.NOT_FOUND,
        );
      }

      user.role = role as any;
      const updatedUser = await this.userRepo.save(user);

      return {
        message: 'User role updated successfully',
        data: updatedUser,
      };
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'Failed to update user role',
          error: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  // ========== DELETE USER ==========
  async deleteUser(userId: string) {
    try {
      const user = await this.userRepo.findOne({ where: { id: userId } });
      if (!user) {
        throw new HttpException(
          {
            status: HttpStatus.NOT_FOUND,
            message: 'User not found',
          },
          HttpStatus.NOT_FOUND,
        );
      }

      await this.userRepo.remove(user);

      return {
        message: 'User deleted successfully',
        data: userId,
      };
    } catch (error) {
      throw new HttpException(
        {
          status: HttpStatus.INTERNAL_SERVER_ERROR,
          message: 'Failed to delete user',
          error: error.message,
        },
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
