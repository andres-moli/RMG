import { ObjectType, Field, Float } from '@nestjs/graphql';
import { FileInfo } from 'src/general/files/entities/file-info.entity';
import { CrudEntity } from 'src/patterns/crud-pattern/entities/crud-entity';
import { User } from 'src/security/users/entities/user.entity';
import { Column, Entity, Index, ManyToOne } from 'typeorm';

@Entity({ name:'com_company'})
@ObjectType()
export class Company extends CrudEntity {

  @Column()
  @Field(() => String)
  name: string;
  
  @Column({unique: true})
  @Field(() => String)
  nit: string;

  @Column({ nullable: true })
  @Field(() => String, { nullable: true })
  description?: string;

  @Column()
  @Field(() => String)
  address: string;

  @Column()
  @Field(() => String)
  phone: string;

  @Column()
  @Field(() => String)
  email: string;

  @Column({ nullable: true })
  @Field(() => String, { nullable: true })
  facebook?: string;
  
  @Column({ nullable: true })
  @Field(() => String, { nullable: true })
  instagram?: string;

  @ManyToOne(() => User, (worker) => undefined, {lazy: true })
  @Field(() => User)
  user: User;
  
  @ManyToOne( () => FileInfo, (file) => file.id ,{ lazy: true, nullable: true })  
  @Field(() => FileInfo, {nullable: true})
  file?: FileInfo;

}

