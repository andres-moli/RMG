import { registerEnumType } from "@nestjs/graphql";

export enum StatusCategoryExpenses {
    ACTIVO = 'ACTIVO',
    INACTIVO = 'INACTIVO'
}

registerEnumType(StatusCategoryExpenses,{name:'StatusCategoryExpenses'})