import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { ClientSubscriptionEntity } from './client-subscription.entity';

@Entity('payment')
export class PaymentEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(
    () => ClientSubscriptionEntity,
    (userSubscription) => userSubscription.payments,
  )
  clientSubscription: ClientSubscriptionEntity;

  @Column('timestamp')
  date: Date;

  @Column('decimal')
  amount: number;
}
