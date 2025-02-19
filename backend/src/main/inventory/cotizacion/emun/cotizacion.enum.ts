import { registerEnumType } from "@nestjs/graphql";

export enum CotizacionStatusEmun {
  PENDIENTE = "PENDIENTE", // Cotización pendiente
  REALIZADA = "REALIZADA", // Cotización pendiente
  APROBADA = "APROBADA", // Cotización aprobada
  RECHAZADA = "RECHAZADA", // Cotización rechazada
  CANCELADA = "CANCELADA", // Cotización cancelada
}

registerEnumType(CotizacionStatusEmun, {
  name: "CotizacionStatusEmun", // El nombre que tendrá en GraphQL
  description: "Estados posibles de una cotización", // Descripción del Enum
});
