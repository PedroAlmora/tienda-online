import { Injectable } from '@nestjs/common';
import { Resend } from 'resend';

@Injectable()
export class EmailService {
  private resend = new Resend('re_dkASJmrK_D3JWpLZoMY9fdPc9mH2fCDJ4');
  private fromEmail = 'gonzalezalmorapedroluis@gmail.com';

  async sendOrderConfirmation(to: string, items: { code: string; quantity: number; }[], totalPrice: number) {
    const subject = 'Confirmación de pedido en línea';
    let html = `<p>Hola: Su pedido ha sido registrado. Por favor pase por la tienda más cercana a recogerlo.</p>`;
    html += `<table style="border-collapse: collapse; width: 100%;">`;
    html += `<tr><th style="border: 1px solid #ddd; padding: 8px;">Nombre</th><th style="border: 1px solid #ddd; padding: 8px;">Cantidad</th></tr>`;

    items.forEach(item => {
      html += `<tr><td style="border: 1px solid #ddd; padding: 8px;">${item.code}</td><td style="border: 1px solid #ddd; padding: 8px;">${item.quantity}</td></tr>`;
    });

    html += `</table><p>Precio total: ${totalPrice}</p>`;

    await this.resend.emails.send({
      from: 'ventas@tmpdiesel.com',
      to,
      subject,
      html,
    });
  }
}
