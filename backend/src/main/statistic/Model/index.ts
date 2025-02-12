import { ObjectType, Field, Float } from '@nestjs/graphql';

@ObjectType()
export class MonthlySalesModel {
  @Field(() => String)
  month: string;

  @Field(() => Float)
  totalSales: number;
}


@ObjectType()
export class BalanceResponse {
  @Field()
  id: string; // o UUID dependiendo de cómo manejes el tipo de dato en la BD

  @Field()
  total_entrada: number;

  @Field()
  total_entrada_efectivo: number;

  @Field()
  total_entrada_transferencia: number;

  @Field()
  total_salida: number;

  @Field()
  total_salida_efectivo: number;

  @Field()
  total_salida_transferencia: number;

  @Field()
  total_vendido_producto: number;

  @Field()
  total_vendido_producto_efectivo: number;

  @Field()
  total_vendido_producto_transferencia: number;

  @Field()
  total_vendido_cita: number;

  @Field()
  total_vendido_cita_efectivo: number;

  @Field()
  total_vendido_cita_transferencia: number;

  @Field()
  total_gasto: number;

  @Field()
  total_gasto_efectivo: number;

  @Field()
  total_gasto_transferencia: number;

  @Field()
  total_recuado: number;

  @Field()
  total_saldo_anterior: number;

  @Field()
  total_saldo_anterior_efectivo: number;

  @Field()
  total_saldo_anterior_transferencia: number;

  @Field()
  saldo: number;

  @Field()
  saldo_efectivo: number;

  @Field()
  saldo_transferencia: number;
}



@ObjectType()
export class FacturadoPorTrabajador {
  @Field(() => String)
  worker_id: string;

  @Field(() => String)
  company_id: string;

  @Field(() => String)
  nombre: string;

  @Field(() => String)
  apellido: string;

  @Field(() => Float)
  total_facturado: number;

  @Field(() => Float)
  commission_percentage: number;
}

@ObjectType()
export class TopProductosVendidos {
  @Field(() => String)
  product_id: string;

  @Field(() => String)
  company_id: string;

  @Field(() => String)
  nombre_producto: string;

  @Field(() => Float)
  sale_price: number;

  @Field(() => Float)
  cost_price: number;

  @Field(() => Float)
  diferencia: number;

  @Field(() => Float)
  quantity: number;

  @Field(() => Float)
  total_vendido_producto: number;
}

@ObjectType()
export class StockProductsFilterDay {
  @Field(() => String)
  id : string;

  @Field(() => String)
  company_id: string;

  @Field(() => Float)
  entrada_producto: number;

  @Field(() => Float)
  salida_producto: number;

  @Field(() => Float)
  stock : number;
}
@ObjectType()
export class OrderRepair {
  @Field()
  status: string;

  @Field()
  total_por_estado: number;
}
@ObjectType()
export class SumGastos {
  @Field()
  total: number;

  @Field()
  day: number;

  @Field()
  month: number;

  @Field()
  year: number;
}

@ObjectType()
export class Balance {
  @Field()
  total_vendido_producto: number;

  @Field()
  total_vendido_servicio: number;

  @Field()
  total_gasto: number;

  @Field()
  total_recaudado: number;

  @Field()
  saldo: number;
}
