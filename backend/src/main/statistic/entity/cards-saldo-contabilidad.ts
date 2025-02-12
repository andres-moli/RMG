import { ViewEntity, ViewColumn, SelectQueryBuilder } from 'typeorm';
import { ObjectType, Field, Int, Float, ID } from '@nestjs/graphql';

@ObjectType()  // Para GraphQL
@ViewEntity({
    name: 'v_estado_cuenta',
    expression: 
    `
 SELECT COALESCE(pv.total_vendido_producto, 0::double precision) AS total_vendido_producto,
    COALESCE(fc.total_vendido_servicio, 0::bigint) AS total_vendido_servicio,
    COALESCE(gt.total_gasto, 0::bigint) AS total_gasto,
    COALESCE(fc.total_vendido_servicio, 0::bigint)::double precision + COALESCE(pv.total_vendido_producto, 0::double precision) AS total_recaudado,
    COALESCE(pv.total_vendido_producto, 0::double precision) + COALESCE(fc.total_vendido_servicio, 0::bigint)::double precision - COALESCE(gt.total_gasto, 0::bigint)::double precision AS saldo
   FROM ( SELECT sum(fd.total) AS total_vendido_producto
           FROM "com_productOutFlow" f
             JOIN "com_productInvoice" fd ON f.id = fd."productOutflowId"
          WHERE f.status::text = 'PAGADA'::text) pv
     CROSS JOIN ( SELECT sum(f.total) AS total_vendido_servicio
           FROM ag_invoice f
          WHERE f.status::text = 'PAGADA'::text) fc
     CROSS JOIN ( SELECT sum(f.amount) AS total_gasto
           FROM com_expenses f
          WHERE f.status::text = 'PAGADA'::text) gt;
    `
})
@ObjectType()
export class EstadoFinancieroView {

    @Field(() => Float)
    @ViewColumn()
    total_vendido_producto: number;

    @Field(() => Float)
    @ViewColumn()
    total_vendido_servicio: number;

    @Field(() => Float)
    @ViewColumn()
    total_gasto: number;

    @Field(() => Float)
    @ViewColumn()
    total_recaudado: number;

    @Field(() => Float)
    @ViewColumn()
    saldo: number;

}
