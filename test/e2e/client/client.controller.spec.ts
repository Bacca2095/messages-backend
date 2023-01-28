import { Test, TestingModule } from '@nestjs/testing';

import { ClientController } from '../../../src/client/controllers/client.controller';
import { ClientService } from '../../../src/client/services/client.service';

describe('ClientController', () => {
  let controller: ClientController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ClientController],
      providers: [ClientService],
    }).compile();

    controller = module.get<ClientController>(ClientController);
  });
});
