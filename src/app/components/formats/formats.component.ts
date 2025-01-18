import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, transition, style, animate, state } from '@angular/animations';

@Component({
  selector: 'app-formats',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section class="py-20 bg-gray-50">
      <div class="container mx-auto px-4">
        <h2 class="text-3xl font-bold text-center mb-12">
          ВЫБЕРИ СВОЙ ФОРМАТ<br>
          ЧАЙНОГО ДОМА <span class="text-coral">TEADAY</span>
        </h2>

        <!-- Табы форматов -->
        <div class="format-tabs flex justify-center mb-12">
          <button *ngFor="let format of formats()"
                  class="tab-btn px-6 py-2"
                  [class.active]="selectedFormat() === format.id"
                  (click)="selectFormat(format.id)">
            {{format.name}}
          </button>
        </div>

        <!-- Контент формата -->
        <div class="format-content flex flex-col lg:flex-row items-center gap-12"
             [@fadeInOut]="selectedFormat()">
          <!-- Описание -->
          <div class="lg:w-1/2">
            <div class="format-description mb-8">
              <p class="text-lg mb-6">
                {{getCurrentFormat().description}}
              </p>
              <ul class="space-y-3">
                <li *ngFor="let spec of getCurrentFormat().specifications">
                  <span class="font-medium">{{spec.label}}:</span> {{spec.value}}
                </li>
              </ul>
            </div>
          </div>

          <!-- Изображение -->
          <div class="lg:w-1/2">
            <img [src]="getCurrentFormat().image"
                 [alt]="getCurrentFormat().name"
                 class="w-full rounded-lg shadow-lg">
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .tab-btn {
      @apply border-b-2 border-transparent transition-all;

      &.active {
        @apply border-coral text-coral;
      }
    }

    .format-content {
      min-height: 400px;
    }
  `],
  animations: [
    trigger('fadeInOut', [
      state('void', style({ opacity: 0, transform: 'translateY(20px)' })),
      state('*', style({ opacity: 1, transform: 'translateY(0)' })),
      transition('void => *', animate('400ms ease-out')),
      transition('* => void', animate('400ms ease-in'))
    ])
  ]
})
export class FormatsComponent {
  selectedFormat = signal('kiosk');

  formats = signal([
    {
      id: 'cafe',
      name: 'Кафе',
      description: 'Полноценное кафе с посадочными местами и расширенным меню.',
      specifications: [
        { label: 'Площадь', value: 'от 50-120 кв. м.' },
        { label: 'Инвестиции', value: 'от 25 млн. тг.' },
        { label: 'Сроки открытия', value: 'от 2 мес' }
      ],
      image: 'assets/format-cafe.jpg'
    },
    {
      id: 'island',
      name: 'Остров',
      description: 'Компактная точка в торговом центре с базовым ассортиментом.',
      specifications: [
        { label: 'Площадь', value: 'от 6-15 кв. м.' },
        { label: 'Инвестиции', value: 'от 18 млн. тг.' },
        { label: 'Сроки открытия', value: 'от 1.5 мес' }
      ],
      image: 'assets/format-island.jpg'
    },
    {
      id: 'kiosk',
      name: 'Киоск',
      description: 'Мобильный и универсальный формат, идеально подходящий для мест с высоким потоком людей на открытом воздухе. Это отличный выбор для парков, набережных и других общественных мест. Киоск привлекает клиентов ярким оформлением и возможностью быстро приобрести любимый напиток.',
      specifications: [
        { label: 'Площадь', value: 'от 15-30 кв. м.' },
        { label: 'Инвестиции', value: 'от 15 млн. тг.' },
        { label: 'Сроки открытия', value: 'от 1 мес' }
      ],
      image: 'assets/format-kiosk.jpg'
    }
  ]);

  getCurrentFormat() {
    return this.formats().find(f => f.id === this.selectedFormat()) || this.formats()[0];
  }

  selectFormat(formatId: string) {
    this.selectedFormat.set(formatId);
  }
}
