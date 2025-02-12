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
        body {
          margin: 0;
          padding: 0;
          display: flex;
          justify-content: center;
          align-items:  flex-start;
          background: #f5f6fa;
          color: #2e323c;
          height: 100vh;
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
        .text-success {
          color: #00bb42;
        }
        @media print {
          .description-cell {
            word-wrap: break-word;
            white-space: pre-wrap;
            overflow-wrap: break-word;
            text-align: left;
            font-size: 12px; /* Ajusta el tamaño si es necesario */
            max-width: 100%;
          }

          /* Asegurar que la tabla respete los anchos en impresión */
          .custom-table {
            width: 100%;
            table-layout: auto; /* Permite que las celdas se ajusten dinámicamente */
            border-collapse: collapse;
          }

          .custom-table td {
            padding: 8px;
            vertical-align: top; /* Asegura que el texto empiece desde arriba */
          }
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
      </style>
    </head>
    <body>
      ${invoiceData.status === StatusInvoice.Anulada ? '<div class="sello-anulado">RECIBO ANULADO</div>' : ''}
      <div class="invoice-container">
        <div class="invoice-header">
          <img src="/logo3.png" alt="Logo" width="200" height="100">
          <address>
            Calle 42 #33-26, Barranquilla <br>
            3006734018
          </address>
        </div>

        <div class="invoice-details">
          <strong>Datos del cliente:</strong>
          <address>
            ${invoiceData.client.name} ${invoiceData.client.lastName}<br>
            ${invoiceData.client.numberDocument}<br>
            ${invoiceData.client.address}<br>
            ${invoiceData.client.email}
          </address>
        </div>

        <div class="invoice-details">
          <strong>Número de Recibo:</strong> ${invoiceData.invoiceNumber}<br>
          <strong>Método de pago:</strong> ${invoiceData.paymentMethod}<br>
          <strong>Fecha:</strong> ${dayjs(invoiceData.createdAt).locale('es').format('YYYY-MMMM-DD HH:mm:ss')}
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
                <td colspan="2"><strong>Total a pagar</strong></td>
                <td colspan="3" class="text-success"><strong>${formatCurrency(invoiceData.invoiceProducts?.reduce((total, product) => total + product.total, 0) || 0)}</strong></td>
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

  // Abrir nueva pestaña y escribir el HTML generado
  const newTab = window.open("", "_blank");
  if (newTab) {
    newTab.document.write(htmlContent);
    newTab.document.close();
  } else {
    alert("No se pudo abrir la nueva pestaña. Por favor, desactiva el bloqueador de pop-ups.");
  }
};

