import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ClientEntity } from '@client/entities/client.entity';
import { ContactDto } from '@contact/dto/contact.dto';
import { CreateContactDto } from '@contact/dto/create-contact.dto';
import { FilterContactDto } from '@contact/dto/filter-contact.dto';
import { UpdateContactDto } from '@contact/dto/update-contact.dto';
import { ContactEntity } from '@contact/entities/contact.entity';
import { FilterContact } from '@contact/mapper/filter-contact';

@Injectable()
export class ContactService {
  constructor(
    @InjectRepository(ContactEntity)
    private readonly contactRepository: Repository<ContactEntity>,
    @InjectRepository(ClientEntity)
    private readonly clientRepository: Repository<ClientEntity>,
    @InjectMapper() private readonly mapper: Mapper,
  ) {}
  async create(dto: CreateContactDto): Promise<ContactDto> {
    const client = await this.clientRepository.findOne({
      where: { id: dto.clientId },
    });
    const entity = this.mapper.map({ ...dto }, CreateContactDto, ContactEntity);

    return this.mapper.mapAsync(
      await this.contactRepository.save({ ...entity, client }),
      ContactEntity,
      ContactDto,
    );
  }

  async findAll(filter: FilterContactDto): Promise<ContactDto[]> {
    const filterBy = this.mapper.map(filter, FilterContactDto, FilterContact);

    return this.mapper.mapArrayAsync(
      await this.contactRepository.find({
        where: {
          ...filterBy,
        },
      }),
      ContactEntity,
      ContactDto,
    );
  }

  async findOne(id: number): Promise<ContactDto> {
    const user = await this.contactRepository.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException();
    }

    return this.mapper.map(user, ContactEntity, ContactDto);
  }

  async update(id: number, dto: UpdateContactDto): Promise<ContactDto> {
    await this.findOne(id);

    return this.mapper.mapAsync(
      await this.contactRepository.save({ ...dto, id }),
      ContactEntity,
      ContactDto,
    );
  }

  async remove(id: number): Promise<boolean> {
    await this.findOne(id);

    const { affected } = await this.contactRepository.softDelete(id);
    return affected > 0;
  }
}
