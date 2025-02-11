import { ObjectType, Field } from '@nestjs/graphql';
import { Column, Entity, ManyToOne } from 'typeorm';
import { CrudEntity } from 'src/patterns/crud-pattern/entities/crud-entity';
import { RepairField } from './repairFieldType';

@Entity({ name: 'cyt_selector_option' })
@ObjectType()
export class SelectorOption extends CrudEntity {
  @Column()
  @Field(() => String)
  value: string;  // El valor de la opción

  @ManyToOne(() => RepairField, (repairField) => repairField.selectorOptions , { onDelete: 'CASCADE', lazy: true })
  @Field(() => RepairField)
  repairField: RepairField;  // Relación con RepairField
}
