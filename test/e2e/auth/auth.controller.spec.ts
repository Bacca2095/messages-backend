import { classes } from '@automapper/classes';
import { AutomapperModule } from '@automapper/nestjs';
import { Test } from '@nestjs/testing';
import { SinonStubbedInstance, createSandbox } from 'sinon';

import { AuthController } from '../../../src/auth/controllers/auth.controller';
import { AuthService } from '../../../src/auth/services/auth.service';
import { createStubObj } from '../../utils/create-object.stub';
import { UserTestDataBuilder } from '../../utils/user-test-data-builder';

const sinonSandbox = createSandbox();

describe('AuthController', () => {
  let controller: AuthController;
  let authService: SinonStubbedInstance<AuthService>;

  const user = new UserTestDataBuilder().build();

  beforeAll(async () => {
    authService = createStubObj<AuthService>(['login'], sinonSandbox);

    const moduleRef = await Test.createTestingModule({
      imports: [AutomapperModule.forRoot({ strategyInitializer: classes() })],
      controllers: [AuthController],
      providers: [{ provide: AuthService, useValue: authService }],
    }).compile();

    controller = moduleRef.get<AuthController>(AuthController);
  });

  afterEach(() => {
    sinonSandbox.restore();
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('#login', () => {
    it('should login with user and password', async () => {
      const token = '1234';
      const { email, password } = user;
      authService.login.resolves({ token });

      const response = await controller.login({ email, password });

      expect(response.token).toEqual(token);
    });
  });
});
