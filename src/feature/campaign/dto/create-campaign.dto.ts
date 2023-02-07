import { AutoMap } from '@automapper/classes';
import { ApiHideProperty, ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import {
  IsDateString,
  IsEnum,
  IsMilitaryTime,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

import { CampaignEntity } from '@campaign/entities/campaign.entity';
import { CampaignStatus } from '@campaign/enum/campaign-status.enum';
import { Days } from '@shared/enums/days.enum';

export class CreateCampaignDto implements Partial<CampaignEntity> {
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
  @IsString()
  message: string;

  @Type(() => Date)
  @AutoMap()
  @Transform(({ value }) => new Date(value).toISOString())
  @ApiProperty()
  @IsDateString()
  startDate: Date;

  @AutoMap()
  @Transform(({ value }) => new Date(value).toISOString())
  @ApiProperty()
  @Type(() => Date)
  @IsDateString()
  endDate: Date;

  @AutoMap()
  @ApiProperty()
  @IsMilitaryTime()
  startTime: string;

  @AutoMap()
  @ApiProperty()
  @IsMilitaryTime()
  endTime: string;

  @AutoMap()
  @ApiProperty({ isArray: true, enum: Days, enumName: 'Days' })
  @IsEnum(Days, { each: true })
  days: Days[];

  @AutoMap()
  @ApiProperty({ enum: CampaignStatus, enumName: 'CampaignStatus' })
  @IsEnum(CampaignStatus)
  status: CampaignStatus;

  @ApiHideProperty()
  @Transform(({ value }) => +value)
  @IsNumber()
  @IsOptional()
  clientId?: number;
}
