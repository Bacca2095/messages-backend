import { ClientEntity } from '@/client/entities/client.entity';

import { UserEntity } from '../../src/user/entities/user.entity';

export class UserTestDataBuilder {
  private id: number;
  private name: string;
  private email: string;
  private emailVerified: boolean;
  private password: string;
  private status: boolean;
  private phoneNumber: string;
  private client: ClientEntity;
  private createdAt: Date;
  private updatedAt: Date;
  private deletedAt: Date;

  constructor() {
    this.id = 1;
    this.name = '';
    this.email = 'bacca2095@gmail.com';
    this.emailVerified = true;
    this.password = '1234';
    this.status = true;
    this.phoneNumber = '';
    this.createdAt = new Date();
    this.updatedAt = new Date();
    this.deletedAt = new Date();
  }

  build(): UserEntity {
    const user = new UserEntity();
    user.id = this.id;
    user.name = this.name;
    user.email = this.email;
    user.emailVerified = this.emailVerified;
    user.password = this.password;
    user.status = this.status;
    user.phoneNumber = this.phoneNumber;
    user.client = this.client;
    user.createdAt = this.createdAt;
    user.updatedAt = this.updatedAt;
    user.deletedAt = this.deletedAt;
    return user;
  }
}
