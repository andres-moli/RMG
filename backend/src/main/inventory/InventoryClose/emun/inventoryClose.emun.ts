import { registerEnumType } from "@nestjs/graphql";

export enum InventoryCloseEmun {
    REALIZADO = 'REALIZADO',
    CANCELADO = 'CANCELADO'
}

registerEnumType(InventoryCloseEmun,{name:'InventoryCloseEmun'})