import { AutoMap } from '@automapper/classes';
import { ApiHideProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import {
  IsBoolean,
  IsDateString,
  IsEmail,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

import { UserEntity } from '../entities/user.entity';

export class FilterUserDto implements Partial<UserEntity> {
  @AutoMap()
  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  name?: string;

  @AutoMap()
  @ApiPropertyOptional()
  @IsEmail()
  @IsOptional()
  email?: string;

  @AutoMap()
  @ApiPropertyOptional()
  @Transform(({ value }) => value === 'true')
  @IsBoolean()
  @IsOptional()
  emailVerified?: boolean;

  @ApiPropertyOptional()
  @Transform(({ value }) => value === 'true')
  @IsBoolean()
  @IsOptional()
  status?: boolean;

  @AutoMap()
  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  phoneNumber?: string;

  @AutoMap()
  @ApiHideProperty()
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
  createdAt?: Date;

  @AutoMap()
  @ApiPropertyOptional()
  @Transform(({ value }) => new Date(value).toISOString())
  @IsDateString()
  @Type(() => Date)
  @IsOptional()
  updatedAt?: Date;
}
