import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-social-icons',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="social-icons">
      <div class="icon-container" (click)="toggleIcons()" [class.active]="isOpen">
        <i class="fas fa-share-alt"></i> <!-- Иконка для открытия/закрытия -->
      </div>
      <div class="icons" [@slideInOut]="isOpen ? 'open' : 'closed'">
        <a href="https://wa.me/ТВОЙ_НОМЕР" target="_blank">
          <i class="fab fa-whatsapp"></i>
        </a>
        <a href="https://t.me/ТВОЙ_НИК" target="_blank">
          <i class="fab fa-telegram"></i>
        </a>
        <a href="https://instagram.com/ТВОЙ_НИК" target="_blank">
          <i class="fab fa-instagram"></i>
        </a>
      </div>
    </div>
  `,
  styles: [`
    :host {
      position: fixed;
      bottom: 20px;
      right: 20px;
      z-index: 1000;
    }

    .social-icons {
      display: flex;
      flex-direction: column;
      align-items: flex-end;
    }

    .icon-container {
      background-color: #333;
      color: #fff;
      padding: 10px;
      border-radius: 50%;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 40px;
      height: 40px;
      transition: background-color 0.3s;
      position: relative; /* Чтобы иконка оставалась на месте */
    }

    .icon-container.active {
      background-color: white; /* Белый фон при активации */
      color: #333; /* Цвет иконки меняется на тёмный */
    }

    .icon-container:hover {
      background-color: #555;
    }

    .icons {
      display: flex;
      flex-direction: column;
      gap: 10px;
      margin-top: 10px;
      position: absolute; /* Чтобы иконки соцсетей не влияли на положение icon-container */
      bottom: 50px; /* Отступ от icon-container */
      right: 0;
    }

    .icons a {
      color: #fff;
      background-color: #333;
      padding: 10px;
      border-radius: 50%;
      text-align: center;
      width: 40px;
      height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      text-decoration: none;
      transition: background-color 0.3s;
    }

    .icons a:hover {
      background-color: #555;
    }
  `],
  animations: [
    trigger('slideInOut', [
      state('closed', style({
        opacity: 0,
        transform: 'translateY(20px)', /* Небольшое смещение для плавности */
        display: 'none'
      })),
      state('open', style({
        opacity: 1,
        transform: 'translateY(0)',
        display: 'flex'
      })),
      transition('closed <=> open', animate('300ms ease-in-out'))
    ])
  ]
})
export class SocialIconsComponent {
  isOpen = false; // Состояние открытия/закрытия иконок

  toggleIcons() {
    this.isOpen = !this.isOpen; // Переключаем состояние
  }
}
