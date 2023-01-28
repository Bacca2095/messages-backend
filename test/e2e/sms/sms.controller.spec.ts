import { Test, TestingModule } from '@nestjs/testing';

import { SmsController } from '../../../src/sms/controllers/sms.controller';
import { SmsService } from '../../../src/sms/services/sms.service';

describe('SmsController', () => {
  let controller: SmsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SmsController],
      providers: [SmsService],
    }).compile();

    controller = module.get<SmsController>(SmsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
