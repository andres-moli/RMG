import dayjs from "dayjs";
import { formatCurrency } from "./utils";
import { Invoice, StatusInvoice } from "../domain/graphql";

export const downloadAndShareInvoice = (invoiceData: Invoice) => {
  dayjs.locale("es");

  const htmlContent = `
<html>
<head>
<title>Recibo - ${invoiceData.invoiceNumber}</title>
<style>
  @media print {
    body {
      height: auto;
    }
    .invoice-container {
      max-width: 1000px;
      box-shadow: none;
    }

    .company-header {
      display: flex;
      flex-direction: column;
      align-items: center;
      text-align: center;
    }
    
    .company-logo img {
      width: 150px;
    }

    .company-info {
      font-size: 14px;
      margin-top: 5px;
    }

    .invoice-header {
      text-align: center;
      font-weight: bold;
      font-size: 16px;
      margin-top: 10px;
    }

    .client-info {
      margin-top: 20px;
      text-align: left;
      font-size: 14px;
    }

    .invoice-body {
      margin-top: 5px;
    }

    .custom-table {
      width: 100%;
      border-collapse: collapse;
      margin-top: 5px;
    }

    .custom-table th {
      background: #007ae1;
      color: white;
      text-align: left;
      padding: 10px;
      border-bottom: 1px solid black;
    }

    .custom-table td {
      padding: 5px;
      text-align: left;
      font-size: 14px;
    }

    .text-success {
      color: #00bb42;
    }
    .invoice-footer {
      text-align: center;
    }
      
    hr {
      border: 0;
      height:0;
    }
    .tr-hr {
      border-bottom: 1px solid black;
    }
  }
</style>
</head>
<body>
${invoiceData.status == StatusInvoice.Anulada ? '<div class="sello-anulado">RECIBO ANULADO</div>' : ''}

<div class="invoice-container">
  <div class="company-header">
    <div class="company-logo">
      <img src="/logo3.png" alt="Image">
    </div>
    <div class="company-info">
      <address>
        Calle 42 #33-26, Barranquilla <br>
        3006734018
      </address>
    </div>
  </div>
  
  <div class="invoice-header">
    <strong>Número de Recibo:</strong> ${invoiceData.invoiceNumber}<br>
    <strong>Método de pago:</strong> ${invoiceData.paymentMethod}<br>
    <strong>Fecha:</strong> ${dayjs(invoiceData.createdAt).locale('es').format('YYYY-MMMM-DD HH:mm:ss')}
  </div>
  <div class="client-info">
    <strong>Datos del cliente:</strong>
    <address>
      ${invoiceData.cliente.name} ${invoiceData.cliente.lastName}<br>
      ${invoiceData.cliente.numberDocument}<br>
      ${invoiceData.cliente.address}<br>
      ${invoiceData.cliente.email}
    </address>
  </div>
  <div class="invoice-body">
    <table class="custom-table">
      <thead>
        <tr>
          <th>Servicio</th>
          <th>Subtotal</th>
          <th>Descuento</th>
          <th>Cantidad</th>
          <th>Total</th>
        </tr>
      </thead>
      <tbody>
        <tr class="tr-hr">
          <td>${invoiceData.orrderReapirty.repairType.name}</td>
          <td>${formatCurrency(invoiceData.orrderReapirty.repairType.costEstimate || 0)}</td>
          <td>${formatCurrency(invoiceData.discount|| 0)}</td>
          <td>${1}</td>
          <td>${formatCurrency(invoiceData.total || 0)}</td>
        </tr>
        <tr class="tr-hr">
          <td><strong>Total a pagar<strong></td>
          <td></td>
          <td></td>
          <td></td>
          <td><strong>${formatCurrency(invoiceData.total || 0)}</strong></td>
        </tr>
      </tbody>
    </table>
  </div>

  <div class="invoice-footer">
    Gracias por su compra, fue un placer atenderlo.
  </div>
  <div class="invoice-footer">
    Generado a las ${dayjs().format("HH:mm")} del día ${dayjs().format("DD")} de ${dayjs().locale('es').format("MMMM")} de ${dayjs().format("YYYY")}.
  </div>
</div>

<script>
  window.onload = function () {
    setTimeout(() => {
      window.print();
    }, 500);
  };
</script>
</body>
</html>

  `;

  // Abrir nueva pestaña
  const newTab = window.open("", "_blank");
  if (newTab) {
    newTab.document.write(htmlContent);
    newTab.document.close(); // Necesario para asegurar que se renderiza correctamente
  } else {
    alert("No se pudo abrir la nueva pestaña. Por favor, desactiva el bloqueador de pop-ups.");
  }
};
