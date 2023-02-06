import { ApiProperty } from '@nestjs/swagger';
import { IsJWT } from 'class-validator';

export class ConfirmEmailDto {
  @ApiProperty()
  @IsJWT()
  token: string;
}
