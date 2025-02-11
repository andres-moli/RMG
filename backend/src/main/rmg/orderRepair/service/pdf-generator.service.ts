import { Injectable } from '@nestjs/common';
import * as puppeteer from 'puppeteer';
import { OrderRepairty } from '../entities/orderRepair.entity';
import { FieldTypeEnum } from '../../repairType/emun/FieldTypeEnum';

@Injectable()
export class PdfGeneratorService {
  async generatePDF(orderData: any) {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    console.log("Hola")
    // 📝 Generar HTML Dinámico con los datos del JSON
    const htmlContent = `
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; padding: 20px; }
          h1 { color: #333; text-align: center; }
          .container { border: 1px solid #ddd; padding: 15px; border-radius: 10px; background: #f9f9f9; }
          .section-title { background: #333; color: white; padding: 5px; border-radius: 5px; }
          .info { margin-bottom: 10px; }
          .image { text-align: center; margin-top: 10px; }
          .firma { margin-top: 20px; text-align: center; border-top: 1px solid #000; width: 200px; margin-left: auto; margin-right: auto; padding-top: 5px; }
          .footer { text-align: center; margin-top: 20px; font-size: 12px; color: #555; }
        </style>
      </head>
      <body>
        <h1>Detalles del Pedido de Reparación</h1>

        <div class="container">
          <h2 class="section-title">Información del Cliente</h2>
          <p class="info"><strong>Cliente:</strong> ${orderData.client.name} ${orderData.client.lastName}</p>
          <p class="info"><strong>Documento:</strong> ${orderData.client.numberDocument}</p>
          <p class="info"><strong>Email:</strong> ${orderData.client.email}</p>
          <p class="info"><strong>Dirección:</strong> ${orderData.client.address}</p>
          <p class="info"><strong>Celular:</strong> ${orderData.client.celular}</p>
        </div>

        <div class="container">
          <h2 class="section-title">Detalles de la Reparación</h2>
          <p class="info"><strong>Tipo de Reparación:</strong> ${orderData.repairType.name}</p>
          <p class="info"><strong>Costo Estimado:</strong> $${orderData.repairType.costEstimate.toLocaleString()}</p>
        </div>

        <div class="container">
          <h2 class="section-title">Campos de la Reparación</h2>
          ${orderData.repairType.fields
            .map((field) => {
              const fieldValue = orderData.fieldValues.find(fv => fv.field.id === field.id);
              let value;
              
              switch (fieldValue?.field.type) {
                case FieldTypeEnum.TEXT: value = fieldValue.valorTexto || "N/A"; break;
                case FieldTypeEnum.NUMBER: value = fieldValue.valorNumerico?.toString() || "N/A"; break;
                case FieldTypeEnum.LONG_TEXT: value = fieldValue.valorTextoLargo || "N/A"; break;
                case FieldTypeEnum.DATE: value = fieldValue.valorFecha || "N/A"; break;
                case FieldTypeEnum.IMAGE: 
                  return `<div class="image"><img src="${fieldValue.valorFoto?.fileUrl}" width="150"/></div>`;
                default: value = "N/A";
              }

              return `<p class="info"><strong>${field.name}:</strong> ${value}</p>`;
            })
            .join("")
          }
        </div>

        <div class="firma">Firma del Cliente</div>

        <div class="footer">
          Fecha de Generación: ${new Date().toLocaleDateString()}
        </div>
      </body>
      </html>
    `;

    // Configurar el contenido de la página
    await page.setContent(htmlContent, { waitUntil: 'networkidle0' });

    // Generar el PDF
    const pdfBuffer = await page.pdf({
      format: 'A4',
      printBackground: true,
    });

    await browser.close();
    return pdfBuffer;
  }
}
