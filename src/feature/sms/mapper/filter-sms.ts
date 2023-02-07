import { AutoMap } from '@automapper/classes';
import { FindOperator, FindOptionsWhere } from 'typeorm';

import { ClientEntity } from '@client/entities/client.entity';
import { SmsEntity, SmsStatus } from '@sms/entities/sms.entity';

export class FilterSms implements FindOptionsWhere<SmsEntity> {
  @AutoMap()
  message?: string | FindOperator<string>;

  @AutoMap()
  status?: SmsStatus;

  @AutoMap()
  phoneNumber?: string | FindOperator<string>;

  @AutoMap()
  price?: number | FindOperator<number>;

  @AutoMap()
  priceUnit?: string | FindOperator<string>;

  @AutoMap()
  segments?: number | FindOperator<number>;

  @AutoMap()
  externalId?: string | FindOperator<string>;

  @AutoMap()
  errorCode?: number | FindOperator<number>;

  @AutoMap()
  errorMessage?: string | FindOperator<string>;

  @AutoMap()
  providerName?: string | FindOperator<string>;

  @AutoMap()
  client?:
    | boolean
    | FindOperator<any>
    | FindOptionsWhere<ClientEntity>
    | FindOptionsWhere<ClientEntity>[];

  @AutoMap()
  sendAt?: Date | FindOperator<Date>;

  @AutoMap()
  createdAt?: Date | FindOperator<Date>;

  @AutoMap()
  updatedAt?: Date | FindOperator<Date>;
}
