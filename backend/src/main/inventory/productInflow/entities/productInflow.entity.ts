import { Entity, Column, ManyToOne, Index } from 'typeorm';
import { ObjectType, Field, Float, Int } from '@nestjs/graphql';
import { CrudEntity } from 'src/patterns/crud-pattern/entities/crud-entity';
import { Company } from 'src/main/company/entities/company.entity';
import { Products } from '../../products/entities/products.entity';
import { User } from 'src/security/users/entities/user.entity';
import { ProductInflowEmun } from '../emun/productInflow.emun';

@Entity({ name: 'com_productInflows' })
@ObjectType()
export class ProductInflow extends CrudEntity {

  @Column()
  @Field(() => Int)
  quantity: number;

  @Column()
  @Field(() => Date)
  inflowDate: Date;

  @Column({ nullable: true })
  @Field(() => String, { nullable: true })
  description?: string;  // Notas adicionales sobre la entrada de productos

  @Column({default: ProductInflowEmun.REALIZADO})
  @Field(() => ProductInflowEmun)
  status: ProductInflowEmun

  @ManyToOne(() => Products, undefined, { lazy: true })
  @Field(() => Products)
  product: Products;

  // @ManyToOne(() => Company, undefined, { lazy: true })
  // @Field(() => Company)
  // company: Company;

  @ManyToOne(() => User, undefined, { lazy: true })
  @Field(() => User)
  user: User;
}
