import {
  Mapper,
  MappingProfile,
  createMap,
  forMember,
  mapFrom,
} from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';

import { FilterCustomField } from './filter-custom-field';
import { CreateCustomFieldDto } from '../dto/create-custom-field.dto';
import { CustomFieldDto } from '../dto/custom-field.dto';
import { FilterCustomFieldDto } from '../dto/filter-custom-field.dto';
import { UpdateCustomFieldDto } from '../dto/update-custom-field.dto';
import { CustomFieldEntity } from '../entities/custom-field.entity';

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
              return { id: src.clientId };
            }
          }),
        ),
      );
    };
  }
}
