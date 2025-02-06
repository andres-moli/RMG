import { registerEnumType } from "@nestjs/graphql";

export enum ProductInflowEmun {
    REALIZADO = 'REALIZADO',
    CANCELADO = 'CANCELADO'
}

registerEnumType(ProductInflowEmun,{name:'ProductInflowEmun'})