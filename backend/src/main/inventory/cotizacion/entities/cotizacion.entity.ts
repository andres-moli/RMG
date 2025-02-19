import { Field, Float, ObjectType } from "@nestjs/graphql";
import { CrudEntity } from "src/patterns/crud-pattern/entities/crud-entity";
import { Column, Entity, Index, ManyToOne, OneToMany } from "typeorm";
import { CotizacionServiceE } from "./service-cotizacion.entity";
import { CotizacionProduct } from "./product-cotizacion.entity";
import { Client } from "src/main/rmg/client/entities/client.entity";
import { CotizacionStatusEmun } from "../emun/cotizacion.enum";

@Entity({ name: 'com_cotizacion' })
@ObjectType()
export class Cotizacion extends CrudEntity {
    @Column()
    @Index()
    @Field(() => String)
    invoiceNumber: string;  

    @Column({ nullable: true })
    @Field(() => String, { nullable: true })
    description?: string; 
    @Column()
    @Field(() => CotizacionStatusEmun)
    status: CotizacionStatusEmun

    @ManyToOne(() => Client, undefined, { lazy: true })
    @Field(() => Client)
    client: Client;

    @OneToMany(() => CotizacionServiceE, (cotizacionService) => cotizacionService.cotizacion, { lazy: true, nullable:true })
    @Field(() => [CotizacionServiceE], {nullable: true})
    cotizacionService?: CotizacionServiceE[];

    @OneToMany(() => CotizacionProduct, (cotizacionProduct) => cotizacionProduct.cotizacion, { lazy: true, nullable:true })
    @Field(() => [CotizacionProduct], {nullable: true})
    cotizacionProduct?: CotizacionProduct[]
    

}
