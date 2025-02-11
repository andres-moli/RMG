import { ObjectType, Field, Float } from '@nestjs/graphql';
import { Column, Entity, OneToMany } from 'typeorm';
import { CrudEntity } from 'src/patterns/crud-pattern/entities/crud-entity';
import { RepairField } from './repairFieldType';

@Entity({ name: 'cyt_repair_type' })
@ObjectType()
export class RepairType extends CrudEntity {
  @Column()
  @Field(() => String)
  name: string;

  @Column({ nullable: true, default: true })
  @Field(() => Boolean, { nullable: true })
  status: boolean
  @Column({ type: 'decimal', precision: 10, scale: 2, nullable: true })
  @Field(() => Float, { nullable: true })
  costEstimate?: number;

  @OneToMany(() => RepairField, (repairField) => repairField.repairType, { cascade: true, lazy: true })
  @Field(() => [RepairField], { nullable: true })
  fields?: RepairField[];
}
