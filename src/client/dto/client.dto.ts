import { AutoMap } from '@automapper/classes';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import {
  IsDateString,
  IsEmail,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

import { RegionCodeEnum } from '@/sms/enum/region-code.enum';

import { ClientEntity } from '../entities/client.entity';

export class ClientDto implements Partial<ClientEntity> {
  @AutoMap()
  @ApiProperty()
  @Transform(({ value }) => +value)
  @IsNumber()
  id: number;

  @AutoMap()
  @ApiProperty()
  @IsString()
  name: string;

  @AutoMap()
  @ApiProperty()
  @IsEmail()
  email: string;

  @AutoMap()
  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  password?: string;

  @AutoMap()
  @ApiProperty()
  @IsString()
  phoneNumber: string;

  @AutoMap()
  @ApiProperty({ enumName: 'RegionCodeEnum' })
  @IsEnum(RegionCodeEnum)
  defaultRegionCode: RegionCodeEnum;

  @AutoMap()
  @ApiProperty()
  @IsDateString()
  @Transform(({ value }) => new Date(value).toISOString())
  @Type(() => Date)
  createdAt: Date;

  @ApiProperty()
  @AutoMap()
  @Transform(({ value }) => new Date(value).toISOString())
  @IsDateString()
  @Type(() => Date)
  updatedAt: Date;

  @ApiProperty()
  @AutoMap()
  @Transform(({ value }) => new Date(value).toISOString())
  @IsDateString()
  @Type(() => Date)
  deletedAt: Date;
}
