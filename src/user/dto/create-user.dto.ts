import { AutoMap } from '@automapper/classes';
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import {
  IsDateString,
  IsEmail,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

import { ClientEntity } from '@/client/entities/client.entity';
import { RegionCodeEnum } from '@/sms/enum/region-code.enum';

import { UserEntity } from '../entities/user.entity';

export class CreateUserDto implements Partial<UserEntity> {
  @AutoMap()
  @ApiProperty()
  @IsString()
  name: string;

  @AutoMap()
  @ApiProperty()
  @IsEmail()
  email: string;

  @AutoMap()
  @ApiProperty()
  @IsString()
  password: string;

  @AutoMap()
  @ApiProperty()
  @Transform(({ value }) => +value)
  @IsNumber()
  phoneNumber: string;

  @ApiHideProperty()
  @IsString()
  @IsOptional()
  resetPasswordToken: string;

  @ApiHideProperty()
  @Transform(({ value }) => new Date(value).toISOString())
  @Type(() => Date)
  @IsDateString()
  @IsOptional()
  resetPasswordExpires: Date;

  @ApiHideProperty()
  @Transform(({ value }) => +value)
  @IsNumber()
  @IsOptional()
  clientId?: number;
}
