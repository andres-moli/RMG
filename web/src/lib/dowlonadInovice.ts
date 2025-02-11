import html2pdf from "html2pdf.js";
import { Invoice } from "../domain/graphql";
import dayjs from "dayjs";
import 'dayjs/locale/es' 
export const downloadAndShareInvoice = (invoiceData: Invoice) => {
  // Formatear la fecha correctamente
  dayjs.locale("es");

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
            Calle 42 #33-26<br>
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
            <strong>Número de Recibo:</strong> ${invoiceData.invoiceNumber}<br>
            <strong>Metodo de pago:</strong> ${invoiceData.paymentMethod}<br>
            <strong>Fecha:</strong> ${dayjs(invoiceData.createdAt).locale('es').format('YYYY-MMMM-DD HH:mm:ss')}
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
                  <td colspan="2" style="text-align: right;"><strong>${invoiceData.subtotal || 0}</strong></td>
                </tr>
                <tr>
                  <td><strong>Descuento</strong></td>
                  <td colspan="2" style="text-align: right;"><strong>${(invoiceData.subtotal * (invoiceData.discount / 100)) || 0}</strong></td>
                </tr>
                <tr>
                  <td><strong>Impuesto</strong></td>
                  <td colspan="2" style="text-align: right;"><strong>${invoiceData.subtotal * (invoiceData.tax / 100) || 0}</strong></td>
                </tr>
                <tr>
                  <td><strong>Total</strong></td>
                  <td colspan="2" class="text-success" style="text-align: right;"><strong>${invoiceData.total || 0}</strong></td>
                </tr>
                <tr>
                  <td colspan="3">${invoiceData.description || "Sin descripción"}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        <div class="invoice-footer">
          Gracias por su compra, fue un placer atenderlo.
        </div>

        <div class="invoice-footer">
          Generado a las ${dayjs().format("HH:mm")} del día ${dayjs().format("DD")} de ${dayjs().locale('es').format("MMMM")} de ${dayjs().format("YYYY")}.
        </div>
      </div>
    </body>
    </html>
  `;

  // Crear un elemento invisible en el DOM para renderizar el HTML antes de exportarlo
  const container = document.createElement("div");
  container.innerHTML = htmlContent;
  document.body.appendChild(container);

  // Generar y descargar el PDF
  html2pdf(container, {
    margin: 10,
    filename: `Recibo_${invoiceData.invoiceNumber}.pdf`,
    image: { type: "jpeg", quality: 0.98 },
    html2canvas: { scale: 2 },
    jsPDF: { unit: "mm", format: "a4", orientation: "portrait" },
  }).then(() => {
    document.body.removeChild(container); // Eliminar el contenedor después de la generación
  });
};
