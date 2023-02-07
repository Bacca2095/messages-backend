import { AutoMap } from '@automapper/classes';
import { ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { IsOptional, IsString } from 'class-validator';

import { CreateCustomFieldDto } from './create-custom-field.dto';

export class UpdateCustomFieldDto extends PartialType(CreateCustomFieldDto) {
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
}
