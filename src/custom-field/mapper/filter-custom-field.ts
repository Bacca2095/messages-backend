import { AutoMap } from '@automapper/classes';
import { EqualOperator, FindOperator, FindOptionsWhere } from 'typeorm';

import { ClientEntity } from '../../client/entities/client.entity';
import { CustomFieldEntity } from '../entities/custom-field.entity';

export class FilterCustomField implements FindOptionsWhere<CustomFieldEntity> {
  @AutoMap()
  name?: string;

  @AutoMap()
  description?: string | FindOperator<string>;

  @AutoMap()
  client?:
    | boolean
    | FindOperator<any>
    | FindOptionsWhere<ClientEntity>
    | FindOptionsWhere<ClientEntity>[];
}
