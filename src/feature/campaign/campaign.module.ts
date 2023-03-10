import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ClientModule } from '@client/client.module';

import { CampaignController } from './controllers/campaign.controller';
import { CampaignEntity } from './entities/campaign.entity';
import { CampaignMapperProfile } from './mapper/campaign-mapper.profile';
import { CampaignService } from './services/campaign.service';

@Module({
  imports: [TypeOrmModule.forFeature([CampaignEntity]), ClientModule],
  controllers: [CampaignController],
  providers: [CampaignService, CampaignMapperProfile],
})
export class CampaignModule {}
