import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-business-model',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="py-20 bg-white">
      <div class="container mx-auto px-4">
        <h2 class="text-4xl font-bold text-center mb-16 text-gray-800 ">
          БИЗНЕС МОДЕЛЬ
        </h2>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div *ngFor="let item of businessItems(); let i = index"
               class="business-item p-6 rounded-xl shadow-lg border border-gray-100 transition-all transform hover:scale-105 animate-float">
            <div style="color: var(--color-coral-dark)" class="text-2xl md:text-3xl font-bold text-gray-800 mb-4">
              {{item.value}}
            </div>
            <div class="text-lg md:text-xl text-gray-600">
              {{item.label}}
            </div>
          </div>
        </div>

        <div class="mt-16 text-center">
          <button class="bg-coral text-white px-8 py-4 rounded-lg text-xl
                         hover:bg-coral-dark transition-all transform hover:scale-105 animate-pulse">
            Получить бизнес-план
          </button>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .business-item {
      @apply bg-white p-6 rounded-xl shadow-lg border border-gray-100 transition-all transform;
      min-height: 150px; /* Уменьшаем высоту */
    }

    .business-item:hover {
      transform: translateY(-5px) scale(1.02);
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
      border-color: #ff6633; /* Цвет границы при наведении */
    }

    /* Анимация пульсации */
    .animate-pulse {
      animation: pulse 2s infinite ease-in-out;
    }

    /* Анимация плавающего эффекта */
    .animate-float {
      animation: float 4s infinite ease-in-out;
    }

    /* Ключевые кадры для пульсации */
    @keyframes pulse {
      0%, 100% {
        transform: scale(1);
      }
      50% {
        transform: scale(1.05);
      }
    }

    /* Ключевые кадры для плавающего эффекта */
    @keyframes float {
      0%, 100% {
        transform: translateY(0);
      }
      50% {
        transform: translateY(-10px);
      }
    }
  `]
})
export class BusinessModelComponent {
  businessItems = signal([
    { value: '12-18 млн тг/мес', label: 'Прогнозируемая выручка' },
    { value: '20-30%', label: 'Рентабельность' },
    { value: '8-12 месяцев', label: 'Срок окупаемости франшизы' },
    { value: 'от 12 млн тг', label: 'Первоначальные инвестиции на открытие одной точки' },
    { value: 'от 2.4 млн тг', label: 'Вступительный взнос' },
    { value: '3%', label: 'Роялти' }
  ]);
}
