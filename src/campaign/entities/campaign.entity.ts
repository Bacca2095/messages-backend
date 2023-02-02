import { AutoMap } from '@automapper/classes';
import {
  Entity,
  JoinTable,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { ClientEntity } from '@/client/entities/client.entity';

import { CampaignContactEntity } from './campaign-contacts.entity';

@Entity('campaign')
export class CampaignEntity {
  @AutoMap()
  @PrimaryGeneratedColumn()
  id: number;

  @AutoMap()
  @ManyToOne(() => ClientEntity, (client) => client.customFields, {
    onDelete: 'CASCADE',
  })
  @JoinTable()
  client: ClientEntity;

  @AutoMap()
  @OneToMany(
    () => CampaignContactEntity,
    (campaignContact) => campaignContact.contact,
  )
  contacts: CampaignContactEntity[];
}
