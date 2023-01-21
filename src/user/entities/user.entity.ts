import { AutoMap } from '@automapper/classes';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  JoinTable,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { ClientEntity } from '@/client/entities/client.entity';

@Entity('user')
@Index(['email', 'client'], { unique: true })
export class UserEntity {
  @AutoMap()
  @PrimaryGeneratedColumn()
  id: number;

  @AutoMap()
  @Column()
  name: string;

  @AutoMap()
  @Column()
  email: string;

  @AutoMap()
  @Column({ default: false })
  emailVerified: boolean;

  @AutoMap()
  @Column()
  password: string;

  @AutoMap()
  @Column({ default: true })
  status: boolean;

  @AutoMap()
  @Column()
  phoneNumber: string;

  @ManyToOne(() => ClientEntity, (client) => client.users, {
    onDelete: 'CASCADE',
  })
  @JoinTable()
  client: ClientEntity;

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
