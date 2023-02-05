import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { CampaignEntity } from './campaign.entity';

export enum ConstraintCondition {
  BETWEEN = 'between',
  EQUAL = 'equal',
  LESS = 'less',
  MORE = 'more',
  CONTAIN = 'contain',
}

@Entity()
export class ConstraintEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  field: string;

  @Column()
  value: string;

  @Column({
    type: 'enum',
    enum: ConstraintCondition,
  })
  condition: ConstraintCondition;

  @ManyToOne(() => CampaignEntity, (campaign) => campaign.constraints)
  campaign: CampaignEntity;
}
