import { registerEnumType } from "@nestjs/graphql";

export enum StatusInvoice {
    PAGADA = 'PAGADA',
    ELABORADA = 'ELABORADA',
    VENCIDA = 'VENCIDA',
    ANULADA = 'ANULADA'
}

registerEnumType(StatusInvoice,{name:'StatusInvoice'})

export enum paymentMethodEnum {
    TRANSFERENCIA = 'TRANSFERENCIA',
    EFECTIVO = 'EFECTIVO',
    TARJETA = 'TARJETA'
}

registerEnumType(paymentMethodEnum,{name:'paymentMethodEnum'})