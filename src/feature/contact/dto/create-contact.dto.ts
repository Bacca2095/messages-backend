import { AutoMap } from '@automapper/classes';
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import {
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

import { RegionCodeEnum } from '@sms/enum/region-code.enum';

import { ContactDto } from './contact.dto';

export class CreateContactDto implements Partial<ContactDto> {
  @AutoMap()
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  name: string;

  @AutoMap()
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  phoneNumber: string;

  @AutoMap()
  @ApiProperty({ enumName: 'RegionCodeEnum' })
  @IsEnum(RegionCodeEnum)
  regionCode: RegionCodeEnum;

  @ApiHideProperty()
  @IsNumber()
  @IsOptional()
  clientId?: number;
}
