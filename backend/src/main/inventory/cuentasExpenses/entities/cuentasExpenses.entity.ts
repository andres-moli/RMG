import { ObjectType, Field, Int } from '@nestjs/graphql';
import { CrudEntity } from 'src/patterns/crud-pattern/entities/crud-entity';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
// import { Company } from '../../company/entities/company.entity';
import { StatusCountExpenses } from '../emun/countExpenses.emun';

@Entity({ name: 'com_expense_cuentas' })
@ObjectType()
export class CountExpenses extends CrudEntity {
  @Column()
  @Field(() => String)
  name: string; 

  @Column({ nullable: true })
  @Field(() => String, { nullable: true })
  description?: string; 

  @Column({nullable: true })
  @Field(() => String, { nullable: true })
  numberCount?: string; 

  @Column({nullable: true })
  @Field(() => String, { nullable: true })
  nameBank?: string; 

  @Column()
  @Field(() => StatusCountExpenses)
  status: StatusCountExpenses;
}
