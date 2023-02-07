import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import {
  IsBoolean,
  IsDateString,
  IsNumber,
  IsObject,
  IsString,
} from 'class-validator';

import { ClientEntity } from '@client/entities/client.entity';
import { UserEntity } from '@user/entities/user.entity';

export class UserDto implements Partial<UserEntity> {
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
  @IsString()
  email: string;

  @AutoMap()
  @ApiProperty()
  @Transform(({ value }) => value || value === 'true')
  @IsBoolean()
  emailVerified: boolean;

  @AutoMap()
  @ApiProperty()
  @IsString()
  password: string;

  @AutoMap()
  @ApiProperty()
  @Transform(({ value }) => value || value === 'true')
  @IsBoolean()
  status: boolean;

  @AutoMap()
  @ApiProperty()
  @IsString()
  phoneNumber: string;

  @AutoMap()
  @ApiProperty()
  @IsObject()
  @Type(() => ClientEntity)
  client: ClientEntity;

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
