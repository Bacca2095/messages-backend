import { Injectable, UnauthorizedException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { Repository } from 'typeorm';

import { EnvVariables } from '@config/environment';
import { UserEntity } from '@user/entities/user.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly configService: ConfigService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: configService.get<string>(EnvVariables.JWT_SECRET),
    });
  }

  async validate(payload: any): Promise<UserEntity> {
    const user = await this.userRepository.findOne({
      relations: ['client'],
      where: { id: payload.userId },
    });

    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
