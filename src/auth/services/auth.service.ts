import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcryptjs';

import { UserService } from '@/user/services/user.service';

import { LoginDto, TokenDto } from '../dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async login(dto: LoginDto): Promise<TokenDto> {
    const { email, password } = dto;
    const user = await this.userService.findOneByEmail(email);

    if (!user) {
      throw new UnauthorizedException();
    }
    const { id, password: encryptedPassword } = user;

    const isPasswordValid = await this.validatePassword(
      password,
      encryptedPassword,
    );

    if (!isPasswordValid) {
      throw new UnauthorizedException();
    }

    return this.generateToken(id);
  }

  generateToken(userId: number): TokenDto {
    const payload = { userId };
    return {
      token: this.jwtService.sign(payload),
    };
  }

  async validatePassword(
    plainPassword: string,
    encryptedPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(plainPassword, encryptedPassword);
  }
}
