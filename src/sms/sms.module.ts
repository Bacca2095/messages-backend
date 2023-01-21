import { BullModule } from '@nestjs/bull';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TwilioModule } from 'nestjs-twilio';

import { ClientModule } from '@/client/client.module';
import { EnvVariables } from '@/config/environment';

import { SmsController } from './controllers/sms.controller';
import { SmsEntity } from './entities/sms.entity';
import { SmsMapperProfile } from './mapper/sms-mapper.profile';
import { SmsService } from './services/sms.service';

@Module({
  imports: [
    TwilioModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (config: ConfigService) => ({
        accountSid: config.get<string>(EnvVariables.TWILIO_ACCOUNT_SID),
        authToken: config.get<string>(EnvVariables.TWILIO_AUTH_TOKEN),
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([SmsEntity]),
    BullModule.registerQueue({
      name: 'schedule_sms',
    }),
    ClientModule,
  ],
  controllers: [SmsController],
  providers: [SmsService, SmsMapperProfile],
})
export class SmsModule {}
