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
import { CreateCustomFieldDto } from '@custom-fields/dto/create-custom-field.dto';
import { CustomFieldDto } from '@custom-fields/dto/custom-field.dto';
import { FilterCustomFieldDto } from '@custom-fields/dto/filter-custom-field.dto';
import { UpdateCustomFieldDto } from '@custom-fields/dto/update-custom-field.dto';
import { CustomFieldService } from '@custom-fields/services/custom-field.service';
import { UserEntity } from '@user/entities/user.entity';

@ApiTags('Custom fields')
@UseGuards(JwtGuard)
@ApiBearerAuth('jwt')
@Controller('custom-fields')
export class CustomFieldController {
  constructor(private readonly customFieldService: CustomFieldService) {}

  @Post()
  @ApiCreatedResponse({ type: CustomFieldDto })
  create(
    @Body() dto: CreateCustomFieldDto,
    @User() user: UserEntity,
  ): Promise<CustomFieldDto> {
    return this.customFieldService.create({
      ...dto,
      clientId: user.client.id,
    });
  }

  @Get()
  @ApiOkResponse({ type: [CustomFieldDto] })
  findAll(
    @Query() filter: FilterCustomFieldDto,
    @User() user: UserEntity,
  ): Promise<CustomFieldDto[]> {
    return this.customFieldService.findAll({
      ...filter,
      clientId: user.client.id,
    });
  }

  @Get(':id')
  @ApiOkResponse({ type: CustomFieldDto })
  findOne(@Param('id') id: string): Promise<CustomFieldDto> {
    return this.customFieldService.findOne(+id);
  }

  @Patch(':id')
  @ApiOkResponse({ type: CustomFieldDto })
  update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateCustomFieldDto,
  ): Promise<CustomFieldDto> {
    return this.customFieldService.update(+id, updateUserDto);
  }

  @Delete(':id')
  @ApiOkResponse({ type: 'boolean' })
  remove(@Param('id') id: string): Promise<boolean> {
    return this.customFieldService.remove(+id);
  }
}
