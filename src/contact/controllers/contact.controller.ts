import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { User } from '@/auth/decorators/user.decorator';
import { CustomFieldDto } from '@/custom-field/dto/custom-field.dto';
import { UserEntity } from '@/user/entities/user.entity';

import { ContactDto } from '../dto/contact.dto';
import { CreateContactDto } from '../dto/create-contact.dto';
import { FilterContactDto } from '../dto/filter-contact.dto';
import { UpdateContactDto } from '../dto/update-contact.dto';
import { ContactService } from '../services/contact.service';

@ApiTags('Contacts')
@Controller('contact')
export class ContactController {
  constructor(private readonly contactService: ContactService) {}

  @Post()
  @ApiCreatedResponse({ type: ContactDto })
  create(
    @Body() dto: CreateContactDto,
    @User() user: UserEntity,
  ): Promise<ContactDto> {
    return this.contactService.create({
      ...dto,
      clientId: user.client.id,
    });
  }

  @Get()
  @ApiOkResponse({ type: [ContactDto] })
  findAll(
    @Query() filter: FilterContactDto,
    @User() user: UserEntity,
  ): Promise<ContactDto[]> {
    return this.contactService.findAll({
      ...filter,
      clientId: user.client.id,
    });
  }

  @Get(':id')
  @ApiOkResponse({ type: ContactDto })
  findOne(@Param('id') id: string): Promise<ContactDto> {
    return this.contactService.findOne(+id);
  }

  @Patch(':id')
  @ApiOkResponse({ type: CustomFieldDto })
  update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateContactDto,
  ): Promise<ContactDto> {
    return this.contactService.update(+id, updateUserDto);
  }

  @Delete(':id')
  @ApiOkResponse({ type: 'boolean' })
  remove(@Param('id') id: string): Promise<boolean> {
    return this.contactService.remove(+id);
  }
}
