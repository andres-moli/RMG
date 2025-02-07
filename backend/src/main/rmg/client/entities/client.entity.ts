import { ObjectType, Field, Float } from '@nestjs/graphql';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { CrudEntity } from 'src/patterns/crud-pattern/entities/crud-entity';
import { City } from 'src/general/city/entities/city.entity';
import { Department } from 'src/general/department/entities/departament.entity';
import { Country } from 'src/general/country/entities/country.entity';
import { User } from 'src/security/users/entities/user.entity';
import { TypeClientEnum } from '../emun/client.enum';
import { UserDocumentTypes } from 'src/common/enum/document-type.enum';

@Entity({ name:'cyt_client'})
@ObjectType()
export class Client extends CrudEntity {

  @Column()
  @Field(() => String)
  name:string;

  @Column({ nullable: true })
  @Field(() => UserDocumentTypes, { nullable: true })
  identificationType: UserDocumentTypes;
  
  @Column({ nullable: true })
  @Field(() => String, { nullable: true })
  lastName:string;
  
  @Column()
  @Field(() => String)
  numberDocument:string;

  @Column({nullable: true})
  @Field(() => String, {nullable: true})
  email?:string;

  @Column({nullable: true})
  @Field(() => String, {nullable: true})
  address?:string;

  @Column()
  @Field(() => String)
  celular:string;

}
