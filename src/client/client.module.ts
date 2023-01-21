import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UserEntity } from '@/user/entities/user.entity';
import { UserService } from '@/user/services/user.service';

import { ClientController } from './controllers/client.controller';
import { ClientEntity } from './entities/client.entity';
import { ClientMapperProfile } from './mapper/client-mapper.profile';
import { ClientService } from './services/client.service';

@Module({
  imports: [TypeOrmModule.forFeature([ClientEntity, UserEntity])],
  controllers: [ClientController],
  providers: [ClientService, ClientMapperProfile, UserService],
  exports: [ClientService, ClientMapperProfile, TypeOrmModule],
})
export class ClientModule {}
