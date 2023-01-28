import { Mapper } from '@automapper/core';
import { Queue } from 'bull';
import { TwilioService } from 'nestjs-twilio';
import { SinonStubbedInstance, createSandbox } from 'sinon';
import { Repository } from 'typeorm';
import { Logger } from 'winston';

import { ClientEntity } from '../../../src/client/entities/client.entity';
import { SmsEntity } from '../../../src/sms/entities/sms.entity';
import { SmsService } from '../../../src/sms/services/sms.service';
import { createStubObj } from '../../utils/create-object.stub';

const sinonSandBox = createSandbox();
describe('SmsService', () => {
  let service: SmsService;
  let twilioService: SinonStubbedInstance<TwilioService>;
  let smsRepository: SinonStubbedInstance<Repository<SmsEntity>>;
  let clientRepository: SinonStubbedInstance<Repository<ClientEntity>>;
  let logger: SinonStubbedInstance<Logger>;
  let queue: SinonStubbedInstance<Queue>;
  let mapper: SinonStubbedInstance<Mapper>;

  beforeAll(async () => {
    twilioService = createStubObj<TwilioService>([], sinonSandBox);
    clientRepository = createStubObj<Repository<ClientEntity>>(
      [],
      sinonSandBox,
    );
    smsRepository = createStubObj<Repository<SmsEntity>>([], sinonSandBox);
    mapper = createStubObj<Mapper>(
      ['map', 'mapAsync', 'mapArrayAsync'],
      sinonSandBox,
    );
    logger = createStubObj<Logger>([], sinonSandBox);
    queue = createStubObj<Queue>([], sinonSandBox);

    service = new SmsService(
      twilioService,
      smsRepository,
      clientRepository,
      mapper,
      logger,
      queue,
    );
  });

  afterEach(async () => {
    sinonSandBox.restore();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
