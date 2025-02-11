import { ObjectType, Field, Float, Int } from '@nestjs/graphql';
import { CrudEntity } from 'src/patterns/crud-pattern/entities/crud-entity';
import { Column, Entity, Index, ManyToOne } from 'typeorm';
// import { Company } from '../../company/entities/company.entity';
import { User } from 'src/security/users/entities/user.entity';
import { StatusExpenses } from '../emun/expenses.emun';
import { CategoryExpenses } from '../../CategoryExpenses/entities/CategoryExpenses.entity';

@Entity({ name: 'com_expenses' })
@ObjectType()
export class Expense extends CrudEntity {
  @Column()
  @Index()
  @Field(() => String)
  invoiceNumber: string;  
  
  @Column()
  @Field(() => String)
  description: string; // Descripción del gasto

  @Column()
  @Field(() => Float)
  amount: number; // Monto del gasto

  @Column()
  @Field(() => Date)
  expenseDate: Date; // Fecha en que se incurrió el gasto

  
  @ManyToOne(() => CategoryExpenses, (categoryExpenses) => undefined, { lazy: true })
  @Field(() => CategoryExpenses)
  category: CategoryExpenses; // Categoría del gasto (por ejemplo, 'Alquiler', 'Comida', 'Transporte')

  @Column({ default: false })
  @Field(() => Boolean)
  isRecurring: boolean; // Indica si el gasto es recurrente o no

  @Column({ nullable: true })
  @Field(() => Date, { nullable: true })
  nextDueDate?: Date; // Fecha de vencimiento del próximo pago (si es recurrente)

  @Column()
  @Field(() => String)
  paymentMethod: string; // Método de pago (por ejemplo, 'Tarjeta de Crédito', 'Efectivo')

  @Column({ nullable: true })
  @Field(() => String, { nullable: true })
  referenceNumber?: string; // Número de referencia de la transacción (si aplica)

  @Column()
  @Field(() => StatusExpenses)
  status: StatusExpenses;

  // @ManyToOne(() => Company, (company) => undefined, { lazy: true })
  // @Field(() => Company)
  // company: Company; // Relación con la entidad de la compañía

  @ManyToOne(() => User, (user) => undefined, { lazy: true })
  @Field(() => User)
  createdBy: User; // Usuario que creó el registro del gasto
  
  @ManyToOne(() => User, (user) => undefined, { lazy: true, nullable: true })
  @Field(() => User, {nullable: true})
  autorizoBy: User; // Usuario que autorizo el registro del gasto

  @ManyToOne(() => User, (user) => undefined, { lazy: true, nullable: true  })
  @Field(() => User, {nullable: true})
  canceldBy: User; 
}
