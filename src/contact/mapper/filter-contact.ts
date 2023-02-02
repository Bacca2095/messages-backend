import { FindOptionsWhere } from 'typeorm';

import { ContactEntity } from '../entities/contact.entity';

export class FilterContact implements FindOptionsWhere<ContactEntity> {}
