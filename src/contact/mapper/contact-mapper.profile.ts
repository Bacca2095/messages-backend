import { Mapper, MappingProfile, createMap } from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';

import { ContactDto } from '../dto/contact.dto';
import { CreateContactDto } from '../dto/create-contact.dto';
import { UpdateContactDto } from '../dto/update-contact.dto';
import { ContactEntity } from '../entities/contact.entity';

export class ContactMapperProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile(): MappingProfile {
    return (mapper) => {
      createMap(mapper, ContactEntity, ContactDto);
      createMap(mapper, CreateContactDto, ContactEntity);
      createMap(mapper, UpdateContactDto, ContactEntity);
    };
  }
}
