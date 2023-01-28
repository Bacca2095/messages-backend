import { JwtService } from '@nestjs/jwt';
import { SinonStubbedInstance, createSandbox } from 'sinon';

import { AuthService } from '../../../src/auth/services/auth.service';
import { PasswordUtilService } from '../../../src/shared/password-util/password-util.service';
import { UserService } from '../../../src/user/services/user.service';
import { createStubObj } from '../../utils/create-object.stub';
import { UserTestDataBuilder } from '../../utils/user-test-data-builder';

const sinonSandBox = createSandbox();

describe('AuthService', () => {
  let service: AuthService;
  let userService: SinonStubbedInstance<UserService>;
  let jwtService: SinonStubbedInstance<JwtService>;
  let passwordUtilService: SinonStubbedInstance<PasswordUtilService>;
  const user = new UserTestDataBuilder().build();
  const token = '1234';

  beforeAll(async () => {
    userService = createStubObj<UserService>(['findOneByEmail'], sinonSandBox);
    jwtService = createStubObj<JwtService>(['sign'], sinonSandBox);
    passwordUtilService = createStubObj<PasswordUtilService>(
      ['validatePassword'],
      sinonSandBox,
    );

    service = new AuthService(userService, jwtService, passwordUtilService);
  });

  afterEach(async () => {
    sinonSandBox.restore();
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('#login should return token', async () => {
    const { email, password } = user;

    userService.findOneByEmail.returns(Promise.resolve(user));
    passwordUtilService.validatePassword.returns(Promise.resolve(true));
    jwtService.sign.returns(token);

    await expect(service.login({ email, password })).resolves.toEqual({
      token,
    });
  });

  it('#login should return error if user not found', async () => {
    const { email, password } = user;

    userService.findOneByEmail.returns(Promise.resolve(null));
    passwordUtilService.validatePassword.returns(Promise.resolve(true));

    await expect(service.login({ email, password })).rejects.toThrow(
      'User not found',
    );
  });

  it('#login should return error if password not valid', async () => {
    const { email, password } = user;

    userService.findOneByEmail.returns(Promise.resolve(user));
    passwordUtilService.validatePassword.returns(Promise.resolve(false));

    await expect(service.login({ email, password })).rejects.toThrow(
      'Incorrect password',
    );
  });
});
