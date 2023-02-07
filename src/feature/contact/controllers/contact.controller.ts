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

import { User } from '@auth/decorators/user.decorator';
import { JwtGuard } from '@auth/guards/jwt.guard';
import { ContactDto } from '@contact/dto/contact.dto';
import { CreateContactDto } from '@contact/dto/create-contact.dto';
import { FilterContactDto } from '@contact/dto/filter-contact.dto';
import { UpdateContactDto } from '@contact/dto/update-contact.dto';
import { ContactService } from '@contact/services/contact.service';
import { CustomFieldDto } from '@custom-fields/dto/custom-field.dto';
import { UserEntity } from '@user/entities/user.entity';

@ApiTags('Contacts')
@UseGuards(JwtGuard)
@ApiBearerAuth('jwt')
@Controller('contacts')
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
