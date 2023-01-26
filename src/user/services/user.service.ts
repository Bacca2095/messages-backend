import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { ClientEntity } from '@/client/entities/client.entity';
import { PasswordUtilService } from '@/shared/password-util';

import { CreateUserDto, FilterUserDto, UpdateUserDto, UserDto } from '../dto';
import { UserEntity } from '../entities/user.entity';
import { FilterUser } from '../mapper/filter-user';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    @InjectRepository(ClientEntity)
    private readonly clientRepository: Repository<ClientEntity>,
    @InjectMapper() private readonly mapper: Mapper,
    private readonly passwordUtilService: PasswordUtilService,
  ) {}

  async create(dto: CreateUserDto): Promise<UserDto> {
    const encryptedPassword = await this.passwordUtilService.hashPassword(
      dto.password,
    );
    const client = await this.clientRepository.findOne({
      where: { id: dto.clientId },
    });
    const entity = this.mapper.map(
      { ...dto, password: encryptedPassword },
      CreateUserDto,
      UserEntity,
    );

    return this.mapper.mapAsync(
      await this.userRepository.save({ ...entity, client }),
      UserEntity,
      UserDto,
    );
  }

  async findAll(filter: FilterUserDto): Promise<UserDto[]> {
    const filterBy = this.mapper.map(filter, FilterUserDto, FilterUser);

    return this.mapper.mapArrayAsync(
      await this.userRepository.find({
        where: {
          ...filterBy,
        },
      }),
      UserEntity,
      UserDto,
    );
  }

  async findOne(id: number): Promise<UserDto> {
    const user = await this.userRepository.findOne({ where: { id } });

    if (!user) {
      throw new NotFoundException();
    }

    return this.mapper.map(user, UserEntity, UserDto);
  }

  async findOneByEmail(email: string): Promise<UserEntity> {
    const user = this.userRepository.findOne({ where: { email } });

    if (!user) {
      throw new NotFoundException();
    }

    return user;
  }

  async update(id: number, dto: UpdateUserDto): Promise<UserDto> {
    await this.findOne(id);

    return this.mapper.mapAsync(
      await this.userRepository.save({ ...dto, id }),
      UserEntity,
      UserDto,
    );
  }

  async remove(id: number) {
    await this.findOne(id);

    const { affected } = await this.clientRepository.softDelete(id);
    return affected > 0;
  }
}
