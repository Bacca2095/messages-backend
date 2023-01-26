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

import { CreateUserDto, FilterUserDto, UpdateUserDto, UserDto } from '../dto';
import { UserEntity } from '../entities/user.entity';
import { UserService } from '../services/user.service';

@ApiTags('Users')
@UseGuards(JwtGuard)
@ApiBearerAuth('jwt')
@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @ApiCreatedResponse({ type: UserDto })
  create(
    @Body() createUserDto: CreateUserDto,
    @User() user: UserEntity,
  ): Promise<UserDto> {
    return this.userService.create({
      ...createUserDto,
      clientId: user.client.id,
    });
  }

  @Get()
  @ApiOkResponse({ type: [UserDto] })
  findAll(
    @Query() filter: FilterUserDto,
    @User() user: UserEntity,
  ): Promise<UserDto[]> {
    return this.userService.findAll({ ...filter, clientId: user.client.id });
  }

  @Get(':id')
  @ApiOkResponse({ type: UserDto })
  findOne(@Param('id') id: string): Promise<UserDto> {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  @ApiOkResponse({ type: UserDto })
  update(
    @Param('id') id: string,
    @Body() updateUserDto: UpdateUserDto,
  ): Promise<UserDto> {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  @ApiOkResponse({ type: 'boolean' })
  remove(@Param('id') id: string): Promise<boolean> {
    return this.userService.remove(+id);
  }
}
