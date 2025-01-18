import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, transition, style, animate, query, stagger } from '@angular/animations';

@Component({
  selector: 'app-business-model',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="py-20 bg-coral-light">
      <div class="container mx-auto px-4">
        <h2 class="text-3xl font-bold text-center mb-16">БИЗНЕС МОДЕЛЬ</h2>

        <div class="grid gap-6" [@staggerItems]>
          <div *ngFor="let item of businessItems()"
               class="business-item grid grid-cols-1 md:grid-cols-2 items-center">
            <div class="text-3xl md:text-4xl font-bold text-white md:text-right md:pr-8">
              {{item.value}}
            </div>
            <div class="text-lg md:text-xl text-white md:border-l md:pl-8">
              {{item.label}}
            </div>
          </div>
        </div>

        <div class="mt-16 text-center">
          <button class="bg-black text-white px-8 py-3 rounded-lg text-lg
                         hover:bg-opacity-90 transition-all">
            Получить бизнес-план
          </button>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .business-item {
      @apply bg-coral p-6 rounded-lg transition-transform;

      &:hover {
        transform: translateX(10px);
      }
    }
  `],
  animations: [
    trigger('staggerItems', [
      transition(':enter', [
        query('.business-item', [
          style({ opacity: 0, transform: 'translateX(-20px)' }),
          stagger('100ms', [
            animate('600ms ease-out',
              style({ opacity: 1, transform: 'translateX(0)' }))
          ])
        ])
      ])
    ])
  ]
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
