import { ObjectType, Field, Int } from '@nestjs/graphql';
import { CrudEntity } from 'src/patterns/crud-pattern/entities/crud-entity';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
// import { Company } from '../../company/entities/company.entity';
import { StatusCategoryExpenses } from '../emun/expenses.emun';

@Entity({ name: 'com_expense_categories' })
@ObjectType()
export class CategoryExpenses extends CrudEntity {
  @Column()
  @Field(() => String)
  name: string; // Nombre de la categoría (ej. 'Alquiler', 'Comida', 'Transporte')

  @Column({ nullable: true })
  @Field(() => String, { nullable: true })
  description?: string; // Descripción de la categoría (opcional)

  // @ManyToOne(() => Company, (company) => undefined, { lazy: true })
  // @Field(() => Company)
  // company: Company; // Relación con la entidad de la compañía

  @Column({default: false })
  @Field(() => Boolean)
  isDefualtCategory: boolean;

  @Column()
  @Field(() => StatusCategoryExpenses)
  status: StatusCategoryExpenses; // Descripción de la categoría (opcional)
}
