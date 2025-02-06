// src/repair-status/entities/repair-status.entity.ts

import { Field, Float, ObjectType } from '@nestjs/graphql';
import { Entity, ViewEntity, ViewColumn } from 'typeorm';

@Entity()
@ViewEntity({
  name: 'V_repair_status',  // Nombre de la vista en la base de datos
})
@ObjectType()
export class RepairStatusView {
  @ViewColumn()
  @Field(() => Float)
  total: number;

  @ViewColumn()
  @Field(() => Float)
  total_pendiente: number;

  @ViewColumn()
  @Field(() => Float)
  total_completa: number;

  @ViewColumn()
  @Field(() => Float)
  total_cancelada: number;
}
