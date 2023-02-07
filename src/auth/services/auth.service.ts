import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { MailerService } from '@nestjs-modules/mailer';
import * as dayjs from 'dayjs';
import * as isBetween from 'dayjs/plugin/isBetween';
dayjs.extend(isBetween);

import { EnvVariables } from '@/config/environment';
import { MessageDto } from '@/shared/dto/message.dto';
import { PasswordUtilService } from '@/shared/password-util';
import { UserService } from '@/user/services/user.service';

import {
  ChangePasswordDto,
  LoginDto,
  ResetPasswordDto,
  TokenDto,
} from '../dto';
import { ConfirmEmailDto } from '../dto/confirm-email.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
    private readonly passwordUtilService: PasswordUtilService,
    private readonly mailService: MailerService,
    private readonly config: ConfigService,
  ) {}

  async login(dto: LoginDto): Promise<TokenDto> {
    const { email, password } = dto;
    const user = await this.userService.findOneByEmail(email);

    if (!user) {
      throw new UnauthorizedException();
    }

    const { id, password: encryptedPassword } = user;

    const isPasswordValid = await this.passwordUtilService.validatePassword(
      password,
      encryptedPassword,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException();
    }

    await this.mailService.sendMail({
      to: user.email,
      subject: 'New Login',
      template: 'new-login.hbs',
      context: {
        name: user.name,
      },
    });

    return this.generateToken(id);
  }

  async resetPassword(dto: ResetPasswordDto): Promise<MessageDto> {
    const user = await this.userService.findOneByEmail(dto.email);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const { token } = this.generateToken(user.id);
    user.resetPasswordToken = token;
    user.resetPasswordExpires = dayjs().set('hour', 1).toDate();
    await this.userService.update(user.id, user);
    const url = `${this.config.get(
      EnvVariables.FRONTEND_URL,
    )}/reset-password/${token}`;

    await this.mailService.sendMail({
      to: user.email,
      subject: 'Reset password',
      template: 'reset-password.hbs',
      context: {
        name: user.name,
        url,
      },
    });

    return { message: 'Reset password email send' };
  }

  async changePassword(
    token: string,
    dto: ChangePasswordDto,
  ): Promise<MessageDto> {
    const user = await this.userService.findOneByEmail(dto.email);
    if (!user) {
      throw new NotFoundException('User not found');
    }

    const { resetPasswordExpires, resetPasswordToken } = user;

    if (!resetPasswordToken && !resetPasswordExpires) {
      throw new BadRequestException('Request reset password again');
    }

    if (resetPasswordToken !== token) {
      throw new BadRequestException('Token expired');
    }
    const now = dayjs();
    const end = dayjs(resetPasswordExpires);
    const start = end.subtract(1, 'hour');

    if (!now.isBetween(start, end)) {
      throw new BadRequestException('Token expired');
    }

    const hashedPassword = await this.passwordUtilService.hashPassword(
      dto.newPassword,
    );

    await this.userService.update(user.id, {
      ...user,
      password: hashedPassword,
      resetPasswordExpires: null,
      resetPasswordToken: null,
    });

    await this.mailService.sendMail({
      to: user.email,
      subject: 'Password changed',
      template: 'change-password.hbs',
      context: {
        name: user.name,
      },
    });
    return { message: 'Password changed successfully' };
  }

  async confirmEmail(dto: ConfirmEmailDto): Promise<MessageDto> {
    const tokenInfo = await this.jwtService.decode(dto.token);

    const { email } = await this.userService.findOne(tokenInfo['userId']);

    if (!email) {
      throw new BadRequestException('Invalid token');
    }

    const user = await this.userService.findOneByEmail(email);

    user.emailVerified = true;

    await this.userService.update(user.id, user);

    await this.mailService.sendMail({
      to: user.email,
      subject: 'Confirmed email',
      template: 'confirm-email.hbs',
      context: {
        name: user.name,
      },
    });

    return { message: 'Email confirmed successfully' };
  }

  generateToken(userId: number): TokenDto {
    const payload = { userId };
    return {
      token: this.jwtService.sign(payload),
    };
  }
}
