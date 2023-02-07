import {
  Mapper,
  MappingProfile,
  createMap,
  forMember,
  mapFrom,
} from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { ConfigService } from '@nestjs/config';
import * as dayjs from 'dayjs';
import * as utc from 'dayjs/plugin/utc';
import { Between, Equal } from 'typeorm';

import { EnvVariables } from '@config/environment';
import { CreateSmsDto, SendSmsDto, SmsDto } from '@sms/dto';
import { FilterSmsDto } from '@sms/dto/filter-sms.dto';
import { SmsEntity } from '@sms/entities/sms.entity';
import { ChannelsEnum } from '@sms/enum/channels.enum';
import { RegionCodeByKey } from '@sms/enum/region-code.enum';

import { FilterSms } from './filter-sms';

const CHANNEL_TRANSFORM = {
  [ChannelsEnum.SMS]: (phone: string) => `${phone}`,
  [ChannelsEnum.WHATSAPP]: (phone) => `${ChannelsEnum.WHATSAPP}:${phone}`,
};

dayjs.extend(utc);

export class SmsMapperProfile extends AutomapperProfile {
  private fromNumber: string;

  constructor(
    @InjectMapper() mapper: Mapper,
    private readonly configService: ConfigService,
  ) {
    super(mapper);
    this.fromNumber = this.configService.get<string>(
      EnvVariables.TWILIO_MESSAGING_SERVICE_SID,
    );
  }

  override get profile(): MappingProfile {
    return (mapper) => {
      createMap(
        mapper,
        CreateSmsDto,
        SendSmsDto,
        forMember(
          (dest) => dest.to,
          mapFrom(({ regionCode, phoneNumber, channel }) =>
            CHANNEL_TRANSFORM[channel](
              `${RegionCodeByKey[regionCode]}${phoneNumber}`,
            ),
          ),
        ),
        forMember(
          (dest) => dest.from,
          mapFrom(({ channel }) => CHANNEL_TRANSFORM[channel](this.fromNumber)),
        ),
        forMember(
          (dest) => dest.body,
          mapFrom((src) => src.message),
        ),
      );

      createMap(mapper, SmsEntity, SmsDto);

      createMap(
        mapper,
        FilterSmsDto,
        FilterSms,
        forMember(
          (dest) => dest.client,
          mapFrom((src) => {
            if (src.clientId) {
              return Equal(src.clientId);
            }
          }),
        ),
        forMember(
          (dest) => dest.createdAt,
          mapFrom((src) => {
            if (src.createdAt) {
              return Between(
                dayjs(src.updatedAt).utc().subtract(1, 'day').toDate(),
                dayjs(src.updatedAt).utc().add(1, 'day').toDate(),
              );
            }
            return null;
          }),
        ),
        forMember(
          (dest) => dest.updatedAt,
          mapFrom((src) => {
            if (src.updatedAt) {
              return Between(
                dayjs(src.updatedAt).utc().toDate(),
                dayjs(src.updatedAt).utc().add(1, 'day').toDate(),
              );
            }
            return null;
          }),
        ),
        forMember(
          (dest) => dest.sendAt,
          mapFrom((src) => {
            if (src.sendAt) {
              return Between(
                dayjs(src.sendAt).utc().toDate(),
                dayjs(src.sendAt).utc().add(1, 'day').toDate(),
              );
            }
            return null;
          }),
        ),
      );
    };
  }
}
