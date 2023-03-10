import { AutoMap } from '@automapper/classes';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { ContactEntity } from '@contact/entities/contact.entity';
import { CustomFieldEntity } from '@custom-fields/entities/custom-field.entity';
import { SmsEntity } from '@sms/entities/sms.entity';
import { RegionCodeEnum } from '@sms/enum/region-code.enum';
import { UserEntity } from '@user/entities/user.entity';

import { ClientSubscriptionEntity } from './client-subscription.entity';

@Entity({ name: 'client' })
export class ClientEntity {
  @AutoMap()
  @PrimaryGeneratedColumn()
  id: number;

  @AutoMap()
  @Column()
  name: string;

  @AutoMap()
  @Column({ unique: true })
  email: string;

  @AutoMap()
  @Column({ default: false })
  emailVerified: boolean;

  @AutoMap()
  @Column()
  password: string;

  @AutoMap()
  @Column()
  phoneNumber: string;

  @AutoMap()
  @Column({ type: 'enum', enum: RegionCodeEnum })
  defaultRegionCode: RegionCodeEnum;

  @AutoMap()
  @CreateDateColumn()
  createdAt: Date;

  @AutoMap()
  @UpdateDateColumn()
  updatedAt: Date;

  @AutoMap()
  @DeleteDateColumn()
  deletedAt: Date;

  @OneToMany(() => SmsEntity, (sms) => sms.client, { cascade: true })
  sms: SmsEntity[];

  @OneToMany(() => UserEntity, (user) => user.client, { cascade: true })
  users: UserEntity[];

  @OneToMany(() => CustomFieldEntity, (customField) => customField.client, {
    cascade: true,
  })
  customFields: CustomFieldEntity[];

  @OneToMany(() => ContactEntity, (contact) => contact.client, {
    cascade: true,
  })
  contacts: ContactEntity[];

  @OneToMany(
    () => ClientSubscriptionEntity,
    (clientSubscription) => clientSubscription.client,
  )
  subscriptions: ClientSubscriptionEntity[];
}
