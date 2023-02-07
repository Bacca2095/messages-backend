import { AutoMap } from '@automapper/classes';
import { ApiHideProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNumber, IsOptional, IsString } from 'class-validator';

import { CustomFieldEntity } from '../entities/custom-field.entity';

export class FilterCustomFieldDto implements Partial<CustomFieldEntity> {
  @AutoMap()
  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  name?: string;

  @AutoMap()
  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  description?: string;

  @AutoMap()
  @ApiHideProperty()
  @Transform(({ value }) => +value)
  @IsNumber()
  @IsOptional()
  clientId?: number;
}
