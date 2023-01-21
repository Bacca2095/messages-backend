import {
  Body,
  Controller,
  Get,
  Param,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiBody,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';

import { User } from '@/auth/decorators/user.decorator';
import { JwtGuard } from '@/auth/guards/jwt.guard';
import { UserEntity } from '@/user/entities/user.entity';

import { CreateSmsDto, SmsDto } from '../dto';
import { FilterSmsDto } from '../dto/filter-sms.dto';
import { SmsService } from '../services/sms.service';

@ApiTags('Sms')
@UseGuards(JwtGuard)
@ApiBearerAuth('jwt')
@Controller('sms')
export class SmsController {
  constructor(private readonly smsService: SmsService) {}

  @Post()
  @ApiCreatedResponse({ type: SmsDto })
  sendSms(
    @Body() message: CreateSmsDto,
    @User() user: UserEntity,
  ): Promise<SmsDto> {
    return this.smsService.sendSms({ ...message, clientId: user.client.id });
  }

  @Post('send/batch')
  @ApiBody({ type: [CreateSmsDto] })
  @ApiCreatedResponse({ type: [SmsDto] })
  sendSmsBatch(@Body() messages: CreateSmsDto[]): Promise<SmsDto[]> {
    return this.smsService.sendSmsBatch(messages);
  }

  @Get()
  @ApiOkResponse({ type: [SmsDto] })
  findAll(
    @Query() dto: FilterSmsDto,
    @User() user: UserEntity,
  ): Promise<SmsDto[]> {
    return this.smsService.findAll({ ...dto, clientId: user.client.id });
  }

  @Get(':id')
  @ApiOkResponse({ type: SmsDto })
  findOne(@Param('id') id: number): Promise<SmsDto> {
    return this.smsService.findOne(id);
  }
}
