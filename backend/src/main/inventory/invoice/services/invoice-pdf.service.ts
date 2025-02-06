import { Injectable } from '@nestjs/common';
import * as pdf from 'html-pdf-node';
import { Invoice } from '../entities/invoice.entity';
import moment from 'moment';
import { formatCurrency } from 'src/common/functions';

@Injectable()
export class InvoiceServicePdf {
  async generateInvoicePdf(invoiceData: Invoice): Promise<Buffer> {
    const htmlContent = `
    <html>
<head>
  <style>
    body {
      margin: 0;
      padding: 0;
      display: flex;
      justify-content: center;
      background: #f5f6fa;
      color: #2e323c;
    }
    .invoice-container {
      max-width: 800px;
      width: 100%;
      background: #ffffff;
      padding: 2rem;
      box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
      border-radius: 8px;
    }
    .invoice-header,
    .invoice-footer {
      text-align: center;
      margin-bottom: 20px;
    }
    .invoice-logo {
      font-size: 1.6rem;
      font-weight: 700;
    }
    .invoice-details {
      background: #f5f6fa;
      padding: 1rem;
      margin-bottom: 20px;
      text-align: center;
      border-radius: 5px;
    }
    .table-responsive {
      overflow-x: auto;
    }
    .custom-table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 20px;
    }
    .custom-table th,
    .custom-table td {
      border: 1px solid #e0e3ec;
      padding: 10px;
      text-align: center;
    }
    .custom-table thead {
      background: #007ae1;
      color: white;
    }
    .custom-table tbody tr:nth-child(even) {
      background-color: #f9f9f9;
    }
    .text-success {
      color: #00bb42;
    }
  </style>
</head>
<body>
  <div class="invoice-container">
    <div class="invoice-header">
      <div class="invoice-logo">RMG</div>
      <address>
        Calle 42 #22<br>
        Barranquilla
      </address>
    </div>

    <div class="invoice-details">
      <address>
        ${invoiceData.cliente.name} ${invoiceData.cliente.lastName}<br>
        ${invoiceData.cliente.numberDocument}<br>
        ${invoiceData.cliente.address}<br>
        ${invoiceData.cliente.email}
      </address>
    </div>

    <div class="invoice-details">
      <div class="invoice-num">
        <strong>Número de Factura:</strong> ${invoiceData.invoiceNumber}<br>
        <strong>Fecha:</strong> ${moment(invoiceData.createdAt).format('YYYY-MM-DD HH:mm:ss')}
      </div>
    </div>

    <div class="invoice-body">
    <div class="table-responsive">
        <table class="custom-table">
        <thead>
            <tr>
            <th>Servicio</th>
            <th>Cantidad</th>
            <th>Subtotal</th>
            </tr>
        </thead>
        <tbody>
            <tr>
            <td>${invoiceData.orrderReapirty.repairType.name}</td>
            <td>1</td>
            <td>${invoiceData.orrderReapirty.repairType.costEstimate}</td>
            </tr>
            <tr>
            <td><strong>Sub Total</strong></td>
            <td colspan="2" style="text-align: right;"><strong>${formatCurrency(invoiceData.subtotal || 0)}</strong></td>
            </tr>
            <tr>
            <td><strong>Descuento</strong></td>
            <td colspan="2" style="text-align: right;"><strong>${formatCurrency((invoiceData.subtotal * (invoiceData.discount / 100)) || 0)}</strong></td>
            </tr>
            <tr>
            <td><strong>Impuesto</strong></td>
            <td colspan="2" style="text-align: right;"><strong>${formatCurrency(invoiceData.subtotal * (invoiceData.tax / 100) || 0)}</strong></td>
            </tr>
            <tr>
            <td><strong>Total</strong></td>
            <td colspan="2" class="text-success" style="text-align: right;"><strong>${formatCurrency((invoiceData.total) || 0)}</strong></td>
            </tr>
            <tr>
            <td colspan="3">${invoiceData.description || "Sin descripción"}</td>
            </tr>
        </tbody>
        </table>
    </div>
    </div>
    <br></br>
    <br></br>
    <div class="invoice-footer">
      Gracias por su compra, fue un placer atenderlo.
    </div>
        <br></br>
    <br></br>
        <br></br>
    <br></br>
        <br></br>
    <br></br>
    <div class="invoice-footer">
      Generado a las ${moment().format('HH:mm')} del dia ${moment().format('DD')}, del mes ${moment().locale('es-ES').format('MMMM')} de ${moment().format('YYYY')}.
    </div>
  </div>
</body>
</html>`


    const file = { content: htmlContent };
    const options = { format: 'A4' };

    const pdfBuffer = await pdf.generatePdf(file, options);
    return pdfBuffer;
  }
}
