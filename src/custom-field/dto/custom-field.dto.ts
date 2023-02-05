import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsDateString, IsNumber, IsString } from 'class-validator';

import { CustomFieldEntity } from '../entities/custom-field.entity';

export class CustomFieldDto implements Partial<CustomFieldEntity> {
  @AutoMap()
  @ApiProperty()
  @IsNumber()
  id: number;

  @AutoMap()
  @ApiProperty()
  @IsString()
  name: string;

  @AutoMap()
  @ApiProperty()
  @IsString()
  description: string;

  @AutoMap()
  @ApiProperty()
  @Type(() => Date)
  @IsDateString()
  createdAt: Date;

  @AutoMap()
  @ApiProperty()
  @Type(() => Date)
  @IsDateString()
  updatedAt: Date;

  @AutoMap()
  @ApiProperty()
  @Type(() => Date)
  @IsDateString()
  deletedAt: Date;
}
