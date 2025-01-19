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

          <div>
            <input
              type="tel"
              [(ngModel)]="formData.phone"
              name="phone"
              placeholder="+7 (999) 999-99-99"
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

  onSubmit() {
    console.log('Form submitted:', this.formData);
    //TODO Здесь будет логика отправки формы
    this.close.emit();
  }
}
