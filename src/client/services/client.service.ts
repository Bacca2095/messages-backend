import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UserEntity } from '@/user/entities/user.entity';

import { PasswordUtilService } from '../../shared/password-util/password-util.service';
import { ClientDto, CreateClientDto, UpdateClientDto } from '../dto';
import { ClientEntity } from '../entities/client.entity';

@Injectable()
export class ClientService {
  constructor(
    @InjectRepository(ClientEntity)
    private readonly clientRepository: Repository<ClientEntity>,
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectMapper() private readonly classMapper: Mapper,
    private readonly passwordUtilService: PasswordUtilService,
  ) {}

  async create(dto: CreateClientDto): Promise<ClientDto> {
    const entity = this.classMapper.map(dto, CreateClientDto, ClientEntity);
    const hashedPassword = await this.passwordUtilService.hashPassword(
      dto.password,
    );

    const user = this.userRepository.create({
      name: entity.name,
      email: entity.email,
      password: hashedPassword,
      phoneNumber: entity.phoneNumber,
    });

    const client = this.clientRepository.create({
      ...entity,
      users: [user],
      password: hashedPassword,
    });

    return this.classMapper.mapAsync(
      await this.clientRepository.save(client),
      ClientEntity,
      ClientDto,
    );
  }

  async findAll(): Promise<ClientDto[]> {
    return this.classMapper.mapArrayAsync(
      await this.clientRepository.find(),
      ClientEntity,
      ClientDto,
    );
  }

  async findOne(id: number): Promise<ClientDto> {
    const entity = await this.clientRepository.findOne({ where: { id } });

    if (!entity) {
      throw new NotFoundException();
    }
    return this.classMapper.mapAsync(
      await this.clientRepository.findOne({ where: { id } }),
      ClientEntity,
      ClientDto,
    );
  }

  async update(id: number, dto: UpdateClientDto): Promise<ClientDto> {
    await this.findOne(id);

    return this.classMapper.mapAsync(
      await this.clientRepository.save({ ...dto, id }),
      ClientEntity,
      ClientDto,
    );
  }

  async remove(id: number): Promise<boolean> {
    await this.findOne(id);
    const { affected } = await this.clientRepository.softDelete(id);
    return affected > 0;
  }
}
