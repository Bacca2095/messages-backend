import { AutoMap } from '@automapper/classes';
import {
  ApiHideProperty,
  ApiProperty,
  ApiPropertyOptional,
} from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEnum, IsNumber, IsOptional, IsString } from 'class-validator';

import { ChannelsEnum } from '@sms/enum/channels.enum';
import { RegionCodeEnum } from '@sms/enum/region-code.enum';

export class CreateSmsDto {
  @AutoMap()
  @ApiProperty()
  @IsString()
  message: string;

  @AutoMap()
  @ApiProperty()
  @Transform(({ value }) => +value)
  @IsNumber()
  phoneNumber: number;

  @AutoMap()
  @ApiProperty({ enum: RegionCodeEnum, enumName: 'RegionCodeEnum' })
  @IsEnum(RegionCodeEnum)
  regionCode: RegionCodeEnum;

  @AutoMap()
  @ApiPropertyOptional({
    enum: ChannelsEnum,
    default: ChannelsEnum.SMS,
    enumName: 'ChannelsEnum',
  })
  @IsEnum(ChannelsEnum)
  @IsOptional()
  channel?: ChannelsEnum;

  @ApiHideProperty()
  @Transform(({ value }) => +value)
  @IsNumber()
  @IsOptional()
  clientId?: number;
}
