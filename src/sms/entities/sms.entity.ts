import { AutoMap } from '@automapper/classes';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinTable,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { ClientEntity } from '@/client/entities/client.entity';

export enum SmsStatus {
  ACCEPTED = 'accepted',
  SCHEDULED = 'scheduled',
  CANCELED = 'canceled',
  QUEUED = 'queued',
  SENDING = 'sending',
  SENT = 'sent',
  FAILED = 'failed',
  DELIVERED = 'delivered',
  UNDELIVERED = 'undelivered',
  RECEIVING = 'receiving',
  RECEIVED = 'received',
  READ = 'read',
}

@Entity({ name: 'sms' })
export class SmsEntity {
  @AutoMap()
  @PrimaryGeneratedColumn()
  id: number;

  @AutoMap()
  @Column()
  message: string;

  @AutoMap()
  @Column({ type: 'enum', enum: SmsStatus, default: SmsStatus.ACCEPTED })
  status: SmsStatus;

  @AutoMap()
  @Column()
  phoneNumber: string;

  @AutoMap()
  @Column({ nullable: true, type: 'float' })
  price: number;

  @AutoMap()
  @Column({ nullable: true })
  priceUnit: string;

  @AutoMap()
  @Column({ nullable: true })
  segments: number;

  @AutoMap()
  @Column()
  externalId: string;

  @AutoMap()
  @Column({ nullable: true })
  errorCode: number;

  @AutoMap()
  @Column({ nullable: true })
  errorMessage: string;

  @AutoMap()
  @Column()
  providerName: string;

  @ManyToOne(() => ClientEntity, (client) => client.sms, {
    onDelete: 'CASCADE',
  })
  @JoinTable()
  client: ClientEntity;

  @AutoMap()
  @Column({ nullable: true })
  sendAt: Date;

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
