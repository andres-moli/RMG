import dayjs from "dayjs";
import { OrderRepairty, OrderStatusEnum, FieldTypeEnum } from "../domain/graphql";

export const downloadFromEntry = (repair: OrderRepairty) => {
  dayjs.locale("es");

  // Construcción dinámica de los campos
  const fieldValuesHtml = repair.fieldValues?.map((fieldValue) => {
    const fieldName = fieldValue.field.name;
    let fieldContent = "";

    switch (fieldValue.field.type) {
      case FieldTypeEnum.Text:
        fieldContent = `<p class="field-value">${fieldValue.valorTexto || "N/A"}</p>`;
        break;
      case FieldTypeEnum.Selector:
        fieldContent = `<p class="field-value">${fieldValue.valorSeletor || "N/A"}</p>`;
        break;

      case FieldTypeEnum.Number:
        fieldContent = `<p class="field-value">${fieldValue.valorNumerico !== null ? fieldValue.valorNumerico : "N/A"}</p>`;
        break;

      case FieldTypeEnum.Date:
        fieldContent = `<p class="field-value">${fieldValue.valorFecha ? dayjs(fieldValue.valorFecha).format("DD/MM/YYYY") : "N/A"}</p>`;
        break;

      case FieldTypeEnum.LongText:
        fieldContent = `<p class="field-value long-text">${fieldValue.valorTextoLargo || "N/A"}</p>`;
        break;

      case FieldTypeEnum.Image:
        if (fieldValue.valorFoto && fieldValue.valorFoto.url) {
          fieldContent = `<img src="${fieldValue.valorFoto.url}" alt="Imagen" class="field-image">`;
        } else {
          fieldContent = "<p class='field-value'>N/A</p>";
        }
        break;

      default:
        fieldContent = "<p class='field-value'>N/A</p>";
    }

    return `
      <div class="field-container">
        <label>${fieldName}:</label>
        ${fieldContent}
      </div>
    `;
  }).join("");

  // Construcción del HTML
  const htmlContent = `
    <html>
    <head>
      <title>${repair.client.name + ' ' + repair.client.lastName+ ' ' + repair.client.celular  }</title>
      <style>
        body {
          margin: 0;
          padding: 0;
          display: flex;
          justify-content: center;
          align-items: flex-start;
          background: #f5f6fa;
          color: #2e323c;
          height: 100vh;
          font-family: Arial, sans-serif;
        }
        .invoice-container {
          max-width: 800px;
          width: 100%;
          background: #ffffff;
          padding: 2rem;
          box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
          border-radius: 8px;
          border: 2px solid #007ae1;
        }
        .invoice-header, .invoice-footer {
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
          border-radius: 5px;
          border: 1px solid #dcdde1;
        }
        .field-container {
          display: flex;
          flex-direction: column;
          padding: 10px;
          border: 1px solid #007ae1;
          margin-bottom: 10px;
          border-radius: 5px;
          background: #f9f9f9;
        }
        .field-container label {
          font-weight: bold;
          background: #007ae1;
          color: white;
          padding: 5px;
          border-radius: 3px;
        }
        .field-value {
          margin-top: 5px;
          padding: 5px;
          background: white;
          border-radius: 3px;
        }
        .long-text {
          max-width: 100%;
          font-size: 12px;
        }
        .field-image {
          max-width: 100%;
          height: auto;
          display: block;
          margin-top: 5px;
          border-radius: 5px;
          border: 1px solid #ccc;
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
        @media print {
        body {
          margin: 0;
          padding: 0;
          display: flex;
          justify-content: center;
          align-items: flex-start;
          background: #f5f6fa;
          color: #2e323c;
          height: 100vh;
          font-family: Arial, sans-serif;
        }
        .invoice-container {
          max-width: 800px;
          width: 100%;
          background: #ffffff;
          padding: 2rem;
          box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
          border-radius: 8px;
          border: 2px solid #007ae1;
        }
        .invoice-header, .invoice-footer {
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
          border-radius: 5px;
          border: 1px solid #dcdde1;
        }
        .field-container {
          display: flex;
          flex-direction: column;
          padding: 10px;
          border: 1px solid #007ae1;
          margin-bottom: 10px;
          border-radius: 5px;
          background: #f9f9f9;
        }
        .field-container label {
          font-weight: bold;
          background: #007ae1;
          color: white;
          padding: 5px;
          border-radius: 3px;
        }
        .field-value {
          margin-top: 5px;
          padding: 5px;
          background: white;
          border-radius: 3px;
        }
        .long-text {
          max-width: 100%;
          font-size: 12px;
        }
        .field-image {
          max-width: 100%;
          height: auto;
          display: block;
          margin-top: 5px;
          border-radius: 5px;
          border: 1px solid #ccc;
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
      ${repair.status == OrderStatusEnum.Canceled ? '<div class="sello-anulado">RECIBO ANULADO</div>' : ''}

      <div class="invoice-container">
        <div class="invoice-header">
          <div class="invoice-logo">
            <img src="/logo3.png" alt="Image" width="200" height="100">
          </div>
          <address>
            Calle 42 #33-26, Barranquilla <br>
            3006734018
          </address>
        </div>

        <div class="invoice-details">
          <strong>Datos del cliente:</strong>
          <address>
            ${repair.client.name} ${repair.client.lastName}<br>
            ${repair.client.numberDocument}<br>
            ${repair.client.address}<br>
            ${repair.client.email}
          </address>
        </div>

        <div class="invoice-details">
          <div class="invoice-num">
            <strong>Tipo de servicio:</strong> ${repair.repairType.name}<br>
            <strong>Fecha:</strong> ${dayjs(repair.createdAt).locale('es').format('YYYY-MMMM-DD HH:mm:ss')}
          </div>
        </div>

        <div class="fields-section">
          ${fieldValuesHtml}
        </div>

        <div class="invoice-footer">
          Gracias por su confianza en nosotros, fue un placer atenderlo.
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
    newTab.document.close();
  } else {
    alert("No se pudo abrir la nueva pestaña. Por favor, desactiva el bloqueador de pop-ups.");
  }
};
