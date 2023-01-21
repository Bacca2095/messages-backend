import { PartialType } from '@nestjs/mapped-types';

import { CreateSmsDto } from './create-sms.dto';

export class UpdateSmsDto extends PartialType(CreateSmsDto) {}
