import { Field, Float, ObjectType } from '@nestjs/graphql';
import { Entity, ViewEntity, Column } from 'typeorm';

@ViewEntity({
    name: 'statistic_cards',
    expression: `
    SELECT
    inv."companyId",
    COALESCE(total_facturas, 0) AS total_facturas,
    COALESCE(total_clientes, 0) AS total_clientes,
	COALESCE(total_citas,0)     AS total_citas,
	COALESCE(total_pendiente,0) AS total_pendiente
FROM (
    -- Subconsulta para contar facturas
    SELECT
        "companyId",
        COUNT(*) AS total_facturas,
		SUM(total) as total_vendido
    FROM
        public.ag_invoice
    GROUP BY
        "companyId"
) AS inv
LEFT JOIN (
    -- Subconsulta para contar clientes
    SELECT
        "companyId",
        COUNT(id) AS total_clientes
    FROM
        public."com_userCompanyType"
    WHERE
        type = 'CLIENTE'
    GROUP BY
        "companyId"
) AS cli ON inv."companyId" = cli."companyId"
LEFT JOIN (
    -- Subconsulta para contar pendientes
    SELECT
        "companyId",
        SUM(total) AS total_pendiente
    FROM
      public.ag_invoice
    WHERE
        status = 'PENDIENTE'
    GROUP BY
        "companyId"
) AS pen ON inv."companyId" = pen."companyId"
LEFT JOIN (
    -- Subconsulta para contar cita
    SELECT
        "companyId",
        COUNT(id) AS total_citas
    FROM
        public."ag_cita"
    GROUP BY
        "companyId"
) AS cit ON inv."companyId" = cit."companyId"


    `,
})
@ObjectType()
export class StatisticCards {
    @Field(() => String)
    @Column()
    companyId: string;

    @Field(() => Float)
    @Column()
    total_facturas: number;

    @Field(() => Float)
    @Column()
    total_clientes: number;

    @Field(() => Float)
    @Column()
    total_citas: number;

    @Field(() => Float)
    @Column()
    total_pendiente: number;
}
