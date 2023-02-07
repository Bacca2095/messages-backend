import { AutoMap } from '@automapper/classes';
import { ApiHideProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import {
  IsDateString,
  IsEnum,
  IsMilitaryTime,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';

import { CampaignEntity } from '@campaign/entities/campaign.entity';
import { CampaignStatus } from '@campaign/enum/campaign-status.enum';
import { Days } from '@shared/enums/days.enum';

export class FilterCampaignDto implements Partial<CampaignEntity> {
  @AutoMap()
  @ApiPropertyOptional()
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  name?: string;

  @AutoMap()
  @ApiPropertyOptional()
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  description?: string;

  @AutoMap()
  @ApiPropertyOptional()
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  message?: string;

  @AutoMap()
  @ApiPropertyOptional({ format: 'date-time' })
  @Transform(({ value }) => new Date(value).toISOString())
  @IsDateString()
  @Type(() => Date)
  @IsOptional()
  startDate?: Date;

  @AutoMap()
  @ApiPropertyOptional({ format: 'date-time' })
  @Transform(({ value }) => new Date(value).toISOString())
  @IsDateString()
  @Type(() => Date)
  @IsOptional()
  endDate?: Date;

  @AutoMap()
  @ApiPropertyOptional()
  @IsMilitaryTime()
  @IsOptional()
  startTime?: string;

  @AutoMap()
  @ApiPropertyOptional()
  @IsMilitaryTime()
  @IsOptional()
  endTime?: string;

  @AutoMap()
  @ApiPropertyOptional({ enumName: 'Days', isArray: true })
  @IsEnum(Days, { each: true })
  @IsOptional()
  days?: Days[];

  @AutoMap()
  @ApiPropertyOptional({ enumName: 'CampaignStatus' })
  @IsEnum(CampaignStatus)
  @IsOptional()
  status?: CampaignStatus;

  @AutoMap()
  @ApiPropertyOptional({ format: 'date-time' })
  @Transform(({ value }) => new Date(value).toISOString())
  @IsDateString()
  @Type(() => Date)
  @IsOptional()
  createdAt?: Date;

  @AutoMap()
  @ApiPropertyOptional({ format: 'date-time' })
  @Transform(({ value }) => new Date(value).toISOString())
  @IsDateString()
  @Type(() => Date)
  @IsOptional()
  updatedAt?: Date;

  @AutoMap()
  @ApiHideProperty()
  @Transform(({ value }) => +value)
  @IsNumber()
  @IsOptional()
  clientId?: number;
}
