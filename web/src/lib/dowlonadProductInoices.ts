import { Invoice, ProductOutflow, StatusInvoice } from "../domain/graphql";
import dayjs from "dayjs";
import 'dayjs/locale/es' 
import { formatCurrency } from "./utils";
export const dowlonadProductInoices = (invoiceData: ProductOutflow) => {
  dayjs.locale("es");

  const htmlContent = `
  <html>
  <head>
    <title>Recibo de pago - ${invoiceData.invoiceNumber}</title>
    <style>
      @media print {
        html, body {
    height: 14.85cm; /* Media hoja A4 */
    overflow: hidden; /* Evita que se extienda más */
  }

  .container {
    width: 100%;
    height: 14.85cm; /* Media hoja */
    display: flex;
    align-items: center; /* Centrar el contenido */
    justify-content: center;
  }

  @page {
    size: A4 portrait; /* Asegura tamaño A4 vertical */
    margin: 0; /* Elimina márgenes extra */
  }
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
  flex-direction: column;
}

/* Fila superior: Logo y reparación */
.top-row {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  /* Opcional: para que se ajusten bien, puedes controlar el gap */
  gap: 5px; /* gap mínimo para que queden casi pegados */
}

.company-logo img {
  width: 150px;
  display: block;
}

.repair-info {
  font-size: 14px;
  align-items: flex-center;
  /* Si deseas ajustar la separación, puedes usar margin-left en lugar de gap */
  /* margin-left: 5px; */
}

/* Fila inferior: Compañía y Cliente */
.bottom-row {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  margin-top: 10px;
}

.company-info {
  width: 48%;  /* Se reparte el ancho equitativamente */
  font-size: 14px;
  text-align: left;
}
.client-info {
  width: 48%;  /* Se reparte el ancho equitativamente */
  font-size: 14px;
  text-align: right;
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
          text-align: left;
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
          .pago-info {
            font-family: Arial, sans-serif;
            color: #333;
            max-width: 900px; /* Más largo pero menos ancho */
            text-align: left;
        }

.mensaje {
    font-size: 0.9em;
    margin-bottom: 10px;
    text-align: left;
    color: #555;
}
                            .mensaje-name {
                font-size: 0.7em;
                text-align: left;
                color: #555;
            }
                                            .mensaje-description {
                font-size: 0.9em;
                text-align: left;
                color: #555;
            }
.cuentas-container {
    display: flex;
    justify-content: space-start;
     margin-bottom: 20px;
    gap: 30px; /* Espacio entre las cuentas */
}

.cuenta {
    display: flex;
    align-items: left;
    gap: 5px; /* Espacio entre el logo y la información */
}

.banco-logo {
    width: 25px; /* Logo más pequeño */
    height: 25px;
}

.cuenta-info {
    text-align: left;
}

.cuenta-info label {
    font-weight: bold;
    font-size: 0.8em;
    color: #2c3e50;
    display: block;
}

.cuenta-info p {
    font-size: 0.8em;
    margin: 0;
    color: #555;
}
      }
    </style>
  </head>
  <body>
    ${invoiceData.status === StatusInvoice.Anulada ? '<div class="sello-anulado">RECIBO ANULADO</div>' : ''}
    
    <div class="invoice-container">
      <div class="header">
  <!-- Fila superior: Logo y datos de reparación -->
  <div class="top-row">
    <div class="company-logo">
      <img src="/logo3.png" alt="Logo">
    </div>
    <div class="repair-info">
      <strong>Número de Recibo:</strong> <br>${invoiceData.invoiceNumber}<br>
      <strong>Método de pago:</strong> <br>${invoiceData.paymentMethod}<br>
      <strong>Fecha:</strong> <br>${dayjs(invoiceData.createdAt).locale('es').format('YYYY-MMMM-DD HH:mm:ss')}<br>
    </div>
        <div class="client-info">
      <strong>Datos del cliente:</strong>
      <address>
        ${invoiceData.client.name ? `Nombre: ${invoiceData.client.name} ${invoiceData.client.lastName}<br>` : ''}
        ${invoiceData.client.numberDocument ? `Número Documento: ${invoiceData.client.numberDocument}<br>` : ''}
        ${invoiceData.client.address ? `Dirección: ${invoiceData.client.address}<br>` : ''}
        ${invoiceData.client.email ? `Email: ${invoiceData.client.email}<br>` : ''}
      </address>
    </div>
  </div>

  <!-- Fila inferior: Datos de la compañía y datos del cliente -->
  <div class="bottom-row">
    <div class="company-info">
      <address>
        Calle 42 #33-26, Barranquilla <br>
        3006734018 <br>
        C.C. 8721239
      </address>
    </div>
  </div>
</div>

      <div class="invoice-body">
        <table class="custom-table">
          <thead>
            <tr>
              <th>Producto o Servicio</th>
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
                <td>${invoiceData.manually ? formatCurrency(product.total) : formatCurrency(product.subtotal)}</td>
                <td>${product.quantity}</td>
                <td>${formatCurrency(product.discount || 0)}</td>
                <td>${formatCurrency(product.total || 0)}</td>
              </tr>
            `).join("")}
            ${invoiceData.invoiceServices.map(service => `
              <tr>
                <td>${service.service.name}</td>
                <td>${invoiceData.manually ? formatCurrency(service.total) : formatCurrency(service.subtotal)}</td>
                <td>${service.quantity}</td>
                <td>${formatCurrency(service.discount || 0)}</td>
                <td>${formatCurrency(service.total || 0)}</td>
              </tr>
            `).join("")}
            <tr>
              <td></td>
              <td></td>
              <td></td>
              <td><strong>Total</strong></td>
              <td><strong>${formatCurrency((invoiceData.invoiceProducts?.reduce((total, product) => total + product.total, 0) + invoiceData.invoiceServices?.reduce((total, product) => total + product.total, 0)) || 0)}</strong></td>
            </tr>
          </tbody>
        </table>
      </div>
      <div class="mensaje-description">
        ${invoiceData.description || ''}
      </div> 
      <div class="pago-info">
        <p class="mensaje">Metodos de pago:</p>
        <div class="cuentas-container">
              <div class="cuenta">
                  <img src="/logo-nequi.jpg" alt="Nequi" class="banco-logo">
                  <div class="cuenta-info">
                      <label>Nequi</label>
                      <p><strong>3006734018</strong></p>
                  </div>
              </div>
              <div class="cuenta">
                  <img src="/logo-davi.png" alt="Nequi" class="banco-logo">
                  <div class="cuenta-info">
                      <label>DaviPlata</label>
                      <p><strong>3006734018</strong></p>
                  </div>
              </div>
              <div class="cuenta">
                  <img src="/logo-bancolombia.jpg" alt="Bancolombia" class="banco-logo">
                  <div class="cuenta-info">
                      <label>Bancolombia</label>
                      <p><strong>AHORROS-08100050341</strong></p>
                  </div>
              </div>
          </div>
        <p class="mensaje-name">RAFAEL MALDONADO G. <br> C.C. 8721239.</p>
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

