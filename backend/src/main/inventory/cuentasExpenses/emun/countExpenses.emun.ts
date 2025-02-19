import { registerEnumType } from "@nestjs/graphql";

export enum StatusCountExpenses {
    ACTIVO = 'ACTIVO',
    INACTIVO = 'INACTIVO',
    CERRADA = 'CERRADA'
}

registerEnumType(StatusCountExpenses,{name:'StatusCountExpenses'})