import { SmsDto } from '@/sms/dto';

export class SmsTestDataBuilder {
  build(): SmsDto {
    return new SmsDto();
  }
}
