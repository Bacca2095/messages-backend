import { AutoMap } from '@automapper/classes';
import { ApiPropertyOptional, PartialType } from '@nestjs/swagger';
import { Transform } from 'class-transformer';
import { IsNumber, IsOptional } from 'class-validator';

import { CreateClientDto } from './create-client.dto';

export class UpdateClientDto extends PartialType(CreateClientDto) {
  @AutoMap()
  @ApiPropertyOptional()
  @Transform(({ value }) => +value)
  @IsNumber()
  @IsOptional()
  id?: number;
}
