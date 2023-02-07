import { AutoMap } from '@automapper/classes';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

import { ContactEntity } from './contact.entity';
import { CustomFieldEntity } from '../../custom-field/entities/custom-field.entity';

@Entity('contact_custom_field')
export class ContactCustomFieldEntity {
  @AutoMap()
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => ContactEntity, (contact) => contact.customFields)
  contact: ContactEntity;

  @ManyToOne(() => CustomFieldEntity, (customField) => customField.contacts)
  customField: CustomFieldEntity;

  @Column()
  value: string;
}
