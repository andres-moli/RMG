import { Controller, Post, Body, Res } from '@nestjs/common';
import { InvoiceServicePdf } from '../services/invoice-pdf.service';
import { Response } from 'express';
import { ApiBody, ApiTags } from '@nestjs/swagger';
@ApiTags('Invoices')
@Controller('invoice')
export class InvoiceController {
  constructor(private readonly invoiceService: InvoiceServicePdf) {}

  @Post('generate-pdf')
  @ApiBody({ type: Object })
  async generateInvoicePDF(@Body() invoice: any, @Res() res: Response) {
    const pdfBuffer = await this.invoiceService.generateInvoicePdf(invoice);

    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': 'attachment; filename="invoice.pdf"',
    });

    res.send(pdfBuffer);
  }
}
