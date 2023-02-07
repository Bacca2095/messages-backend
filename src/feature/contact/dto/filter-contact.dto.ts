import { AutoMap } from '@automapper/classes';
import { ApiHideProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import {
  IsDateString,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

import { ContactEntity } from '@contact/entities/contact.entity';
import { RegionCodeEnum } from '@sms/enum/region-code.enum';

export class FilterContactDto implements Partial<ContactEntity> {
  @AutoMap()
  @ApiPropertyOptional()
  @Transform(({ value }) => +value)
  @IsNumber()
  @IsOptional()
  id?: number;

  @AutoMap()
  @ApiPropertyOptional()
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  name?: string;

  @AutoMap()
  @ApiPropertyOptional()
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  phoneNumber?: string;

  @AutoMap()
  @ApiPropertyOptional({ enumName: 'RegionCodeEnum' })
  @IsEnum(RegionCodeEnum)
  @IsOptional()
  regionCode?: RegionCodeEnum;

  @AutoMap()
  @ApiHideProperty()
  @Transform(({ value }) => +value)
  @IsNumber()
  @IsOptional()
  clientId?: number;

  @AutoMap()
  @ApiPropertyOptional({ format: 'date-time' })
  @Transform(({ value }) => new Date(value).toISOString())
  @IsDateString()
  @Type(() => Date)
  @IsOptional()
  createdAt?: Date;

  @AutoMap()
  @ApiPropertyOptional({ format: 'date-time' })
  @Transform(({ value }) => new Date(value).toISOString())
  @IsDateString()
  @Type(() => Date)
  @IsOptional()
  updatedAt?: Date;
}
