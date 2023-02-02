import { AutoMap } from '@automapper/classes';
import { FindOperator, FindOptionsWhere } from 'typeorm';

import { CustomFieldEntity } from '../entities/custom-field.entity';

export class FilterCustomField implements FindOptionsWhere<CustomFieldEntity> {
  @AutoMap()
  name?: string;

  @AutoMap()
  description?: string | FindOperator<string>;
}