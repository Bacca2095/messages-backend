import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

import { ClientEntity } from './client.entity';
import { PaymentEntity } from './payment.entity';
import { SubscriptionEntity } from './subscription.entity';

@Entity('client-subscription')
export class ClientSubscriptionEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => ClientEntity, (client) => client.subscriptions)
  client: ClientEntity;

  @ManyToOne(
    () => SubscriptionEntity,
    (subscription) => subscription.clientSubscriptions,
  )
  subscription: SubscriptionEntity;

  @Column('timestamp')
  startDate: Date;

  @Column('timestamp')
  endDate: Date;

  @Column()
  smsRemaining: number;

  @Column()
  status: string;

  @OneToMany(() => PaymentEntity, (payment) => payment.clientSubscription)
  payments: PaymentEntity[];
}
