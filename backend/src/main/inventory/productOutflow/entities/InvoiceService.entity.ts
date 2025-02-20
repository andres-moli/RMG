import { Entity, Column, ManyToOne, Index } from 'typeorm';
import { ObjectType, Field, Float, Int } from '@nestjs/graphql';
import { CrudEntity } from 'src/patterns/crud-pattern/entities/crud-entity';
import { Company } from 'src/main/company/entities/company.entity';
import { Products } from '../../products/entities/products.entity';
import { User } from 'src/security/users/entities/user.entity';
import { ProductOutflow } from './productOuflow.entity';
import { OrderRepairty } from 'src/main/rmg/orderRepair/entities/orderRepair.entity';
import { RepairType } from 'src/main/rmg/repairType/entities/repairType';

@Entity({ name: 'com_serviceInvoice' })
@ObjectType()
export class InvoiceService extends CrudEntity {

  @Column()
  @Field(() => Int)
  quantity: number;

  @Column({ type: 'float' })
  @Field(() => Float)
  unitPrice: number;

  @Column({ type: 'float' })
  @Field(() => Float)
  subtotal: number;

  @Column({ type: 'float', nullable: true })
  @Field(() => Float, { nullable: true })
  discount?: number;

  @Column({ type: 'float', nullable: true })
  @Field(() => Float, { nullable: true })
  tax?: number;

  @Column({ type: 'float' })
  @Field(() => Float)
  total: number;

  @ManyToOne(() => RepairType, undefined, { lazy: true })
  @Field(() => RepairType)
  service: RepairType;

  @ManyToOne(() => ProductOutflow, (productOutflow) => productOutflow.invoiceProducts, { lazy: true })
  @Field(() => ProductOutflow)
  productOutflow: ProductOutflow;
}

