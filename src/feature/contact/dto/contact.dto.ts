import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsString,
} from 'class-validator';

import { ContactEntity } from '@contact/entities/contact.entity';
import { RegionCodeEnum } from '@sms/enum/region-code.enum';

export class ContactDto implements Partial<ContactEntity> {
  @AutoMap()
  @ApiProperty()
  @IsNumber()
  id: number;

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

  @AutoMap()
  @ApiProperty({ format: 'date-time' })
  @Type(() => Date)
  @IsDateString()
  createdAt: Date;

  @AutoMap()
  @ApiProperty({ format: 'date-time' })
  @Type(() => Date)
  @IsDateString()
  updatedAt: Date;

  @AutoMap()
  @ApiProperty({ format: 'date-time' })
  @Type(() => Date)
  @IsDateString()
  deletedAt: Date;
}
