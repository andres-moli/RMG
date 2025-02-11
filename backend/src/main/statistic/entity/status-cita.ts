import { ViewEntity, ViewColumn, SelectQueryBuilder } from 'typeorm';
import { ObjectType, Field, Int, Float } from '@nestjs/graphql';

@ObjectType()  // Para GraphQL
@ViewEntity({
    name: 'total_appointments_by_status_per_company',
    expression: `
    SELECT
	"companyId",
    COUNT(CASE WHEN status = 'PROGRAMADA' THEN 1 END) AS total_programadas,
    COUNT(CASE WHEN status = 'CANCELADA' THEN 1 END) AS total_canceladas,
    COUNT(CASE WHEN status = 'REALIZADA' THEN 1 END) AS total_realizadas,
    COUNT(CASE WHEN status = 'REPROGRAMADA' THEN 1 END) AS total_reprogramadas,
    COUNT(CASE WHEN status = 'PENDIENTE' THEN 1 END) AS total_pendientes,
    COUNT(CASE WHEN status = 'EN PROCESO' THEN 1 END) AS total_en_proceso
FROM
    ag_cita
GROUP BY
	"companyId"
    `
})
export class TotalAppointmentsByStatusPerCompany {
    @Field(() => String)
    @ViewColumn({ name: 'companyId' })
    companyId: string;

    @Field(() => Float)
    @ViewColumn()
    total_programadas: number;

    @Field(() => Float)
    @ViewColumn()
    total_canceladas: number;

    @Field(() => Float)
    @ViewColumn()
    total_reprogramadas: number;

    @Field(() => Float)
    @ViewColumn()
    total_en_proceso: number;

    @Field(() => Float)
    @ViewColumn()
    total_realizadas: number;
    @Field(() => Float)
    @ViewColumn()
    total_pendientes: number;
    

}
