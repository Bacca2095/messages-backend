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

import { ClientEntity } from '@client/entities/client.entity';
import { RegionCodeEnum } from '@sms/enum/region-code.enum';

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

  @AutoMap()
  @Column({ type: 'enum', enum: RegionCodeEnum })
  regionCode: RegionCodeEnum;

  @ManyToOne(() => ClientEntity, (client) => client.users, {
    onDelete: 'CASCADE',
  })
  @JoinTable()
  client: ClientEntity;

  @AutoMap()
  @Column({ nullable: true })
  resetPasswordToken: string;

  @AutoMap()
  @Column('timestamp', { nullable: true })
  resetPasswordExpires: Date;

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
