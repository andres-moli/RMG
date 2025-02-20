import { Module } from '@nestjs/common';
import { EmailDocumentController } from './controller/invoice.controller';
import { EmailDocumentServicePdf } from './service/emailDocument.service';
import { MailModule } from 'src/general/email/emial.module';
import { WhatsAppModule } from 'src/general/whastapp/whastapp.module';

@Module({
  controllers: [EmailDocumentController],
  providers: [EmailDocumentServicePdf],
  imports: [MailModule,WhatsAppModule] // Registra el servicio de correo
})
export class EmailDocumentModule {}