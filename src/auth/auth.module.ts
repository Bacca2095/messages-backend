import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';

import { UserModule } from '@/user/user.module';

import { AuthController } from './controllers/auth.controller';
import { JwtGuard } from './guards/jwt.guard';
import { AuthService } from './services/auth.service';
import { JwtStrategy } from './strategies/jwt.strategy';
import { EnvVariables } from '../config/environment/env-variables.enum';
import { PasswordUtilService } from '../shared/password-util/password-util.service';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => ({
        secret: config.get<string>(EnvVariables.JWT_SECRET),
        signOptions: { expiresIn: '1h' },
      }),
      inject: [ConfigService],
    }),
    UserModule,
  ],
  controllers: [AuthController],
  providers: [AuthService, JwtStrategy, JwtGuard, PasswordUtilService],
})
export class AuthModule {}
