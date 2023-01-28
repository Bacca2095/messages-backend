import { SmsEntity } from '@/sms/entities/sms.entity';
import { RegionCodeEnum } from '@/sms/enum/region-code.enum';
import { UserEntity } from '@/user/entities/user.entity';

import { ClientEntity } from '../../src/client/entities/client.entity';

export class ClientTestDataBuilder {
  private id: number;
  private name: string;
  private email: string;
  private password?: string;
  private phoneNumber: string;
  private defaultRegionCode: RegionCodeEnum;
  private createdAt: Date;
  private updatedAt: Date;
  private deletedAt: Date;
  private emailVerified: boolean;
  private sms: SmsEntity[];
  private users: UserEntity[];

  constructor() {
    this.id = 1;
    this.name = 'User test';
    this.email = 'test@email.com';
    this.password = '1234';
    this.phoneNumber = '1111111111';
    this.defaultRegionCode = RegionCodeEnum.CO;
    this.createdAt = new Date();
    this.updatedAt = new Date();
    this.deletedAt = new Date();
    this.emailVerified = true;
    this.sms = [];
    this.users = [];
  }

  build(): ClientEntity {
    const client = new ClientEntity();

    client.id = this.id;
    client.name = this.name;
    client.email = this.email;
    client.password = this.password;
    client.phoneNumber = this.phoneNumber;
    client.defaultRegionCode = this.defaultRegionCode;
    client.createdAt = this.createdAt;
    client.updatedAt = this.updatedAt;
    client.deletedAt = this.deletedAt;
    client.emailVerified = this.emailVerified;
    client.sms = this.sms;
    client.users = this.users;

    return client;
  }
}
