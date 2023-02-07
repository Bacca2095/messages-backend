import { AutoMap } from '@automapper/classes';
import { FindOperator, FindOptionsWhere } from 'typeorm';

import { ClientEntity } from '@client/entities/client.entity';
import { ContactEntity } from '@contact/entities/contact.entity';
import { RegionCodeEnum } from '@sms/enum/region-code.enum';

export class FilterContact implements FindOptionsWhere<ContactEntity> {
  @AutoMap()
  id?: number | FindOperator<number>;

  @AutoMap()
  name?: string | FindOperator<string>;

  @AutoMap()
  regionCode?: RegionCodeEnum | FindOperator<RegionCodeEnum>;

  @AutoMap()
  phoneNumber?: string | FindOperator<string>;

  @AutoMap()
  client?:
    | boolean
    | FindOperator<any>
    | FindOptionsWhere<ClientEntity>
    | FindOptionsWhere<ClientEntity>[];

  @AutoMap()
  createdAt?: Date | FindOperator<Date>;

  @AutoMap()
  updatedAt?: Date | FindOperator<Date>;
}
