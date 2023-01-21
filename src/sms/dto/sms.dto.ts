import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsDateString, IsEnum, IsNumber, IsString } from 'class-validator';

import { SmsEntity, SmsStatus } from '../entities/sms.entity';

export class SmsDto implements Partial<SmsEntity> {
  @AutoMap()
  @ApiProperty()
  @Transform(({ value }) => +value)
  @IsNumber()
  id: number;

  @AutoMap()
  @ApiProperty()
  @IsString()
  message: string;

  @AutoMap()
  @ApiProperty({ enum: SmsStatus, enumName: 'SmsStatus' })
  @IsEnum(SmsStatus)
  status: SmsStatus;

  @AutoMap()
  @ApiProperty()
  @IsString()
  phoneNumber: string;

  @AutoMap()
  @ApiProperty()
  @Transform(({ value }) => +value)
  @IsNumber()
  price: number;

  @AutoMap()
  @ApiProperty()
  @IsString()
  priceUnit: string;

  @AutoMap()
  @ApiProperty()
  @Transform(({ value }) => +value)
  @IsNumber()
  segments: number;

  @AutoMap()
  @ApiProperty()
  @IsString()
  externalId: string;

  @AutoMap()
  @ApiProperty()
  @Transform(({ value }) => +value)
  @IsNumber()
  errorCode: number;

  @AutoMap()
  @ApiProperty()
  @IsString()
  errorMessage: string;

  @AutoMap()
  @ApiProperty()
  @IsString()
  providerName: string;

  @AutoMap()
  @ApiProperty()
  @Transform(({ value }) => new Date(value).toISOString())
  @IsDateString()
  @Type(() => Date)
  sendAt: Date;

  @AutoMap()
  @ApiProperty()
  @Transform(({ value }) => new Date(value).toISOString())
  @IsDateString()
  @Type(() => Date)
  createdAt: Date;

  @AutoMap()
  @ApiProperty()
  @Transform(({ value }) => new Date(value).toISOString())
  @IsDateString()
  @Type(() => Date)
  updatedAt: Date;

  @AutoMap()
  @ApiProperty()
  @Transform(({ value }) => new Date(value).toISOString())
  @IsDateString()
  @Type(() => Date)
  deletedAt: Date;
}
