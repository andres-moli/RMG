import { Module } from '@nestjs/common';
import { WhatsAppService } from './whastapp.service';

@Module({
  providers: [WhatsAppService],
  exports: [WhatsAppService],
})
export class WhatsAppModule {}