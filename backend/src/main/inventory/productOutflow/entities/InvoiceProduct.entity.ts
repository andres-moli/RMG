import { Entity, Column, ManyToOne, Index } from 'typeorm';
import { ObjectType, Field, Float, Int } from '@nestjs/graphql';
import { CrudEntity } from 'src/patterns/crud-pattern/entities/crud-entity';
import { Company } from 'src/main/company/entities/company.entity';
import { Products } from '../../products/entities/products.entity';
import { User } from 'src/security/users/entities/user.entity';
import { ProductOutflow } from './productOuflow.entity';

@Entity({ name: 'com_productInvoice' })
@ObjectType()
export class InvoiceProduct extends CrudEntity {

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

  @ManyToOne(() => Products, undefined, { lazy: true })
  @Field(() => Products)
  product: Products;

  @ManyToOne(() => ProductOutflow, (productOutflow) => productOutflow.invoiceProducts, { lazy: true })
  @Field(() => ProductOutflow)
  productOutflow: ProductOutflow;
}

