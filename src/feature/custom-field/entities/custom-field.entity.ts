import { AutoMap } from '@automapper/classes';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinTable,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import { ClientEntity } from '@client/entities/client.entity';
import { ContactCustomFieldEntity } from '@contact/entities/contact-custom-fields.entity';
import { InputType } from '@custom-fields/enums/input-type.enum';

@Entity('custom_field')
export class CustomFieldEntity {
  @AutoMap()
  @PrimaryGeneratedColumn()
  id: number;

  @AutoMap()
  @Column()
  name: string;

  @AutoMap()
  @Column()
  description: string;

  @AutoMap()
  @Column({ type: 'enum', enum: InputType, enumName: 'InputType' })
  inputType: InputType;

  @AutoMap()
  @ManyToOne(() => ClientEntity, (client) => client.customFields, {
    onDelete: 'CASCADE',
  })
  @JoinTable()
  client: ClientEntity;

  @AutoMap()
  @OneToMany(
    () => ContactCustomFieldEntity,
    (contactCustomField) => contactCustomField.contact,
  )
  contacts: ContactCustomFieldEntity[];

  @AutoMap()
  @CreateDateColumn()
  createdAt: Date;

  @AutoMap()
  @UpdateDateColumn()
  updatedAt: Date;

  @AutoMap()
  @DeleteDateColumn()
  deletedAt: Date;
}
