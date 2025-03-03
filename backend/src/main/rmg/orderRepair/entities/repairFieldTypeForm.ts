import { ObjectType, Field, Float } from '@nestjs/graphql';
import { Column, Entity, ManyToOne, OneToMany } from 'typeorm';
import { CrudEntity } from 'src/patterns/crud-pattern/entities/crud-entity';
import { OrderRepairty } from './orderRepair.entity';
import { FieldTypeEnum } from '../../repairType/emun/FieldTypeEnum';


@Entity({ name: 'cyt_repair_field_form' })
@ObjectType()
export class RepairFieldForm extends CrudEntity {
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
  
  // @OneToMany(() => SelectorOption, (selectorOption) => selectorOption.repairField, { cascade: true })
  // @Field(() => [SelectorOption], { nullable: true })
  // selectorOptions: SelectorOption[];  // Relación con las opciones del selector

  @ManyToOne(() => OrderRepairty, (repairType) => repairType.repairFieldForm, { onDelete: 'CASCADE', lazy: true  })
  @Field(() => OrderRepairty)
  orderRepairty: OrderRepairty;
}
