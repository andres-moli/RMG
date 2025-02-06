import { ObjectType, Field } from '@nestjs/graphql';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { CrudEntity } from 'src/patterns/crud-pattern/entities/crud-entity';
import { Client } from '../../client/entities/client.entity';
import { RepairType } from '../../repairType/entities/repairType';
import { CustomFieldValue } from '../../customFieldValue/entities/customFieldValue';
import { OrderStatusEnum } from '../enum/emunOrderRepair';
import { RepairFieldForm } from './repairFieldTypeForm';
import { Invoice } from 'src/main/inventory/invoice/entities/invoice.entity';


@Entity({ name: 'cyt_order_repair' })
@ObjectType()
export class OrderRepairty extends CrudEntity {

  @Column({default: OrderStatusEnum.PENDING })
  @Field(() => OrderStatusEnum)
  status: OrderStatusEnum;

  @Column({ type: 'timestamp', nullable: true })
  @Field(() => Date, { nullable: true })
  deliveryDate?: Date;

  @ManyToOne(() => Client, { lazy: true })
  @Field(() => Client)
  client: Client;

  @ManyToOne(() => RepairType, { lazy: true })
  @Field(() => RepairType)
  repairType: RepairType;

  @ManyToOne(() => Invoice, (invoice) => undefined, {lazy: true, nullable: true })
  @Field(() => Invoice,{nullable: true})
  invoice?: Invoice;

  @OneToMany(() => CustomFieldValue, (customFieldValue) => customFieldValue.orderRepair, { cascade: true,  lazy: true  })
  @Field(() => [CustomFieldValue], { nullable: true })
  fieldValues?: CustomFieldValue[];

  @OneToMany(() => RepairFieldForm, (repairFieldForm) => repairFieldForm.orderRepairty, { cascade: true,  lazy: true  })
  @Field(() => [RepairFieldForm], { nullable: true })
  repairFieldForm?: RepairFieldForm[];
}
