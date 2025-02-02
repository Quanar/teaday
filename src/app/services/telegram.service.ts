import { Injectable } from '@angular/core';
import {environment} from "../../environments/environment-telegram";

@Injectable({
  providedIn: 'root'
})
export class TelegramService {

  sendToTelegram() {
    const botToken = environment.telegramBotToken;
    const chatId = '1136289645';
    const text = 'Привет, это тестовое сообщение!';

    const url = `https://api.telegram.org/bot${botToken}/sendMessage?chat_id=${chatId}&text=${encodeURIComponent(text)}`;

    fetch(url)
      .then(response => response.json())
      .then(data => console.log('Сообщение отправлено:', data))
      .catch(error => console.error('Ошибка:', error));
  }
}
