import { Field, Float, Int, ObjectType } from "@nestjs/graphql";
import { CrudEntity } from "src/patterns/crud-pattern/entities/crud-entity";
import { Column, Entity, Index, ManyToOne } from "typeorm";
import { Cotizacion } from "./cotizacion.entity";
import { Products } from "../../products/entities/products.entity";

@Entity({ name: 'com_cotizacion_product' })
@ObjectType()
export class CotizacionProduct extends CrudEntity { 
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

    @ManyToOne(() => Products, undefined, { lazy: true })
    @Field(() => Products)
    product: Products;

    @ManyToOne(() => Cotizacion, (cotizacion) => cotizacion.cotizacionService, { lazy: true })
    @Field(() => Cotizacion)
    cotizacion: Cotizacion;
}