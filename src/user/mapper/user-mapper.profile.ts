import {
  Mapper,
  MappingProfile,
  createMap,
  forMember,
  ignore,
  mapFrom,
} from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import * as dayjs from 'dayjs';
import * as utc from 'dayjs/plugin/utc';
import { Between, Equal } from 'typeorm';

import { FilterUser } from './filter-user';
import { CreateUserDto, FilterUserDto, UpdateUserDto, UserDto } from '../dto';
import { UserEntity } from '../entities/user.entity';

dayjs.extend(utc);

export class UserMapperProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile(): MappingProfile {
    return (mapper) => {
      createMap(
        mapper,
        UserEntity,
        UserDto,
        forMember((dest) => dest.password, ignore()),
      );

      createMap(mapper, CreateUserDto, UserEntity);
      createMap(mapper, UpdateUserDto, UserEntity);
      createMap(
        mapper,
        FilterUserDto,
        FilterUser,
        forMember(
          (dest) => dest.createdAt,
          mapFrom((src) => {
            if (src.createdAt) {
              return Between(
                dayjs(src.createdAt).utc().subtract(1, 'day').toDate(),
                dayjs(src.createdAt).utc().add(1, 'day').toDate(),
              );
            }
            return null;
          }),
        ),
        forMember(
          (dest) => dest.updatedAt,
          mapFrom((src) => {
            if (src.updatedAt) {
              return Between(
                dayjs(src.updatedAt).utc().toDate(),
                dayjs(src.updatedAt).utc().add(1, 'day').toDate(),
              );
            }
            return null;
          }),
        ),
        forMember(
          (dest) => dest.client,
          mapFrom((src) => {
            if (src.clientId) {
              return Equal(src.clientId);
            }
          }),
        ),
      );
    };
  }
}
