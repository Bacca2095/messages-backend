import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

import { ClientModule } from '@client/client.module';

import { ContactController } from './controllers/contact.controller';
import { ContactEntity } from './entities/contact.entity';
import { ContactMapperProfile } from './mapper/contact-mapper.profile';
import { ContactService } from './services/contact.service';

@Module({
  imports: [TypeOrmModule.forFeature([ContactEntity]), ClientModule],
  controllers: [ContactController],
  providers: [ContactService, ContactMapperProfile],
})
export class ContactModule {}
