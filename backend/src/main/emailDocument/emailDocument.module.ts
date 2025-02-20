import { Module } from '@nestjs/common';
import { EmailDocumentController } from './controller/invoice.controller';
import { EmailDocumentServicePdf } from './service/emailDocument.service';
import { MailModule } from 'src/general/email/emial.module';

@Module({
  controllers: [EmailDocumentController],
  providers: [EmailDocumentServicePdf],
  imports: [MailModule] // Registra el servicio de correo
})
export class EmailDocumentModule {}