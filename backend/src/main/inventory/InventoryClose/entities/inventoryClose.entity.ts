import { ObjectType, Field, Int, Float } from '@nestjs/graphql';
import { CrudEntity } from 'src/patterns/crud-pattern/entities/crud-entity';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { Company } from 'src/main/company/entities/company.entity';
import { InventoryCloseEmun } from '../emun/inventoryClose.emun';
import { User } from 'src/security/users/entities/user.entity';
import { InventoryCloseDetail } from './inventoryCloseDetail.entity';

@Entity({ name: 'com_inventory_close' })
@ObjectType()
export class InventoryClose extends CrudEntity {

  @Column()
  @Field(() => Date)
  date: Date; 

  @Column()
  @Field(() => String)
  description: string; 

  // @ManyToOne(() => Company, (company) => undefined, { lazy: true })
  // @Field(() => Company)
  // company: Company; 
    
  @ManyToOne(() => User, (user) => undefined, { lazy: true })
  @Field(() => User)
  user: User; 

  @Column()
  @Field(() => InventoryCloseEmun)
  status: InventoryCloseEmun;

  @OneToMany(() => InventoryCloseDetail, (invoiceProduct) => invoiceProduct.InventoryClose, { lazy: true })
  @Field(() => [InventoryCloseDetail])
  invoiceProducts: InventoryCloseDetail[];
  
}
