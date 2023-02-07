import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ClientModule } from '@client/client.module';
import { PasswordUtilService } from '@shared/password-util';

import { UserController } from './controllers/user.controller';
import { UserEntity } from './entities/user.entity';
import { UserMapperProfile } from './mapper/user-mapper.profile';
import { UserService } from './services/user.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity])],
  controllers: [UserController],
  providers: [UserService, UserMapperProfile, PasswordUtilService],
  exports: [UserService, TypeOrmModule],
})
export class UserModule {}
