import { ViewEntity, ViewColumn, SelectQueryBuilder } from 'typeorm';
import { ObjectType, Field, Int, Float, ID } from '@nestjs/graphql';

@ObjectType()  // Para GraphQL
@ViewEntity({
    name: 'stok_products_view',
    expression: 
    `
SELECT
    p.id,
    p."name",
    p."isActive",
    p.description,
    p."salePrice",
    COALESCE(e.entrada_producto,0) as entrada_producto,
    COALESCE(s.salida_producto, 0) as salida_producto,
    COALESCE(e.entrada_producto,0) - COALESCE(s.salida_producto, 0) as stock
FROM
    "com_products" as p
LEFT JOIN
    (
        SELECT
            e."productId" as id,
            SUM(e.quantity) as entrada_producto
        FROM
            "com_productInflows" as e
        WHERE
            e.status = 'REALIZADO'
        GROUP BY 
            e."productId"
    ) as e
ON p.id = e.id
LEFT JOIN
    (
        SELECT
            fd."productId" as id,
            SUM(fd.quantity) as salida_producto
        FROM 
            "com_productOutFlow" as f
        INNER JOIN
            "com_productInvoice" as fd
            ON f.id = fd."productOutflowId"
        WHERE
            f.status = 'PAGADA'
        GROUP BY 
            fd."productId"
    ) as s
ON p.id = s.id
    `
})
@ObjectType()
export class StockProductView {


    @Field(() => ID)
    @ViewColumn()
    id: string;


    @Field(() => Float)
    @ViewColumn()
    entrada_producto: number;

    @Field(() => Float)
    @ViewColumn()
    salida_producto: number;

    @Field(() => Float)
    @ViewColumn()
    stock: number;

    @Field(() => String)
    @ViewColumn()
    name: string;

    
    @Field(() => Boolean)
    @ViewColumn()
    isActive: boolean;

    @Field(() => String)
    @ViewColumn()
    description

}
