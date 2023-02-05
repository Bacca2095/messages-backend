import { Mapper, MappingProfile, createMap } from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';

import { FilterCampaign } from './filter-campaign';
import { CampaignDto } from '../dto/campaign.dto';
import { CreateCampaignDto } from '../dto/create-campaign.dto';
import { FilterCampaignDto } from '../dto/filter-campaign.dto';
import { UpdateCampaignDto } from '../dto/update-campaign.dto';
import { CampaignEntity } from '../entities/campaign.entity';

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
