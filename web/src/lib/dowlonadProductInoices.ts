import { Invoice, ProductOutflow, StatusInvoice } from "../domain/graphql";
import dayjs from "dayjs";
import 'dayjs/locale/es' 
import { formatCurrency } from "./utils";
export const dowlonadProductInoices = (invoiceData: ProductOutflow) => {
  dayjs.locale("es");

  const htmlContent = `
  <html>
  <head>
    <title>Recibo producto - ${invoiceData.invoiceNumber}</title>
    <style>
      @media print {
        body {
          height: auto;
          margin: 0;
          padding: 10px;
          font-family: Arial, sans-serif;
        }
        .invoice-container {
          max-width: 1000px;
          box-shadow: none;
          display: flex;
          flex-direction: column;
          gap: 10px;
        }
        
        .header {
          display: flex;
          justify-content: space-between;
          align-items: flex-start;
          margin-bottom: 10px;
        }
        
        .company-header {
          text-align: center;
          flex: 1;
        }
        
        .company-logo img {
          width: 150px;
        }
  
        .company-info {
          font-size: 14px;
          margin-top: 5px;
        }
  
        .client-info {
          text-align: left;
          font-size: 14px;
          width: 45%; /* Ancho para los datos del cliente */
        }
  
        .repair-info {
          text-align: right;
          font-size: 14px;
          width: 45%; /* Ancho para los datos de la reparación */
        }
  
        .invoice-body {
          margin-top: 5px;
          width: 100%;
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
          margin-top: 10px;
        }
        .cut-line {
          margin-top: 20px;
          border-top: 2px dashed black;
          width: 100%;
          text-align: center;
          position: relative;
        }
        .sello-anulado {
          position: absolute;
          top: 50%;
          left: 50%;
          transform: translate(-50%, -50%) rotate(-45deg);
          font-size: 5rem;
          color: rgba(255, 0, 0, 0.5);
          font-weight: bold;
          text-transform: uppercase;
          pointer-events: none;
          white-space: nowrap;
        }
      }
    </style>
  </head>
  <body>
    ${invoiceData.status === StatusInvoice.Anulada ? '<div class="sello-anulado">RECIBO ANULADO</div>' : ''}
    
    <div class="invoice-container">
      <div class="header">
        <div class="client-info">
          <strong>Datos del cliente:</strong>
          <address>
            ${invoiceData.client.name} ${invoiceData.client.lastName}<br>
            ${invoiceData.client.numberDocument}<br>
            ${invoiceData.client.address}<br>
            ${invoiceData.client.email}
          </address>
        </div>
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
        <div class="repair-info">
          <strong>Número de Recibo:</strong> ${invoiceData.invoiceNumber}<br>
          <strong>Método de pago:</strong> ${invoiceData.paymentMethod}<br>
          <strong>Fecha:</strong> ${dayjs(invoiceData.createdAt).locale('es').format('YYYY-MMMM-DD HH:mm:ss')}
        </div>
      </div>
      
      <div class="invoice-body">
        <table class="custom-table">
          <thead>
            <tr>
              <th>Producto</th>
              <th>Subtotal</th>
              <th>Cantidad</th>
              <th>Descuento</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody>
            ${invoiceData.invoiceProducts.map(product => `
              <tr>
                <td>${product.product.name}</td>
                <td>${formatCurrency(product.subtotal)}</td>
                <td>${product.quantity}</td>
                <td>${formatCurrency(product.discount || 0)}</td>
                <td>${formatCurrency(product.total || 0)}</td>
              </tr>
            `).join("")}
            <tr>
              <td><strong>Total a pagar</strong></td>
              <td></td>
              <td></td>
              <td></td>
              <td><strong>${formatCurrency(invoiceData.invoiceProducts?.reduce((total, product) => total + product.total, 0) || 0)}</strong></td>
            </tr>
          </tbody>
        </table>
      </div>
      <!-- <div class="invoice-footer">
        Gracias por su compra, fue un placer atenderlo.
      </div> -->
      <div class="invoice-footer">
        Generado a las ${dayjs().format("HH:mm")} del día ${dayjs().format("DD")} de ${dayjs().locale('es').format("MMMM")} de ${dayjs().format("YYYY")}.
      </div>
      <div class="cut-line"></div>
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

  // Abrir nueva pestaña y escribir el HTML generado
  const newTab = window.open("", "_blank");
  if (newTab) {
    newTab.document.write(htmlContent);
    newTab.document.close();
  } else {
    alert("No se pudo abrir la nueva pestaña. Por favor, desactiva el bloqueador de pop-ups.");
  }
};

