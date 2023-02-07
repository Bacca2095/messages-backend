import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { PasswordUtilService } from '@shared/password-util';
import { UserEntity } from '@user/entities/user.entity';
import { UserService } from '@user/services/user.service';

import { ClientController } from './controllers/client.controller';
import { ClientEntity } from './entities/client.entity';
import { ClientMapperProfile } from './mapper/client-mapper.profile';
import { ClientService } from './services/client.service';

@Module({
  imports: [TypeOrmModule.forFeature([ClientEntity, UserEntity])],
  controllers: [ClientController],
  providers: [
    ClientService,
    ClientMapperProfile,
    UserService,
    PasswordUtilService,
  ],
  exports: [ClientService, ClientMapperProfile, TypeOrmModule],
})
export class ClientModule {}
