import { ObjectType, Field, Float } from '@nestjs/graphql';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { CrudEntity } from 'src/patterns/crud-pattern/entities/crud-entity';
import { FieldTypeEnum } from '../emun/FieldTypeEnum';
import { RepairType } from './repairType';
import { SelectorOption } from './SelectorOption';

@Entity({ name: 'cyt_repair_field' })
@ObjectType()
export class RepairField extends CrudEntity {
  @Column()
  @Field(() => String)
  name: string;

  @Column()
  @Field(() => FieldTypeEnum)
  type: FieldTypeEnum;

  @Column({ default: false })
  @Field(() => Boolean)
  isRequired: boolean;

  @Column({ nullable: true })
  @Field(() => Float, { nullable: true })
  minLength?: number;

  @Column({ nullable: true })
  @Field(() => Float, { nullable: true })
  maxLength?: number;

  @OneToMany(() => SelectorOption, (selectorOption) => selectorOption.repairField, { cascade: true, lazy: true })
  @Field(() => [SelectorOption], { nullable: true })
  selectorOptions: SelectorOption[];  // Relación con las opciones del selector

  @ManyToOne(() => RepairType, (repairType) => repairType.fields, { onDelete: 'CASCADE', lazy: true  })
  @Field(() => RepairType)
  repairType: RepairType;
}
