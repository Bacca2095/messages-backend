import { Mapper, MappingProfile, createMap } from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';

import { CampaignDto } from '@campaign/dto/campaign.dto';
import { CreateCampaignDto } from '@campaign/dto/create-campaign.dto';
import { FilterCampaignDto } from '@campaign/dto/filter-campaign.dto';
import { UpdateCampaignDto } from '@campaign/dto/update-campaign.dto';
import { CampaignEntity } from '@campaign/entities/campaign.entity';

import { FilterCampaign } from './filter-campaign';

export class CampaignMapperProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile(): MappingProfile {
    return (mapper) => {
      createMap(mapper, CampaignEntity, CampaignDto);
      createMap(mapper, CreateCampaignDto, CampaignEntity);
      createMap(mapper, UpdateCampaignDto, CampaignEntity);
      createMap(mapper, FilterCampaignDto, FilterCampaign);
    };
  }
}
