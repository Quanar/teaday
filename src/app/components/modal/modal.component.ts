import { Component, EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-modal',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg p-8 max-w-md w-full mx-4 relative">
        <!-- Кнопка закрытия -->
        <button
          (click)="close.emit()"
          class="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          aria-label="Закрыть">
          <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        <!-- Заголовок -->
        <h2 class="text-2xl font-bold mb-6">Получить бизнес-план</h2>

        <!-- Форма -->
        <form (ngSubmit)="onSubmit()" class="space-y-4">
          <div>
            <input
              type="text"
              [(ngModel)]="formData.name"
              name="name"
              placeholder="Имя"
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div>
            <input
              type="email"
              [(ngModel)]="formData.email"
              name="email"
              placeholder="Email"
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div class="flex gap-2">
            <select
              [(ngModel)]="selectedCountry"
              name="country"
              class="w-1/3 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              (change)="updatePhonePrefix()">
              <option *ngFor="let country of countries" [value]="country.code">
                {{ country.flag }} {{ country.prefix }}
              </option>
            </select>
            <input
              type="tel"
              [(ngModel)]="formData.phone"
              name="phone"
              placeholder="999 999-99-99"
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div>
            <input
              type="text"
              [(ngModel)]="formData.city"
              name="city"
              placeholder="Город"
              class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              required
            />
          </div>

          <div class="flex flex-col space-y-2">
            <label class="text-sm text-gray-600">Удобная дата для связи:</label>
            <div class="flex gap-4">
              <input
                type="date"
                [(ngModel)]="formData.date"
                name="date"
                class="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
              <input
                type="time"
                [(ngModel)]="formData.time"
                name="time"
                class="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            class="w-full px-6 py-4 bg-[#0066FF] text-white font-semibold rounded-lg hover:bg-blue-600 transition-colors">
            Отправить
          </button>
        </form>
      </div>
    </div>
  `
})
export class ModalComponent {
  @Output() close = new EventEmitter<void>();

  formData = {
    name: '',
    email: '',
    phone: '',
    city: '',
    date: '',
    time: ''
  };

  // По умолчанию выбран Казахстан
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

  ngOnInit() {
    // Устанавливаем префикс телефона по умолчанию для Казахстана
    this.updatePhonePrefix();
  }

  updatePhonePrefix() {
    const selectedCountry = this.countries.find(country => country.code === this.selectedCountry);
    if (selectedCountry) {
      this.formData.phone = selectedCountry.prefix + ' ' + this.formData.phone.replace(/^\+\d+\s/, '');
    }
  }

  onSubmit() {
    console.log('Form submitted:', this.formData);
    //TODO Здесь будет логика отправки формы
    this.close.emit();
  }
}

