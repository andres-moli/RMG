import { ObjectType, Field, Float } from '@nestjs/graphql';
import { Column, Entity, ManyToOne } from 'typeorm';
import { CrudEntity } from 'src/patterns/crud-pattern/entities/crud-entity';
import { OrderRepairty } from '../../orderRepair/entities/orderRepair.entity';
import { RepairField } from '../../repairType/entities/repairFieldType';
import { FileInfo } from 'src/general/files/entities/file-info.entity';

@Entity({ name: 'cyt_custom_field_value' })
@ObjectType()
export class CustomFieldValue extends CrudEntity {
  @ManyToOne(() => OrderRepairty, (orderRepair) => orderRepair.fieldValues, { onDelete: 'CASCADE', lazy: true })
  @Field(() => OrderRepairty)
  orderRepair: OrderRepairty;

  @ManyToOne(() => RepairField, { lazy: true })
  @Field(() => RepairField)
  field: RepairField;

  @Column({ type: 'text', nullable: true })
  @Field(() => String, { nullable: true })
  valorTexto?: string;

  @Column({ type: 'timestamp', nullable: true })
  @Field(() => Date, { nullable: true })
  valorFecha?: Date;

  @Column({ type: 'bigint', nullable: true })
  @Field(() => Float, { nullable: true })
  valorNumerico?: number;

  @Column({ type: 'text', nullable: true })
  @Field(() => String, { nullable: true })
  valorTextoLargo?: string;

  @ManyToOne(()=> FileInfo, {nullable: true, lazy: true})
  @Field(() => FileInfo, { nullable: true })
  valorFoto?: FileInfo;
}
