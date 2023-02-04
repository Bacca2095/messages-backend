import {
  Mapper,
  MappingProfile,
  createMap,
  forMember,
  mapFrom,
} from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import dayjs from 'dayjs';
import { Between, Like } from 'typeorm';

import { FilterContact } from './filter-contact';
import { ContactDto } from '../dto/contact.dto';
import { CreateContactDto } from '../dto/create-contact.dto';
import { FilterContactDto } from '../dto/filter-contact.dto';
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
      createMap(
        mapper,
        FilterContactDto,
        FilterContact,
        forMember(
          (dest) => dest.name,
          mapFrom(({ name }) => {
            if (name) {
              return Like(`%${name}%`);
            }
            return null;
          }),
        ),
        forMember(
          (dest) => dest.phoneNumber,
          mapFrom(({ phoneNumber }) => {
            if (phoneNumber) {
              return Like(`%${phoneNumber}%`);
            }
            return null;
          }),
        ),
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
              return { id: src.clientId };
            }
          }),
        ),
      );
    };
  }
}
