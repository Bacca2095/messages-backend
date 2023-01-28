import { Mapper } from '@automapper/core';
import { SinonStubbedInstance, createSandbox } from 'sinon';
import { Repository } from 'typeorm';

import { ClientEntity } from '@/client/entities/client.entity';
import { PasswordUtilService } from '@/shared/password-util';
import { RegionCodeEnum } from '@/sms/enum/region-code.enum';
import { UserService } from '@/user/services/user.service';

import { ClientService } from '../../../src/client/services/client.service';
import { ClientTestDataBuilder } from '../../utils/client-test-data-builder';
import { createStubObj } from '../../utils/create-object.stub';
import { UserTestDataBuilder } from '../../utils/user-test-data-builder';

const sinonSandBox = createSandbox();

describe('ClientService', () => {
  let service: ClientService;
  let userService: SinonStubbedInstance<UserService>;
  let clientRepository: SinonStubbedInstance<Repository<ClientEntity>>;
  let passwordUtilService: SinonStubbedInstance<PasswordUtilService>;
  let mapper: SinonStubbedInstance<Mapper>;

  const client = new ClientTestDataBuilder().build();
  const user = new UserTestDataBuilder().build();

  beforeAll(async () => {
    userService = createStubObj<UserService>(['create'], sinonSandBox);
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

    service = new ClientService(
      clientRepository,
      userService,
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

  it('#create', async () => {
    mapper.map.returns({ ...client });
    mapper.mapAsync.resolves({ ...client });
    userService.create.resolves(user);
    clientRepository.save.resolves(client);
    passwordUtilService.hashPassword.resolves(client.password);

    await expect(
      service.create({
        name: client.name,
        email: client.email,
        password: client.password,
        phoneNumber: client.phoneNumber,
        defaultRegionCode: RegionCodeEnum.CO,
      }),
    ).resolves.toEqual(client);
  });

  it('#findAll', async () => {
    clientRepository.find.resolves([client]);
    mapper.mapArrayAsync.resolves([{ ...client }]);

    await expect(service.findAll()).resolves.toEqual([client]);
  });

  it('#findOne should return one user by id', async () => {
    clientRepository.findOne.resolves(client);
    mapper.mapAsync.resolves({ ...client });

    await expect(service.findOne(1)).resolves.toEqual(client);
  });

  it('#findOne should return error when user not found', async () => {
    clientRepository.findOne.resolves(null);

    await expect(service.findOne(1)).rejects.toThrow();
  });

  it('#update should update user by id', async () => {
    clientRepository.save.resolves(client);
    clientRepository.findOne.resolves(client);
    mapper.mapAsync.resolves({ ...client });

    await expect(service.update(1, {})).resolves.toEqual(client);
  });

  it('#update should return error when user not found', async () => {
    clientRepository.findOne.resolves(null);

    await expect(service.update(1, {})).rejects.toThrow();
  });

  it('#delete should delete user by id', async () => {
    clientRepository.findOne.resolves(client);
    clientRepository.softDelete.resolves({
      affected: 1,
      raw: undefined,
      generatedMaps: [],
    });

    await expect(service.remove(1)).resolves.toBeTruthy();
  });

  it('#delete should return error when user not found', async () => {
    clientRepository.findOne.resolves(null);

    await expect(service.remove(1)).rejects.toThrow();
  });
});
