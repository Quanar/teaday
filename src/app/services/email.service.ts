import { Injectable } from '@angular/core';
import emailjs from '@emailjs/browser'

@Injectable({
  providedIn: 'root'
})
export class EmailService {
  private serviceId = 'service_8icz0vr';
  private templateId = 'template_o2it524';
  private publicKey = 'TQ6LIjyQE79n5PP2D';

  sendEmail(formData: any) {
    return emailjs.send(this.serviceId, this.templateId, formData, this.publicKey);
  }
}
