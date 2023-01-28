import { Mapper } from '@automapper/core';
import { SinonStubbedInstance, createSandbox } from 'sinon';
import { Repository } from 'typeorm';

import { PasswordUtilService } from '@/shared/password-util';

import { ClientEntity } from '../../../src/client/entities/client.entity';
import { UserEntity } from '../../../src/user/entities/user.entity';
import { UserService } from '../../../src/user/services/user.service';
import { createStubObj } from '../../utils/create-object.stub';

const sinonSandBox = createSandbox();
describe('UserService', () => {
  let service: UserService;
  let userRepository: SinonStubbedInstance<Repository<UserEntity>>;
  let clientRepository: SinonStubbedInstance<Repository<ClientEntity>>;
  let mapper: SinonStubbedInstance<Mapper>;
  let passwordUtilService: SinonStubbedInstance<PasswordUtilService>;
  beforeAll(async () => {
    userRepository = createStubObj<Repository<UserEntity>>(
      ['save', 'find', 'findOne', 'softDelete'],
      sinonSandBox,
    );
    clientRepository = createStubObj<Repository<ClientEntity>>(
      ['save', 'find', 'findOne', 'softDelete'],
      sinonSandBox,
    );
    passwordUtilService = createStubObj<PasswordUtilService>(
      ['validatePassword', 'hashPassword'],
      sinonSandBox,
    );
    mapper = createStubObj<Mapper>(
      ['map', 'mapAsync', 'mapArrayAsync'],
      sinonSandBox,
    );

    service = new UserService(
      userRepository,
      clientRepository,
      mapper,
      passwordUtilService,
    );
  });

  afterEach(async () => {
    sinonSandBox.restore();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
