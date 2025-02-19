import { Field, Float, Int, ObjectType } from "@nestjs/graphql";
import { OrderRepairty } from "src/main/rmg/orderRepair/entities/orderRepair.entity";
import { CrudEntity } from "src/patterns/crud-pattern/entities/crud-entity";
import { Column, Entity, Index, ManyToOne } from "typeorm";
import { Cotizacion } from "./cotizacion.entity";
import { RepairType } from "src/main/rmg/repairType/entities/repairType";

@Entity({ name: 'com_cotizacion_service' })
@ObjectType()
export class CotizacionServiceE extends CrudEntity { 
    @Column()
    @Field(() => Int)
    quantity: number;

    @Column({ type: 'float' })
    @Field(() => Float)
    unitPrice: number;

    @Column({ type: 'float' })
    @Field(() => Float)
    subtotal: number;

    @Column({ type: 'float', nullable: true })
    @Field(() => Float, { nullable: true })
    discount?: number;

    @Column({ type: 'float', nullable: true })
    @Field(() => Float, { nullable: true })
    tax?: number;

    @Column({ type: 'float' })
    @Field(() => Float)
    total: number;

    @ManyToOne(() => RepairType, undefined, { lazy: true })
    @Field(() => RepairType)
    service: RepairType;

    @ManyToOne(() => Cotizacion, (cotizacion) => cotizacion.cotizacionService, { lazy: true })
    @Field(() => Cotizacion)
    cotizacion: Cotizacion;
}