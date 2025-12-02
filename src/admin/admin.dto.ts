import { IsString, IsNotEmpty, IsOptional, IsUUID, IsIn } from 'class-validator';

// ========== APPROVE/REJECT USER DTO ==========
export class ApproveRejectDto {
  @IsUUID()
  @IsNotEmpty()
  targetUserId: string;

  @IsString()
  @IsOptional()
  comments?: string;
}

// ========== UPDATE USER STATUS DTO ==========
export class UpdateUserStatusDto {
  @IsString()
  @IsIn(['active', 'inactive'])
  @IsNotEmpty()
  status: 'active' | 'inactive';

  @IsString()
  @IsOptional()
  reason?: string;
}

// ========== BAN USER DTO ==========
export class BanUserDto {
  @IsUUID()
  @IsNotEmpty()
  targetUserId: string;

  @IsString()
  @IsNotEmpty()
  reason: string;
}

// ========== GET LOG QUERY DTO ==========
export class GetLogsQueryDto {
  @IsString()
  @IsOptional()
  actionType?: string;

  @IsString()
  @IsOptional()
  adminId?: string;

  @IsString()
  @IsOptional()
  targetUserId?: string;
}
