import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ClientEntity } from '../../client/entities/client.entity';
import { CreateCustomFieldDto } from '../dto/create-custom-field.dto';
import { CustomFieldDto } from '../dto/custom-field.dto';
import { FilterCustomFieldDto } from '../dto/filter-custom-field.dto';
import { UpdateCustomFieldDto } from '../dto/update-custom-field.dto';
import { CustomFieldEntity } from '../entities/custom-field.entity';
import { FilterCustomField } from '../mapper/filter-custom-field';

@Injectable()
export class CustomFieldService {
  constructor(
    @InjectRepository(CustomFieldEntity)
    private readonly customFieldRepository: Repository<CustomFieldEntity>,
    @InjectRepository(ClientEntity)
    private readonly clientRepository: Repository<ClientEntity>,
    @InjectMapper() private readonly mapper: Mapper,
  ) {}

  async create(dto: CreateCustomFieldDto): Promise<CustomFieldDto> {
    const client = await this.clientRepository.findOne({
      where: { id: dto.clientId },
    });
    const entity = this.mapper.map(
      { ...dto },
      CreateCustomFieldDto,
      CustomFieldEntity,
    );

    return this.mapper.mapAsync(
      await this.customFieldRepository.save({ ...entity, client }),
      CustomFieldEntity,
      CustomFieldDto,
    );
  }

  async findAll(filter: FilterCustomFieldDto): Promise<CustomFieldDto[]> {
    const filterBy = this.mapper.map(
      filter,
      FilterCustomFieldDto,
      FilterCustomField,
    );

    return this.mapper.mapArrayAsync(
      await this.customFieldRepository.find({
        where: {
          ...filterBy,
        },
      }),
      CustomFieldEntity,
      CustomFieldDto,
    );
  }

  async findOne(id: number): Promise<CustomFieldDto> {
    const user = await this.customFieldRepository.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException();
    }

    return this.mapper.map(user, CustomFieldEntity, CustomFieldDto);
  }

  async update(id: number, dto: UpdateCustomFieldDto): Promise<CustomFieldDto> {
    await this.findOne(id);

    return this.mapper.mapAsync(
      await this.customFieldRepository.save({ ...dto, id }),
      CustomFieldEntity,
      CustomFieldDto,
    );
  }

  async remove(id: number): Promise<boolean> {
    await this.findOne(id);

    const { affected } = await this.clientRepository.softDelete(id);
    return affected > 0;
  }
}
