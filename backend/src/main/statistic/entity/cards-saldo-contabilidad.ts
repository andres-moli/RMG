import { ViewEntity, ViewColumn, SelectQueryBuilder } from 'typeorm';
import { ObjectType, Field, Int, Float, ID } from '@nestjs/graphql';

@ObjectType()  // Para GraphQL
@ViewEntity({
    name: 'estado_financiero_view',
    expression: 
    `
    SELECT
        c.id as id,
        COALESCE(pv.total_vendido_producto,0) as total_vendido_producto,
        COALESCE(fc.total_vendido_cita,0) as total_vendido_cita,
        COALESCE(gt.total_gasto,0) as total_gasto,
        COALESCE(fc.total_vendido_cita,0) + COALESCE(pv.total_vendido_producto,0) as total_recuado,
        COALESCE(pv.total_vendido_producto,0) + COALESCE(fc.total_vendido_cita,0) - COALESCE(gt.total_gasto,0) AS saldo
    FROM
        com_company as c
    LEFT JOIN
    (
        SELECT
            f."companyId"
            ,SUM(fd.total) as total_vendido_producto
        FROM 
            "com_productOutFlow" as f
        INNER JOIN
            "com_productInvoice" as fd
            ON f.id = fd."productOutflowId"
        WHERE
            f.status = 'PAGADA'
        GROUP BY 
            f."companyId"
    ) as pv ON pv."companyId" = c.id
    LEFT JOIN
    (
        SELECT
            f."companyId"
            ,SUM(f.total) as total_vendido_cita
        FROM 
            "ag_invoice" as f
        WHERE
            f.status = 'PAGADA'
        GROUP BY 
            f."companyId"
    ) as fc ON fc."companyId" = c.id
    LEFT JOIN
    (
        SELECT
            f."companyId"
            ,SUM(f.amount) as total_gasto
        FROM 
            com_expenses as f
        WHERE 
            status = 'PAGADA'
        GROUP BY 
            f."companyId"
    ) as gt ON gt."companyId" = c.id
    `
})
@ObjectType()
export class EstadoFinancieroView {

    @Field(() => ID)
    @ViewColumn()
    id: string;

    @Field(() => Float)
    @ViewColumn()
    total_vendido_producto: number;

    @Field(() => Float)
    @ViewColumn()
    total_gasto: number;

    @Field(() => Float)
    @ViewColumn()
    saldo: number;

    @Field(() => Float)
    @ViewColumn()
    total_recuado: number;

    @Field(() => Float)
    @ViewColumn()
    total_vendido_cita: number;

}
