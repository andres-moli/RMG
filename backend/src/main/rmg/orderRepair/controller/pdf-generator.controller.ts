import { Controller, Post, Body, Response } from '@nestjs/common';
import { ApiTags, ApiOperation, ApiResponse, ApiBody } from '@nestjs/swagger';
import { PdfGeneratorService } from '../service/pdf-generator.service';
import { Response as ExpressResponse } from 'express';
import { OrderRepairty } from '../entities/orderRepair.entity';// Asegúrate de importar la estructura de datos correcta

@ApiTags('PDF') // Categoría en Swagger
@Controller('pdf')
export class PdfGeneratorController {
  constructor(private readonly pdfGeneratorService: PdfGeneratorService) {}

  @Post()
  @ApiOperation({ summary: 'Genera un PDF a partir de una orden de reparación' })
  @ApiResponse({ status: 201, description: 'PDF generado exitosamente.', type: 'file/pdf' })
  @ApiResponse({ status: 400, description: 'Datos inválidos' })
    @ApiBody({ type: Object })
  async generatePDF(@Body() orderData: any, @Response() res: ExpressResponse) {
    const pdfBuffer = await this.pdfGeneratorService.generatePDF(orderData);
    
    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="pedido_reparacion_${orderData['id']}.pdf"`,
      'Content-Length': pdfBuffer.length,
    });

    res.end(pdfBuffer);
  }
}
