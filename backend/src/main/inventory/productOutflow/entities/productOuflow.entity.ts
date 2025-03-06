import { Entity, Column, ManyToOne, Index, OneToMany } from 'typeorm';
import { ObjectType, Field, Float, Int } from '@nestjs/graphql';
import { CrudEntity } from 'src/patterns/crud-pattern/entities/crud-entity';
import { Company } from 'src/main/company/entities/company.entity';
import { Products } from '../../products/entities/products.entity';
import { User } from 'src/security/users/entities/user.entity';
import { InvoiceProduct } from './InvoiceProduct.entity';
import { StatusInvoice, paymentMethodEnum} from '../../invoice/emun/invoice.emun';
import { Client } from 'src/main/rmg/client/entities/client.entity';
import { InvoiceService } from './InvoiceService.entity';
@Entity({ name: 'com_productOutFlow' })
@ObjectType()
export class ProductOutflow extends CrudEntity {

  @Column()
  @Index()
  @Field(() => String)
  invoiceNumber: string;  
  @Column()
  @Field(() => Date)
  inflowDate: Date;

  @Column({default: false, nullable: true})
  @Field(() => Boolean, {nullable: true})
  manually?: boolean;
  @Column({ nullable: true })
  @Field(() => String, { nullable: true })
  description?: string;  // Notas adicionales sobre la entrada de productos
  @Column()
  @Field(() => paymentMethodEnum)
  paymentMethod: paymentMethodEnum;

  @Column()
  @Field(() => StatusInvoice)
  status: StatusInvoice;  // Estado de la factura
  // @ManyToOne(() => Company, undefined, { lazy: true })
  // @Field(() => Company)
  // company: Company;

  @ManyToOne(() => Client, undefined, { lazy: true })
  @Field(() => Client)
  client: Client;

  @OneToMany(() => InvoiceProduct, (invoiceProduct) => invoiceProduct.productOutflow, { lazy: true })
  @Field(() => [InvoiceProduct])
  invoiceProducts: InvoiceProduct[];

  @OneToMany(() => InvoiceService, (invoiceService) => invoiceService.productOutflow, { lazy: true })
  @Field(() => [InvoiceService])
  invoiceServices: InvoiceService[];
}
