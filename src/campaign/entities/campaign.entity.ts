import { AutoMap } from '@automapper/classes';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinTable,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { ClientEntity } from '@/client/entities/client.entity';
import { Days } from '@/shared/enums/days.enum';

import { CampaignContactEntity } from './campaign-contacts.entity';
import { CampaignStatus } from '../enum/campaign-status.enum';

@Entity('campaign')
export class CampaignEntity {
  @AutoMap()
  @PrimaryGeneratedColumn()
  id: number;

  @AutoMap()
  @Column()
  name: string;

  @AutoMap()
  @Column()
  description: string;

  @AutoMap()
  @Column()
  message: string;

  @AutoMap()
  @Column()
  startDate: Date;

  @AutoMap()
  @Column()
  endDate: Date;

  @AutoMap()
  @Column({ type: 'time' })
  startTime: string;

  @AutoMap()
  @Column({ type: 'time' })
  endTime: string;

  @Column({
    type: 'simple-array',
  })
  days: string[];

  @Column({
    type: 'enum',
    enum: CampaignStatus,
    default: CampaignStatus.PENDING,
  })
  status: CampaignStatus;

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

  @AutoMap()
  @CreateDateColumn()
  createdAt: Date;

  @AutoMap()
  @UpdateDateColumn()
  updatedAt: Date;

  @AutoMap()
  @DeleteDateColumn()
  deletedAt: Date;
}
