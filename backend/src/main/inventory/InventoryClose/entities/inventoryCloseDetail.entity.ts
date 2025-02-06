import { ObjectType, Field, Int, Float } from '@nestjs/graphql';
import { CrudEntity } from 'src/patterns/crud-pattern/entities/crud-entity';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { Company } from 'src/main/company/entities/company.entity';
import { InventoryCloseEmun } from '../emun/inventoryClose.emun';
import { User } from 'src/security/users/entities/user.entity';
import { Products } from '../../products/entities/products.entity';
import { InventoryClose } from './inventoryClose.entity';

@Entity({ name: 'com_inventory_close_detail' })
@ObjectType()
export class InventoryCloseDetail extends CrudEntity {
  @Column()
  @Field(() => Float)
  entryProduct: number; 

  @Column()
  @Field(() => Float)
  exitProduct: number; 

  @Column()
  @Field(() => Float)
  stock: number; 

  @ManyToOne(() => Company, (company) => undefined, { lazy: true })
  @Field(() => Company)
  company: Company; 
    
  @ManyToOne(() => Products, (product) => undefined, { lazy: true })
  @Field(() => Products)
  product: Products; 

  @ManyToOne(() => InventoryClose, (detail) => detail.invoiceProducts, { lazy: true })
  @Field(() => InventoryClose)
  InventoryClose: InventoryClose; 
  
}
