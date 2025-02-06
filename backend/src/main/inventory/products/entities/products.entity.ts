import { ObjectType, Field, Float } from '@nestjs/graphql';
import { CrudEntity } from 'src/patterns/crud-pattern/entities/crud-entity';
import { User } from 'src/security/users/entities/user.entity';
import { Column, Entity, Index, ManyToOne } from 'typeorm';
import { Company } from 'src/main/company/entities/company.entity';
import { FileInfo } from 'src/general/files/entities/file-info.entity';

@Entity({ name:'com_products'})
@ObjectType()
export class Products extends CrudEntity {

  @Column()
  @Field(() => String)
  name: string;

  @Column({ nullable: true })
  @Field(() => String, { nullable: true })
  description?: string;

  @Column()
  @Field(() => Float)
  salePrice: number;

  @Column({nullable: true})
  @Field(() => Float, {nullable: true})
  minStock?: number;

  @Column({nullable: true})
  @Field(() => Float, {nullable: true})
  costPrice?: number;

  @Column({nullable: true })
  @Field(() => Float, { nullable: true })
  tax?: number;

  @Column({ nullable: true })
  @Field(() => String, { nullable: true })
  unitOfMeasure?: string; 

  @Column({default: true })
  @Field(() => Boolean)
  isActive: boolean;

  @Column({default: true })
  @Field(() => Boolean)
  isShowPublic: boolean;

  @Column({ nullable: true })
  @Field(() => Date, { nullable: true })
  expirationDate?: Date; 

  // @ManyToOne(() => Company, (company) => undefined, {lazy: true})
  // @Field(() => Company)
  // company: Company;
  @ManyToOne( () => FileInfo, (file) => file.id ,{ lazy: true, nullable: true })  
  @Field(() => FileInfo, {nullable: true})
  file?: FileInfo;

}

