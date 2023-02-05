import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

import { ClientSubscriptionEntity } from './client-subscription.entity';

@Entity('subscription')
export class SubscriptionEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column('decimal')
  price: number;

  @Column()
  smsPrice: number;

  @Column()
  description: string;

  @OneToMany(
    () => ClientSubscriptionEntity,
    (userSubscription) => userSubscription.subscription,
  )
  clientSubscriptions: ClientSubscriptionEntity[];
}
