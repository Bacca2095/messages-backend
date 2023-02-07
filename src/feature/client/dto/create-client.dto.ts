import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsEnum, IsString } from 'class-validator';

import { ClientEntity } from '@client/entities/client.entity';
import { RegionCodeEnum } from '@sms/enum/region-code.enum';

export class CreateClientDto implements Partial<ClientEntity> {
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
  @IsString()
  phoneNumber: string;

  @AutoMap()
  @ApiProperty({ enumName: 'RegionCodeEnum' })
  @IsEnum(RegionCodeEnum)
  defaultRegionCode: RegionCodeEnum;
}
