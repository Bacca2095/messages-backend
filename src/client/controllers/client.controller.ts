import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { ApiCreatedResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';

import { ClientDto, CreateClientDto, UpdateClientDto } from '../dto';
import { ClientService } from '../services/client.service';

@ApiTags('Clients')
@Controller('client')
export class ClientController {
  constructor(private readonly clientService: ClientService) {}

  @Post()
  @ApiCreatedResponse({ type: ClientDto })
  create(@Body() createClientDto: CreateClientDto): Promise<ClientDto> {
    return this.clientService.create(createClientDto);
  }

  @Get()
  @ApiOkResponse({ type: [ClientDto] })
  findAll(): Promise<ClientDto[]> {
    return this.clientService.findAll();
  }

  @Get(':id')
  @ApiOkResponse({ type: ClientDto })
  findOne(@Param('id') id: number): Promise<ClientDto> {
    return this.clientService.findOne(+id);
  }

  @Patch(':id')
  @ApiOkResponse({ type: ClientDto })
  update(
    @Param('id') id: number,
    @Body() updateClientDto: UpdateClientDto,
  ): Promise<ClientDto> {
    return this.clientService.update(+id, updateClientDto);
  }

  @Delete(':id')
  @ApiOkResponse({ type: 'boolean' })
  remove(@Param('id') id: number): Promise<boolean> {
    return this.clientService.remove(+id);
  }
}
