import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { CustomFieldController } from './controllers/custom-field.controller';
import { CustomFieldEntity } from './entities/custom-field.entity';
import { CustomFieldMapperProfile } from './mapper/custom-field-mapper.profile';
import { CustomFieldService } from './services/custom-field.service';

@Module({
  imports: [TypeOrmModule.forFeature([CustomFieldEntity])],
  controllers: [CustomFieldController],
  providers: [CustomFieldService, CustomFieldMapperProfile],
  exports: [CustomFieldService, TypeOrmModule],
})
export class CustomFieldModule {}
