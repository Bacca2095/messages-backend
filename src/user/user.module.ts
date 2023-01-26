import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ClientModule } from '@/client/client.module';

import { UserController } from './controllers/user.controller';
import { UserEntity } from './entities/user.entity';
import { UserMapperProfile } from './mapper/user-mapper.profile';
import { UserService } from './services/user.service';
import { PasswordUtilService } from '../shared/password-util/password-util.service';

@Module({
  imports: [TypeOrmModule.forFeature([UserEntity]), ClientModule],
  controllers: [UserController],
  providers: [UserService, UserMapperProfile, PasswordUtilService],
  exports: [UserService, TypeOrmModule],
})
export class UserModule {}
