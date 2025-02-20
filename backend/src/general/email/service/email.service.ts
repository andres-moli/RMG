// mail/mail.service.ts
import { Injectable } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';
import { ISendMailContext } from '../interface/email.interface';

@Injectable()
export class MailService {
  constructor(private readonly mailerService: MailerService) {}
  async sendMail(to: string[] | string, subject: string, template: string, context: ISendMailContext) {
    await this.mailerService.sendMail({
      to,
      subject,
      template: `./${template}`,
      context:context
    }).catch(e => {
      console.log(e)
    });
  }
  async sendEmailWithPdfAttachment(
    to: string,
    subject: string,
    text: string,
    pdfBuffer: Buffer,
    filename: string,
    type: string
  ): Promise<void> {
    const mailOptions = {
      to: 'andresmolinag2018@gmail.com', // Correo del destinatario
      subject, // Asunto del correo
      text, // Cuerpo del correo en texto plano
      template: `./${type}`,
      attachments: [
        {
          filename, // Nombre del archivo adjunto
          content: pdfBuffer, // Buffer del PDF
          contentType: 'application/pdf',
        },
      ],
    };

    try {
      await this.mailerService.sendMail(mailOptions);
    } catch (error) {
      console.error('Error al enviar el correo:', error);
      throw new Error('Error al enviar el correo');
    }
  }
}
