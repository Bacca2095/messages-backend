import { AutoMap } from '@automapper/classes';
import { ApiPropertyOptional } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import {
  IsDateString,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

import { SmsEntity, SmsStatus } from '../entities/sms.entity';

export class FilterSmsDto implements Partial<SmsEntity> {
  @AutoMap()
  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  message?: string;

  @AutoMap()
  @ApiPropertyOptional({ enumName: 'SmsStatus' })
  @IsEnum(SmsStatus)
  @IsOptional()
  status?: SmsStatus;

  @AutoMap()
  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  phoneNumber?: string;

  @AutoMap()
  @ApiPropertyOptional()
  @Transform(({ value }) => +value)
  @IsNumber()
  @IsOptional()
  price?: number;

  @AutoMap()
  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  priceUnit?: string;

  @AutoMap()
  @ApiPropertyOptional()
  @Transform(({ value }) => +value)
  @IsNumber()
  @IsOptional()
  segments?: number;

  @AutoMap()
  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  externalId?: string;

  @AutoMap()
  @ApiPropertyOptional()
  @Transform(({ value }) => +value)
  @IsNumber()
  @IsOptional()
  errorCode?: number;

  @AutoMap()
  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  errorMessage?: string;

  @AutoMap()
  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  providerName?: string;

  @AutoMap()
  @ApiPropertyOptional()
  @Transform(({ value }) => +value)
  @IsNumber()
  @IsOptional()
  clientId?: number;

  @AutoMap()
  @ApiPropertyOptional()
  @Transform(({ value }) => new Date(value).toISOString())
  @IsDateString()
  @Type(() => Date)
  @IsOptional()
  sendAt?: Date;

  @AutoMap()
  @ApiPropertyOptional()
  @Transform(({ value }) => new Date(value).toISOString())
  @IsDateString()
  @Type(() => Date)
  @IsOptional()
  createdAt?: Date;

  @AutoMap()
  @ApiPropertyOptional()
  @Transform(({ value }) => new Date(value).toISOString())
  @IsDateString()
  @Type(() => Date)
  @IsOptional()
  updatedAt?: Date;
}
