import { BeforeInsert, Column, Entity, Index, ManyToOne, Repository } from 'typeorm';
import { CrudEntity } from 'src/patterns/crud-pattern/entities/crud-entity';
import { ObjectType, Field, Float } from '@nestjs/graphql';
import { InjectRepository } from '@nestjs/typeorm';
import { Company } from 'src/main/company/entities/company.entity';
import { User } from 'src/security/users/entities/user.entity';
import { paymentMethodEnum, StatusInvoice } from '../emun/invoice.emun';
import { FileInfo } from 'src/general/files/entities/file-info.entity';
import { OrderRepairty } from 'src/main/rmg/orderRepair/entities/orderRepair.entity';
import { Client } from 'src/main/rmg/client/entities/client.entity';

@Entity({ name: 'ag_invoice' })
@ObjectType()
export class Invoice extends CrudEntity {
  
  @Column()
  @Index()
  @Field(() => String)
  invoiceNumber: string;  // Número de factura único

  @Column()
  @Field(() => Date)
  issueDate: Date;  // Fecha de emisión de la factura

  @Column({nullable: true })
  @Field(() => Date, { nullable: true })
  dueDate?: Date;  // Fecha de vencimiento del pago

  @ManyToOne(() => Client, (cliente) => undefined, {lazy: true})
  @Field(() => Client)
  cliente: Client;  // Cliente al que se le emite la factura
  @ManyToOne(() => User, (cliente) => undefined, {lazy: true})
  @Field(() => User)
  user: User;  // usuario que genero la factura
  // @ManyToOne(() => Company, (empresa) => undefined, {lazy: true})
  // @Field(() => Company)
  // company: Company;  // Empresa emisora de la factura

  @ManyToOne(() => OrderRepairty, (cita) => undefined, {lazy: true})
  @Field(() => OrderRepairty)
  orrderReapirty: OrderRepairty;

  @Column({ nullable: true})
  @Field(() => Float,{ nullable: true})
  subtotal?: number;  // Subtotal antes de impuestos

  @Column({ nullable: true})
  @Field(() => Float,{ nullable: true})
  tax?: number;  // Monto total de impuestos aplicados (IVA, etc.)

  @Column({ nullable: true})
  @Field(() => Float,{ nullable: true})
  total?: number;  // Monto total de la factura (subtotal + impuestos)

  @Column({ nullable: true })
  @Field(() => Float, { nullable: true })
  discount?: number;  // Descuento aplicado, si corresponde

  @Column()
  @Field(() => StatusInvoice)
  status: StatusInvoice;  // Estado de la factura

  @Column({ nullable: true })
  @Field(() => paymentMethodEnum, { nullable: true })
  paymentMethod?: paymentMethodEnum;  // Método de pago (tarjeta, transferencia, efectivo)

  @Column({ nullable: true })
  @Field(() => String, { nullable: true })
  paymentReference?: string;  // Referencia o número de transacción del pago

  @Column({ nullable: true })
  @Field(() => String, { nullable: true })
  description?: string; 

}
