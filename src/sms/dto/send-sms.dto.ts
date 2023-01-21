import { AutoMap } from '@automapper/classes';
import { IsString } from 'class-validator';

export class SendSmsDto {
  @AutoMap()
  @IsString()
  to: string;

  @AutoMap()
  @IsString()
  from: string;

  @AutoMap()
  @IsString()
  body: string;
}
