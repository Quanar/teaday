import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormBuilder, FormsModule, ReactiveFormsModule, Validators} from '@angular/forms';
import {DataService} from "../../services/data.service";
import {animate, style, transition, trigger} from "@angular/animations";
import {FadeDirective} from "../../directives/fade.directive";
import {environment} from "../../../environments/environment-telegram";
import {EmailService} from "../../services/email.service";

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FadeDirective, FormsModule],
  template: `
    <section id="contacts"
             class="py-20 bg-gradient-to-b from-coral-light to-white relative overflow-hidden">
      <!-- Декоративный фон -->
      <div class="absolute inset-0 pointer-events-none">
        <div *ngFor="let i of [1,2,3,4]"
             class="absolute w-40 h-40 bg-coral/5 rounded-full animate-float"
             [style.top]="random(0, 100) + '%'"
             [style.left]="random(0, 100) + '%'"
             [style.animation-delay]="i * 0.5 + 's'">
        </div>
      </div>

      <div class="container mx-auto px-4 relative z-10">
        <div class="max-w-3xl mx-auto">
          <!-- Заголовок -->
          <div class="text-center mb-12" appFade>
            <h2 class="text-3xl md:text-4xl font-bold mb-4">
              Оставьте заявку
            </h2>
          </div>

          <!-- Форма -->
          <form [formGroup]="contactForm"
                (ngSubmit)="onSubmit()"
                class="bg-white rounded-xl shadow-xl p-8 relative"
                [class.opacity-50]="isSubmitting()"
                appFade>
            <!-- Декоративный элемент -->
            <div class="absolute -top-6 right-8">
              <div class="w-12 h-12 bg-coral rounded-xl shadow-lg flex items-center justify-center
                          transform -rotate-12">
                <svg class="w-6 h-6 text-white">
                  <use href="#mail"/>
                </svg>
              </div>
            </div>

            <!-- Сетка полей -->
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <!-- Имя -->
              <div class="form-group">
                <label class="block text-sm font-medium text-gray-700 mb-1">
                  Имя*
                </label>
                <input type="text"
                       formControlName="name"
                       class="form-input w-full px-4 py-2 rounded-lg border transition-colors
                              focus:outline-none focus:ring-2 focus:ring-coral"
                       [class.border-red-500]="showError('name')">
                <div *ngIf="showError('name')"
                     class="text-red-500 text-sm mt-1 pl-1">
                  Пожалуйста, введите ваше имя
                </div>
              </div>

              <!-- Телефон -->
              <div class="form-group">
                <label class="block text-sm font-medium text-gray-700 mb-1">
                  Телефон*
                </label>
                <div class="flex gap-1">
                  <select
                    formControlName="countryCode"
                    class="cursor-pointer h-[42px] w-1/3 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                    <option *ngFor="let country of countries" [value]="country.prefix">
                      {{ country.flag }} {{ country.prefix }}
                    </option>
                  </select>
                <input type="tel"
                       formControlName="phone"
                       class="form-input w-full px-4 py-2 rounded-lg border transition-colors
                              focus:outline-none focus:ring-2 focus:ring-coral"
                       [class.border-red-500]="showError('phone')">
<!--                <div *ngIf="showError('phone')"-->
<!--                     class="text-red-500 text-sm mt-1 pl-1">-->
<!--                  Введите корректный номер телефона-->
<!--                </div>-->
                </div>
              </div>

              <!-- Email -->
              <div class="form-group">
                <label class="block text-sm font-medium text-gray-700 mb-1">
                  Email*
                </label>
                <input type="email"
                       formControlName="email"
                       class="form-input w-full px-4 py-2 rounded-lg border transition-colors
                              focus:outline-none focus:ring-2 focus:ring-coral"
                       [class.border-red-500]="showError('email')">
                <div *ngIf="showError('email')"
                     class="text-red-500 text-sm mt-1 pl-1">
                  Введите корректный email
                </div>
              </div>

              <!-- Город -->
              <div class="form-group">
                <label class="block text-sm font-medium text-gray-700 mb-1">
                  Город*
                </label>
                <input type="text"
                       formControlName="city"
                       class="form-input w-full px-4 py-2 rounded-lg border transition-colors
                              focus:outline-none focus:ring-2 focus:ring-coral"
                       [class.border-red-500]="showError('city')">
                <div *ngIf="showError('city')"
                     class="text-red-500 text-sm mt-1 pl-1">
                  Укажите ваш город
                </div>
              </div>
            </div>

            <!-- Комментарий -->
<!--            <div class="form-group mt-6">-->
<!--              <label class="block text-sm font-medium text-gray-700 mb-1">-->
<!--                Комментарий-->
<!--              </label>-->
<!--              <textarea formControlName="comment"-->
<!--                        rows="4"-->
<!--                        class="form-input w-full px-4 py-2 rounded-lg border transition-colors-->
<!--                               focus:outline-none focus:ring-2 focus:ring-coral resize-none">-->
<!--              </textarea>-->
<!--            </div>-->
            <!-- Согласие -->
            <div class="mt-6">
              <label class="flex items-start cursor-pointer group">
                <div class="flex items-center h-5">
                  <input type="checkbox"
                         formControlName="agreement"
                         class="w-4 h-4 text-coral border-gray-300 rounded
                                focus:ring-coral transition-colors">
                </div>
                <span class="ml-2 text-sm text-gray-500 group-hover:text-gray-700">
                  Я согласен на обработку персональных данных
                </span>
              </label>
              <div *ngIf="showError('agreement')"
                   class="text-red-500 text-sm mt-1 pl-1">
                Необходимо согласие на обработку персональных данных
              </div>
            </div>

            <!-- Кнопка отправки -->
            <button type="submit"
                    [disabled]="!contactForm.valid || isSubmitting()"
                    class="w-full mt-8 px-8 py-4 bg-black text-white rounded-lg
                           font-semibold transition-all transform hover:-translate-y-1
                           active:translate-y-0 disabled:opacity-50
                           disabled:cursor-not-allowed flex items-center justify-center">
              <svg *ngIf="isSubmitting()"
                   class="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                   fill="none"
                   viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"/>
                <path class="opacity-75" fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"/>
              </svg>
              {{ isSubmitting() ? 'Отправка...' : 'ОСТАВИТЬ ЗАЯВКУ' }}
            </button>
          </form>

          <!-- Успешная отправка -->
          <div *ngIf="isSuccess()"
               class="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center
                      justify-center z-50 p-4"
               (click)="closeSuccess()">
            <div class="bg-white rounded-xl p-8 max-w-md w-full transform transition-all
                        shadow-2xl"
                 (click)="$event.stopPropagation()"
                 @fadeSlideIn>
              <div class="text-center">
                <!-- Иконка успеха -->
                <div class="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center
                            justify-center mb-4">
                  <svg class="w-8 h-8 text-green-500" fill="none" viewBox="0 0 24 24"
                       stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                          d="M5 13l4 4L19 7"/>
                  </svg>
                </div>

                <h3 class="text-2xl font-bold mb-2">Спасибо за заявку!</h3>
                <p class="text-gray-600 mb-6">
                  Мы свяжемся с вами в ближайшее время для обсуждения деталей сотрудничества.
                </p>

                <button (click)="closeSuccess()"
                        class="w-full px-6 py-3 bg-coral text-white rounded-lg font-semibold
                               transition-all hover:bg-coral-dark">
                  Закрыть
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .form-group {
      position: relative;
    }

    .form-input {
      transition: all 0.3s ease;
    }

    .form-input:focus {
      transform: translateY(-1px);
    }

    @keyframes float {
      0%, 100% { transform: translateY(0); }
      50% { transform: translateY(-20px); }
    }

    .animate-float {
      animation: float 3s ease-in-out infinite;
    }
  `],
  animations: [
    trigger('fadeSlideIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(20px)' }),
        animate('300ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ]),
      transition(':leave', [
        animate('200ms ease-in', style({ opacity: 0, transform: 'translateY(20px)' }))
      ])
    ])
  ]
})
export class ContactComponent {
  private fb = inject(FormBuilder);
  private dataService = inject(DataService);

  selectedCountry = '+7'; // Код Казахстана
  countries = [
    { code: '+7', flag: '🇰🇿', prefix: '+7' }, // Казахстан
    { code: '+7', flag: '🇷🇺', prefix: '+7' }, // Россия
    { code: '+1', flag: '🇺🇸', prefix: '+1' }, // США
    { code: '+44', flag: '🇬🇧', prefix: '+44' }, // Великобритания
    { code: '+49', flag: '🇩🇪', prefix: '+49' }, // Германия
    { code: '+33', flag: '🇫🇷', prefix: '+33' }, // Франция
    { code: '+81', flag: '🇯🇵', prefix: '+81' }, // Япония
    { code: '+86', flag: '🇨🇳', prefix: '+86' }, // Китай
    { code: '+91', flag: '🇮🇳', prefix: '+91' }, // Индия
    { code: '+61', flag: '🇦🇺', prefix: '+61' }, // Австралия
    { code: '+55', flag: '🇧🇷', prefix: '+55' }, // Бразилия
    // Добавьте другие страны по необходимости
  ];
  // Состояния
  isSubmitting = signal(false);
  isSuccess = signal(false);

  // Форма
  contactForm = this.fb.group({
    name: ['', [
      Validators.required,
      Validators.minLength(2),
      Validators.maxLength(50)
    ]],
    phone: ['', [
      Validators.required,
      // Validators.pattern(/^\\+?[0-9]{10,12}$/)
    ]],
    countryCode: ['', Validators.required],
    email: ['', [
      Validators.required,
      Validators.email
    ]],
    city: ['', [
      Validators.required,
      Validators.minLength(2)
    ]],
    comment: [''],
    agreement: [false, [
      Validators.requiredTrue
    ]],
  });
  constructor(private emailService: EmailService) {
  }

  ngOnInit() {
    // Устанавливаем префикс телефона по умолчанию для Казахстана
    this.updatePhonePrefix();
  }

  updatePhonePrefix() {
    const selectedCountry = this.countries.find(country => country.code === this.selectedCountry);
    if (selectedCountry) {
      this.contactForm.patchValue({
        countryCode: selectedCountry.prefix,
        phone: this.contactForm.value.phone?.replace( /^\+\d+\s*/, '' ) || ''
      });
    }
  }


  // Вспомогательные методы
  showError(fieldName: string): boolean {
    const field = this.contactForm.get(fieldName);
    return field ? field.invalid && (field.dirty || field.touched) : false;
  }

  random(min: number, max: number): number {
    return Math.random() * (max - min) + min;
  }
  sendToTelegram(formData: any) {
    const botToken = environment.telegramBotToken;
    const chatId = '-1002320585322';

    const text = `
    Новая заявка:
    Имя: ${formData.name}
    Email: ${formData.email}
    Телефон: ${formData.phone}
    Город: ${formData.city}
  `;

    const url = `https://api.telegram.org/bot${botToken}/sendMessage?chat_id=${chatId}&text=${encodeURIComponent(text)}`;

    fetch(url)
      .then(response => response.json())
      .then(data => console.log('Сообщение отправлено:', data))
      .catch(error => console.error('Ошибка при отправке:', error));
  }

  onSubmit() {
    if (this.contactForm.valid) {
      const formData = this.contactForm.value;

      // Собираем телефон в правильном формате
      const fullPhoneNumber = `${formData.countryCode} ${formData.phone}`.trim();

      const finalData = {
        ...formData,
        phone: fullPhoneNumber, // Перезаписываем phone с кодом страны
      };

      this.sendToTelegram(finalData);
      this.emailService.sendEmail(finalData);

      this.contactForm.reset();
    } else {
      console.error('Форма не валидна');
    }
  }

  closeSuccess() {
    this.isSuccess.set(false);
  }
}
