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
import { RegionCodeEnum } from '@/sms/enum/region-code.enum';

import { ContactCustomFieldEntity } from './contact-custom-fields.entity';

@Entity('contact')
export class ContactEntity {
  @AutoMap()
  @PrimaryGeneratedColumn()
  id: number;

  @AutoMap()
  @Column()
  name: string;

  @AutoMap()
  @Column()
  phoneNumber: string;

  @AutoMap()
  @Column({ type: 'enum', enum: RegionCodeEnum })
  regionCode: RegionCodeEnum;

  @AutoMap()
  @ManyToOne(() => ClientEntity, (client) => client.contacts, {
    onDelete: 'CASCADE',
  })
  @JoinTable()
  client: ClientEntity;

  @AutoMap()
  @OneToMany(
    () => ContactCustomFieldEntity,
    (contactCustomField) => contactCustomField.customField,
  )
  customFields: ContactCustomFieldEntity[];

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
