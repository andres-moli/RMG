import { Cotizacion, CotizacionStatusEmun } from "../domain/graphql";
import dayjs from "dayjs";
import 'dayjs/locale/es' 
import { formatCurrency } from "./utils";
export const dowloandCotizacion = (invoiceData: Cotizacion) => {
  dayjs.locale("es");
  const calculateTotal = () => {
    const totalProducto = invoiceData.cotizacionProduct?.reduce((total, item) => total + item.total, 0) || 0;
    const totalServicio = invoiceData.cotizacionService?.reduce((total, item) => total + item.total, 0) || 0;
    return totalProducto + totalServicio
  };
  const htmlContent = `
    <html>
<head>
  <title>Cotización - ${invoiceData.invoiceNumber}</title>
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
          font-family: Arial, sans-serif;
          margin-bottom: 20px;
        }

        .client-info strong {
          display: block; /* Título en una línea separada */
          margin-bottom: 10px;
          font-size: 16px;
        }

        .client-details {
          display: flex; /* Alinea los elementos en horizontal */
          flex-wrap: wrap; /* Permite que los elementos se envuelvan si no caben */
          gap: 20px; /* Espacio entre los elementos */
        }

        .detail-item {
          display: flex;
          flex-direction: column; /* Coloca el label arriba y el dato abajo */
        }

        .detail-item label {
          font-weight: bold; /* Hace el label en negrita */
          margin-bottom: 5px; /* Espacio entre el label y el dato */
          font-size: 14px;
          color: #555; /* Color del texto del label */
        }

        .detail-item span {
          font-size: 14px;
          color: #333; /* Color del texto del dato */
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
  ${invoiceData.status === CotizacionStatusEmun.Cancelada ? '<div class="sello-anulado">CANCELADA</div>' : ''}
  
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
      <strong>Número de cotización:</strong> ${invoiceData.invoiceNumber}<br>
      <strong>Fecha:</strong> ${dayjs(invoiceData.createdAt).locale('es').format('YYYY-MMMM-DD HH:mm:ss')}
    </div>
    <div class="client-info">
      <strong>Datos del cliente:</strong>
      <div class="client-details">
        <div class="detail-item">
          <label>Nombre</label>
          <span>${invoiceData.client.name} ${invoiceData.client.lastName}</span>
        </div>
        <div class="detail-item">
          <label>Tipo de documento</label>
          <span>${invoiceData.client.identificationType}</span>
        </div>
        <div class="detail-item">
          <label>Documento</label>
          <span>${invoiceData.client.numberDocument}</span>
        </div>
        <div class="detail-item">
          <label>Dirección</label>
          <span>${invoiceData.client.address}</span>
        </div>
        <div class="detail-item">
          <label>Correo</label>
          <span>${invoiceData.client.email}</span>
        </div>
      </div>
    </div>
    <div class="invoice-body">
      <table class="custom-table">
        <thead>
          <tr>
            <th>Tipo</th>
            <th>Producto o servicio</th>
            <th>Cantidad</th>
            <th>Precio und</th>
            <th>Descuento (%)</th>
            <th>Impuesto (%)</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          ${invoiceData.cotizacionProduct?.map(product => `
            <tr>
              <td>Producto</td>
              <td>${product.product.name}</td>
              <td>${product.quantity}</td>
              <td>${formatCurrency(product.unitPrice)}</td>
              <td>${product.discount}</td>
              <td>${product.tax}</td>
              <td>${formatCurrency(product.total || 0)}</td>
            </tr>
          `).join("")}
          ${invoiceData.cotizacionService?.map(product => `
            <tr>
              <td>Servicio</td>
              <td>${product.service.name}</td>
              <td>${product.quantity}</td>
              <td>${formatCurrency(product.unitPrice)}</td>
              <td>${product.discount}</td>
              <td>${product.tax}</td>
              <td>${formatCurrency(product.total || 0)}</td>
            </tr>
          `).join("")}
          <tr>
            <td><strong>Total a pagar</strong></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td><strong>${formatCurrency(calculateTotal())}</strong></td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="invoice-footer">
      <strong>Nota: </strong>${invoiceData.description}
    </div>
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

