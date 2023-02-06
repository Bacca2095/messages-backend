import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiResponse,
  ApiTags,
} from '@nestjs/swagger';

import { MessageDto } from '@/shared/dto/message.dto';
import { UserDto } from '@/user/dto';
import { UserEntity } from '@/user/entities/user.entity';

import { User } from '../decorators/user.decorator';
import {
  ChangePasswordDto,
  LoginDto,
  ResetPasswordDto,
  TokenDto,
} from '../dto';
import { ConfirmEmailDto } from '../dto/confirm-email.dto';
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
  @ApiResponse({ type: MessageDto })
  async resetPassword(@Body() dto: ResetPasswordDto): Promise<MessageDto> {
    return this.authService.resetPassword(dto);
  }

  @Post('change-password/:token')
  @ApiResponse({ type: MessageDto })
  async changePassword(
    @Param('token') token: string,
    @Body() dto: ChangePasswordDto,
  ): Promise<MessageDto> {
    return this.authService.changePassword(token, dto);
  }

  @Get('confirm-email')
  @ApiOkResponse({ type: MessageDto })
  async confirmEmail(@Query() dto: ConfirmEmailDto): Promise<MessageDto> {
    return this.authService.confirmEmail(dto);
  }

  @Get('current-user')
  @UseGuards(JwtGuard)
  @ApiBearerAuth('jwt')
  @ApiOkResponse({ type: UserDto })
  async currentUser(@User() user: UserEntity): Promise<UserDto> {
    return this.mapper.map(user, UserEntity, UserDto);
  }
}
