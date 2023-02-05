import { AutoMap } from '@automapper/classes';
import { FindOperator, FindOptionsWhere } from 'typeorm';

import { ClientEntity } from '@/client/entities/client.entity';

import { UserEntity } from '../entities/user.entity';

export class FilterUser implements FindOptionsWhere<UserEntity> {
  @AutoMap()
  name?: string;

  @AutoMap()
  email?: string;

  @AutoMap()
  emailVerified?: boolean;

  @AutoMap()
  phoneNumber?: string;

  @AutoMap()
  client?:
    | boolean
    | FindOperator<any>
    | FindOptionsWhere<ClientEntity>
    | FindOptionsWhere<ClientEntity>[];

  @AutoMap()
  status?: boolean;

  @AutoMap()
  createdAt?: Date | FindOperator<Date>;

  @AutoMap()
  updatedAt?: Date | FindOperator<Date>;
}
