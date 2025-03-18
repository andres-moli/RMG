import { Injectable } from '@nestjs/common';
import * as pdf from 'html-pdf-node';
import moment from 'moment';
import { formatCurrency } from 'src/common/functions';
import { RECIBO_PAGO_PRODUCTO_SERVICIO } from '../template/reciboPagoProductoService.template';
import { ProductOutflow } from 'src/main/inventory/productOutflow/entities/productOuflow.entity';
import { COTIZACION_PRINT_TAMPLATE } from '../template/cotizacion.template';
import { Cotizacion } from 'src/main/inventory/cotizacion/entities/cotizacion.entity';
export enum TYPE_EMAIL_DOCUMETN {
  RECIBO_PAGO_PRODUCTO_SERVICIO = 'RECIBO_PAGO_PRODUCTO_SERVICIO',
  COTIZACION = 'COTIZACION'
}
@Injectable()
export class EmailDocumentServicePdf {
  async generateInvoicePdf(data: any, type: TYPE_EMAIL_DOCUMETN){
    let htmlContent = ''
    let title = ''
    switch (type){
      case TYPE_EMAIL_DOCUMETN.RECIBO_PAGO_PRODUCTO_SERVICIO:
        htmlContent = RECIBO_PAGO_PRODUCTO_SERVICIO(data as ProductOutflow)
        title = `CUENTA DE COBRO - ${data?.invoiceNumber || '000000'}`
        break
      case TYPE_EMAIL_DOCUMETN.COTIZACION: 
        htmlContent = COTIZACION_PRINT_TAMPLATE(data as Cotizacion)
        title = `Cotización - ${data?.invoiceNumber || '000000'}`
        break
      default:
        htmlContent = '<h1>DOCUMENTO NO ENCONTRADO :(</h1>'
    }


    const file = { content: htmlContent };
    const options = { format: 'A4' };

    const pdfBuffer = await pdf.generatePdf(file, options);
    return {pdfBuffer, title};
  }

}
