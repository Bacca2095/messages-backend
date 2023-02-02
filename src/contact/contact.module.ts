import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ContactController } from './controllers/contact.controller';
import { ContactCustomFieldEntity } from './entities/contact-custom-fields.entity';
import { ContactEntity } from './entities/contact.entity';
import { ContactMapperProfile } from './mapper/contact-mapper.profile';
import { ContactService } from './services/contact.service';
import { ClientModule } from '../client/client.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ContactEntity, ContactCustomFieldEntity]),
    ClientModule,
  ],
  controllers: [ContactController],
  providers: [ContactService, ContactMapperProfile],
})
export class ContactModule {}
