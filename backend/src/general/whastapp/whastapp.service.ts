import { Injectable, OnModuleInit } from '@nestjs/common';
import { Client, LocalAuth, MessageMedia } from 'whatsapp-web.js';
import * as qrcode from 'qrcode-terminal';

@Injectable()
export class WhatsAppService implements OnModuleInit {
  private client: Client;

  constructor() {
    this.client = new Client({
      authStrategy: new LocalAuth(), // Almacena la sesión localmente
      puppeteer: {
        headless: true, // Ejecutar en modo sin interfaz gráfica
      },
    });

    // Escanear el código QR para autenticarse
    this.client.on('qr', (qr) => {
      qrcode.generate(qr, { small: true });
    });

    // Confirmar cuando esté listo
    this.client.on('ready', () => {
      console.log('Cliente de WhatsApp listo');
    });

    // Manejar errores
    this.client.on('auth_failure', (msg) => {
      console.error('Error de autenticación:', msg);
    });

    // Iniciar el cliente
    this.client.initialize();
  }

  async onModuleInit() {
    // Esperar a que el cliente esté listo
    await new Promise((resolve) => this.client.on('ready', resolve));
  }

  async sendMessageWithPdf(phoneNumber: string, pdfBuffer: Buffer, filename: string, message?: string) {
    try {
      // Crear un objeto MessageMedia con el PDF
      const media = new MessageMedia('application/pdf', pdfBuffer.toString('base64'), filename);

      // Enviar el mensaje con el PDF adjunto
      await this.client.sendMessage(`${phoneNumber}@c.us`, media, { caption: message });

      console.log('Mensaje enviado correctamente');
    } catch (error) {
      console.error('Error al enviar el mensaje:', error);
      throw new Error('Error al enviar el mensaje por WhatsApp');
    }
  }
}