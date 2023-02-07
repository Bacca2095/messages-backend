import { AutoMap } from '@automapper/classes';
import { ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsBoolean, IsNumber, IsOptional } from 'class-validator';

import { CreateUserDto } from './create-user.dto';

export class UpdateUserDto extends PartialType(CreateUserDto) {
  @AutoMap()
  @ApiPropertyOptional()
  @IsNumber()
  @Transform(({ value }) => +value)
  @IsOptional()
  id?: number;

  @AutoMap()
  @ApiPropertyOptional()
  @IsBoolean()
  @Transform(({ value }) => value || value === 'true')
  @IsOptional()
  status?: boolean;

  @AutoMap()
  @ApiPropertyOptional()
  @IsBoolean()
  @Transform(({ value }) => value || value === 'true')
  @IsOptional()
  emailVerified?: boolean;
}
