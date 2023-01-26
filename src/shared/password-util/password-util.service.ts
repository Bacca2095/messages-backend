import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class PasswordUtilService {
  async hashPassword(password: string): Promise<string> {
    const salt = await bcrypt.genSalt();
    if (!/^\$2[abxy]?\$\d+\$/.test(password)) {
      return bcrypt.hash(password, salt);
    }
    return password;
  }

  async validatePassword(
    plainPassword: string,
    encryptedPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(plainPassword, encryptedPassword);
  }
}
