import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';

import { User } from '@/auth/decorators/user.decorator';
import { JwtGuard } from '@/auth/guards/jwt.guard';
import { CustomFieldDto } from '@/custom-field/dto/custom-field.dto';
import { UserEntity } from '@/user/entities/user.entity';

import { CampaignDto } from '../dto/campaign.dto';
import { CreateCampaignDto } from '../dto/create-campaign.dto';
import { FilterCampaignDto } from '../dto/filter-campaign.dto';
import { UpdateCampaignDto } from '../dto/update-campaign.dto';
import { CampaignService } from '../services/campaign.service';

@ApiTags('Campaigns')
@UseGuards(JwtGuard)
@ApiBearerAuth('jwt')
@Controller('campaigns')
export class CampaignController {
  constructor(private readonly campaignService: CampaignService) {}

  @Post()
  @ApiCreatedResponse({ type: CampaignDto })
  create(
    @Body() dto: CreateCampaignDto,
    @User() user: UserEntity,
  ): Promise<CampaignDto> {
    return this.campaignService.create({
      ...dto,
      clientId: user.client.id,
    });
  }

  @Get()
  @ApiOkResponse({ type: [CampaignDto] })
  findAll(
    @Query() filter: FilterCampaignDto,
    @User() user: UserEntity,
  ): Promise<CampaignDto[]> {
    return this.campaignService.findAll({
      ...filter,
      clientId: user.client.id,
    });
  }

  @Get(':id')
  @ApiOkResponse({ type: CampaignDto })
  findOne(@Param('id') id: string): Promise<CampaignDto> {
    return this.campaignService.findOne(+id);
  }

  @Patch(':id')
  @ApiOkResponse({ type: CustomFieldDto })
  update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateCampaignDto,
  ): Promise<CampaignDto> {
    return this.campaignService.update(+id, updateUserDto);
  }

  @Delete(':id')
  @ApiOkResponse({ type: 'boolean' })
  remove(@Param('id') id: string): Promise<boolean> {
    return this.campaignService.remove(+id);
  }
}
