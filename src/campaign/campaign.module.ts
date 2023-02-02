import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CampaignController } from './controllers/campaign.controller';
import { CampaignEntity } from './entities/campaign.entity';
import { CampaignMapperProfile } from './mapper/campaign-mapper.profile';
import { CampaignService } from './services/campaign.service';
import { ClientModule } from '../client/client.module';

@Module({
  imports: [TypeOrmModule.forFeature([CampaignEntity]), ClientModule],
  controllers: [CampaignController],
  providers: [CampaignService, CampaignMapperProfile],
})
export class CampaignModule {}
