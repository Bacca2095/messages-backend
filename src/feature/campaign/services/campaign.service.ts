import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CampaignDto } from '@campaign/dto/campaign.dto';
import { CreateCampaignDto } from '@campaign/dto/create-campaign.dto';
import { FilterCampaignDto } from '@campaign/dto/filter-campaign.dto';
import { UpdateCampaignDto } from '@campaign/dto/update-campaign.dto';
import { CampaignEntity } from '@campaign/entities/campaign.entity';
import { FilterCampaign } from '@campaign/mapper/filter-campaign';
import { ClientEntity } from '@client/entities/client.entity';

@Injectable()
export class CampaignService {
  constructor(
    @InjectRepository(CampaignEntity)
    private readonly campaignRepository: Repository<CampaignEntity>,
    @InjectRepository(ClientEntity)
    private readonly clientRepository: Repository<ClientEntity>,
    @InjectMapper() private readonly mapper: Mapper,
  ) {}

  async create(dto: CreateCampaignDto): Promise<CampaignDto> {
    const client = await this.clientRepository.findOne({
      where: { id: dto.clientId },
    });

    const entity = this.mapper.map(
      { ...dto },
      CreateCampaignDto,
      CampaignEntity,
    );

    return this.mapper.mapAsync(
      await this.campaignRepository.save({
        ...entity,
        days: [...dto.days],
        client,
      }),
      CampaignEntity,
      CampaignDto,
    );
  }

  async findAll(filter: FilterCampaignDto): Promise<CampaignDto[]> {
    const filterBy = this.mapper.map(filter, FilterCampaignDto, FilterCampaign);

    return this.mapper.mapArrayAsync(
      await this.campaignRepository.find({
        where: {
          ...filterBy,
        },
      }),
      CampaignEntity,
      CampaignDto,
    );
  }

  async findOne(id: number): Promise<CampaignDto> {
    const user = await this.campaignRepository.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException();
    }

    return this.mapper.map(user, CampaignEntity, CampaignDto);
  }

  async update(id: number, dto: UpdateCampaignDto): Promise<CampaignDto> {
    await this.findOne(id);

    return this.mapper.mapAsync(
      await this.campaignRepository.save({ ...dto, id }),
      CampaignEntity,
      CampaignDto,
    );
  }

  async remove(id: number): Promise<boolean> {
    await this.findOne(id);

    const { affected } = await this.campaignRepository.softDelete(id);
    return affected > 0;
  }
}
