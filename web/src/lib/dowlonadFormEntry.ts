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
            fieldContent = `<span>${fieldValue.valorTexto || "N/A"}</span>`;
            break;
        case FieldTypeEnum.Selector:
            fieldContent = `<span>${fieldValue.valorSeletor || "N/A"}</span>`;
            break;
        case FieldTypeEnum.Number:
            fieldContent = `<span>${fieldValue.valorNumerico !== null ? fieldValue.valorNumerico : "N/A"}</span>`;
            break;
        case FieldTypeEnum.Date:
            fieldContent = `<span>${fieldValue.valorFecha ? dayjs(fieldValue.valorFecha).format("DD/MM/YYYY") : "N/A"}</span>`;
            break;
        case FieldTypeEnum.LongText:
            fieldContent = `<span class="long-text">${fieldValue.valorTextoLargo || "N/A"}</span>`;
            break;
        case FieldTypeEnum.Image:
            fieldContent = fieldValue.valorFoto?.url ? `<img src="${fieldValue.valorFoto.url}" alt="Imagen">` : "<span>N/A</span>";
            break;
        default:
            fieldContent = "<span>N/A</span>";
    }

    return `
        <div class="field">
            <label>${fieldName}:</label>
            ${fieldContent}
        </div>
    `;
}).join("");

const htmlContent = `
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>${repair.client.name} ${repair.client.lastName} ${repair.client.celular}</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            margin: 0;
            padding: 10px;
            background: #f5f6fa;
            color: #2e323c;
        }
        .header {
            display: flex;
            justify-content: space-between;
            align-items: flex-start;
            margin-bottom: 20px;
        }
        .company-info {
            text-align: center;
                  font-size: 14px;
          margin-top: 5px;
        }
        .company-info img {
           width: 150px;
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
        .fields {
            display: grid;
            grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
            gap: 5px;
            margin-top: 10px;
        }
        .field {
            display: flex;
            align-items: center;
            gap: 5px;
            padding: 5px;
            border-bottom: 1px solid #ddd;
        }
        .field label {
            font-weight: bold;
        }
        .long-text {
            font-size: 12px;
        }
        img {
            max-width: 100%;
            height: auto;
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
        .footer {
            text-align: center;
            margin-top: 20px;
        }
    </style>
</head>
<body>
    ${repair.status == OrderStatusEnum.Canceled ? '<div class="sello-anulado">RECIBO ANULADO</div>' : ''}
    
    <div class="header">
        <div class="client-info">
            <strong>Datos del cliente:</strong>
            <address>
                ${repair.client.name} ${repair.client.lastName}<br>
                ${repair.client.numberDocument}<br>
                ${repair.client.address}<br>
                ${repair.client.email}
            </address>
        </div>
        <div class="company-info">
            <img src="/logo3.png" alt="Logo">
            <address>
                Calle 42 #33-26, Barranquilla<br>
                3006734018
            </address>
        </div>
        <div class="repair-info">
            <strong>Tipo de servicio:</strong> ${repair.repairType.name}<br>
            <strong>Fecha:</strong> ${dayjs(repair.createdAt).locale('es').format('YYYY-MMMM-DD HH:mm:ss')}
        </div>
    </div>
    
    <div class="fields">
        ${fieldValuesHtml}
    </div>
    
    <div class="footer">
       <!--  Gracias por su confianza en nosotros, fue un placer atenderlo.<br> -->
        Generado a las ${dayjs().format("HH:mm")} del día ${dayjs().format("DD")} de ${dayjs().locale('es').format("MMMM")} de ${dayjs().format("YYYY")}.
    </div>
    
    <script>
        window.onload = function() {
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
