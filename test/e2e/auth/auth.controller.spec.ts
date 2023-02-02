import { classes } from '@automapper/classes';
import { AutomapperModule } from '@automapper/nestjs';
import { JwtService } from '@nestjs/jwt';
import { Test } from '@nestjs/testing';
import { SinonStubbedInstance, createSandbox } from 'sinon';

import { PasswordUtilService } from '@/shared/password-util';
import { UserService } from '@/user/services/user.service';

import { AuthController } from '../../../src/auth/controllers/auth.controller';
import { AuthService } from '../../../src/auth/services/auth.service';
import { UserMapperProfile } from '../../../src/user/mapper/user-mapper.profile';
import { createStubObj } from '../../utils/create-object.stub';
import { UserTestDataBuilder } from '../../utils/user-test-data-builder';

const sinonSandbox = createSandbox();

describe('AuthController', () => {
  let controller: AuthController;

  let passwordUtilService: SinonStubbedInstance<PasswordUtilService>;
  let userService: SinonStubbedInstance<UserService>;
  let jwtService: SinonStubbedInstance<JwtService>;

  const token = '1234';

  const user = new UserTestDataBuilder().build();

  beforeAll(async () => {
    userService = createStubObj<UserService>(['findOneByEmail'], sinonSandbox);
    jwtService = createStubObj<JwtService>(['sign'], sinonSandbox);
    passwordUtilService = createStubObj<PasswordUtilService>(
      ['validatePassword'],
      sinonSandbox,
    );

    const moduleRef = await Test.createTestingModule({
      imports: [AutomapperModule.forRoot({ strategyInitializer: classes() })],
      controllers: [AuthController],
      providers: [
        AuthService,
        { provide: PasswordUtilService, useValue: passwordUtilService },
        { provide: UserService, useValue: userService },
        { provide: JwtService, useValue: jwtService },
        UserMapperProfile,
      ],
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
      const { email, password } = user;
      userService.findOneByEmail.resolves(user);
      passwordUtilService.validatePassword.resolves(true);
      jwtService.sign.returns(token);

      const response = await controller.login({ email, password });

      expect(response.token).toEqual(token);
    });

    it('should throw error if user not found', async () => {
      const { email, password } = user;
      userService.findOneByEmail.resolves(null);
      passwordUtilService.validatePassword.resolves(true);

      await expect(controller.login({ email, password })).rejects.toThrow(
        'User not found',
      );
    });

    it('should throw error if incorrect password', async () => {
      const { email, password } = user;
      userService.findOneByEmail.resolves(user);
      passwordUtilService.validatePassword.resolves(false);

      await expect(controller.login({ email, password })).rejects.toThrow(
        'Incorrect password',
      );
    });
  });

  describe('#resetPassword', () => {
    it('should return true', async () => {
      const response = await controller.resetPassword();

      expect(response).toBeTruthy();
    });
  });

  describe('#changePassword', () => {
    it('should return true', async () => {
      const response = await controller.changePassword();

      expect(response).toBeTruthy();
    });
  });

  describe('#currentUser', () => {
    it('should return user', async () => {
      const response = await controller.currentUser(user);

      expect(response).toBeTruthy();
    });
  });
});
