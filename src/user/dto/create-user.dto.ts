import { AutoMap } from '@automapper/classes';
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsEmail, IsNumber, IsOptional, IsString } from 'class-validator';

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
  @Transform(({ value }) => +value)
  @IsNumber()
  @IsOptional()
  clientId?: number;
}
