import { AutoMap } from '@automapper/classes';
import { Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { ContactEntity } from '@/contact/entities/contact.entity';

import { CampaignEntity } from './campaign.entity';

@Entity('campaign_contact')
export class CampaignContactEntity {
  @AutoMap()
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => ContactEntity, (contact) => contact.campaigns)
  contact: ContactEntity;

  @ManyToOne(() => CampaignEntity, (campaign) => campaign.contacts)
  campaign: CampaignEntity;
}
