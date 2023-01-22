import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { UserDto } from '@/user/dto';
import { UserEntity } from '@/user/entities/user.entity';

import { User } from '../decorators/user.decorator';
import { LoginDto, TokenDto } from '../dto';
import { JwtGuard } from '../guards/jwt.guard';
import { AuthService } from '../services/auth.service';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    @InjectMapper() private readonly mapper: Mapper,
  ) {}

  @Post('login')
  @ApiOkResponse({ type: TokenDto })
  async login(@Body() dto: LoginDto): Promise<TokenDto> {
    return await this.authService.login(dto);
  }

  @Post('reset-password')
  @ApiResponse({ type: 'boolean' })
  async resetPassword(): Promise<boolean> {
    return true;
  }

  @Post('change-password')
  @ApiResponse({ type: 'boolean' })
  async changePassword(): Promise<boolean> {
    return true;
  }

  @Get('current-user')
  @UseGuards(JwtGuard)
  @ApiBearerAuth('jwt')
  @ApiOkResponse({ type: UserDto })
  async currentUser(@User() user: UserEntity): Promise<UserDto> {
    return this.mapper.map(user, UserEntity, UserDto);
  }
}
