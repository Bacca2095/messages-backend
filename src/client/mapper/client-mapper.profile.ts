import {
  Mapper,
  MappingProfile,
  createMap,
  forMember,
  ignore,
} from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';

import { ClientDto, CreateClientDto, UpdateClientDto } from '../dto';
import { ClientEntity } from '../entities/client.entity';

export class ClientMapperProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile(): MappingProfile {
    return (mapper) => {
      createMap(
        mapper,
        ClientEntity,
        ClientDto,
        forMember((dest) => dest.password, ignore()),
      );
      createMap(mapper, CreateClientDto, ClientEntity);
      createMap(mapper, UpdateClientDto, ClientEntity);
    };
  }
}
