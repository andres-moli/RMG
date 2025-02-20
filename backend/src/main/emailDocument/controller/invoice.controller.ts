import { Controller, Post, Body, Res, Param } from '@nestjs/common';
import { Response } from 'express';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { EmailDocumentServicePdf, TYPE_EMAIL_DOCUMETN } from '../service/emailDocument.service';
import { MailService } from 'src/general/email/service/email.service';
import { WhatsAppService } from 'src/general/whastapp/whastapp.service';

@ApiTags('emailDocument')
@Controller('emailDocument')
export class EmailDocumentController {
  constructor(
    private emailDocumentSevice: EmailDocumentServicePdf,
    private emailService: MailService,
    private readonly whatsAppService: WhatsAppService
  ) {}

  @Post('generate-pdf/:type')
  @ApiBody({ type: Object })
  async generateInvoicePDF(
    @Body() data: any,
    @Param('type') type: TYPE_EMAIL_DOCUMETN,
    @Res() res: Response
  ) {
    const pdfBuffer = await this.emailDocumentSevice.generateInvoicePdf(data, type);

    res.set({
      'Content-Type': 'application/pdf',
      'Content-Disposition': `attachment; filename="${pdfBuffer.title}.pdf"`,
    });

    res.send(pdfBuffer.pdfBuffer);
  }
  @Post('send-email/:type/:email')
  @ApiBody({ type: Object })
  async sendEmailWithPdf(
    @Body() data: any,
    @Param('type') type: TYPE_EMAIL_DOCUMETN,
    @Param('email') email: string,
  ) {
    // Genera el PDF
    const pdfBuffer = await this.emailDocumentSevice.generateInvoicePdf(data, type);

    // Envía el correo con el PDF adjunto
    this.emailService.sendEmailWithPdfAttachment(
      email, // Correo del destinatario
      `Documento: ${pdfBuffer.title}`, // Asunto del correo
      'Adjunto encontrarás el documento solicitado.', // Cuerpo del correo
      pdfBuffer.pdfBuffer, // Buffer del PDF
      `${pdfBuffer.title}.pdf`, // Nombre del archivo adjunto
      type
    );

    return { message: 'Correo enviado exitosamente' };
  }
  @Post('send-whastapp/:type/:number/:message')
  @ApiBody({ type: Object })
  async sendWhastappWithPdf(
    @Body() data: any,
    @Param('type') type: TYPE_EMAIL_DOCUMETN,
    @Param('number') number: string,
    @Param('message') message: string,
  ) {
    // Genera el PDF
    const pdfBuffer = await this.emailDocumentSevice.generateInvoicePdf(data, type);

    // Envía el correo con el PDF adjunto
    await this.whatsAppService.sendMessageWithPdf('57'+number, pdfBuffer.pdfBuffer, `${pdfBuffer.title}.pdf`,message == 'NA' ? undefined : message);

    return { message: 'whastapp enviado exitosamente' };
  }
}