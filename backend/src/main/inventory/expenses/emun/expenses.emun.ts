import { registerEnumType } from "@nestjs/graphql";

export enum StatusExpenses {
    PAGADA = 'PAGADA',
    CANCELADA = 'CANCELADA',
    PENDIENTE = 'PENDIENTE'
}

registerEnumType(StatusExpenses,{name:'StatusExpenses'})