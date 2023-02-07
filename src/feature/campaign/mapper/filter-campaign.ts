import { FindOptionsWhere } from 'typeorm';

import { CampaignEntity } from '../entities/campaign.entity';

export class FilterCampaign implements FindOptionsWhere<CampaignEntity> {}
