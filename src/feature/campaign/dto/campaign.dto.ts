import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import { Transform, Type } from 'class-transformer';
import { IsDateString, IsEnum, IsNumber, IsString } from 'class-validator';

import { CampaignEntity } from '@campaign/entities/campaign.entity';
import { CampaignStatus } from '@campaign/enum/campaign-status.enum';
import { Days } from '@shared/enums/days.enum';

export class CampaignDto implements Partial<CampaignEntity> {
  @AutoMap()
  @ApiProperty()
  @IsNumber()
  id: number;

  @AutoMap()
  @IsString()
  @ApiProperty()
  name: string;

  @AutoMap()
  @ApiProperty()
  @IsString()
  description: string;

  @AutoMap()
  @ApiProperty()
  @IsString()
  message: string;

  @AutoMap()
  @Type(() => Date)
  @Transform(({ value }) => new Date(value).toISOString())
  @IsDateString()
  startDate: Date;

  @AutoMap()
  @ApiProperty()
  @Type(() => Date)
  @Transform(({ value }) => new Date(value).toISOString())
  @IsDateString()
  endDate: Date;

  @AutoMap()
  @ApiProperty()
  @IsString()
  startTime: string;

  @AutoMap()
  @ApiProperty()
  @IsString()
  endTime: string;

  @AutoMap()
  @ApiProperty({ enum: Days, enumName: 'Days', isArray: true })
  @IsEnum(Days, { each: true })
  days: Days[];

  @AutoMap()
  @ApiProperty({ enumName: 'CampaignStatus' })
  @IsEnum(CampaignStatus)
  status: CampaignStatus;

  @AutoMap()
  @ApiProperty()
  @Type(() => Date)
  @Transform(({ value }) => new Date(value).toISOString())
  @IsDateString()
  createdAt: Date;

  @AutoMap()
  @ApiProperty()
  @Type(() => Date)
  @Transform(({ value }) => new Date(value).toISOString())
  @IsDateString()
  updatedAt: Date;

  @AutoMap()
  @ApiProperty()
  @Type(() => Date)
  @Transform(({ value }) => new Date(value).toISOString())
  @IsDateString()
  deletedAt: Date;
}
