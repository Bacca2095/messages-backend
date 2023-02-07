import {
  Mapper,
  MappingProfile,
  createMap,
  forMember,
  mapFrom,
} from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Equal } from 'typeorm';

import { CreateCustomFieldDto } from '@custom-fields/dto/create-custom-field.dto';
import { CustomFieldDto } from '@custom-fields/dto/custom-field.dto';
import { FilterCustomFieldDto } from '@custom-fields/dto/filter-custom-field.dto';
import { UpdateCustomFieldDto } from '@custom-fields/dto/update-custom-field.dto';
import { CustomFieldEntity } from '@custom-fields/entities/custom-field.entity';

import { FilterCustomField } from './filter-custom-field';

export class CustomFieldMapperProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile(): MappingProfile {
    return (mapper) => {
      createMap(mapper, CustomFieldEntity, CustomFieldDto);
      createMap(mapper, CreateCustomFieldDto, CustomFieldEntity);
      createMap(mapper, UpdateCustomFieldDto, CustomFieldEntity);
      createMap(
        mapper,
        FilterCustomFieldDto,
        FilterCustomField,
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
