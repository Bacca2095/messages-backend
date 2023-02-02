import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsArray,
  IsDateString,
  IsNumber,
  IsObject,
  IsString,
} from 'class-validator';

import { ClientEntity } from '@/client/entities/client.entity';

import { ContactCustomFieldEntity } from '../../contact/entities/contact-custom-fields.entity';
import { CustomFieldEntity } from '../entities/custom-field.entity';

export class CustomFieldDto implements CustomFieldEntity {
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
  @IsObject()
  client: ClientEntity;

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

  @ApiProperty({ isArray: true })
  @Type(() => ContactCustomFieldEntity)
  @IsArray()
  contacts: ContactCustomFieldEntity[];
}
