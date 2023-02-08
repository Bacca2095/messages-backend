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

import { User } from '@auth/decorators/user.decorator';
import {
  ChangePasswordDto,
  LoginDto,
  ResetPasswordDto,
  TokenDto,
} from '@auth/dto';
import { ConfirmEmailDto } from '@auth/dto/confirm-email.dto';
import { GoogleLoginDto } from '@auth/dto/google-login.dto';
import { LoginProviders } from '@auth/enums/login-providers.enum';
import { JwtGuard } from '@auth/guards/jwt.guard';
import { AuthService } from '@auth/services/auth.service';
import { MessageDto } from '@shared/dto/message.dto';
import { UserDto } from '@user/dto';
import { UserEntity } from '@user/entities/user.entity';

import { AuthGoogleService } from './../services/auth-google.service';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    @InjectMapper() private readonly mapper: Mapper,
    private readonly authGoogleService: AuthGoogleService,
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

  @Post('google/login')
  @ApiOkResponse({ type: TokenDto })
  async googleLogin(@Body() loginDto: GoogleLoginDto) {
    const socialData = await this.authGoogleService.getProfileByToken(loginDto);
    return this.authService.socialLogin(LoginProviders.GOOGLE, socialData);
  }
}
