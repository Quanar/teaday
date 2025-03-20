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
          <span class="text-coral">TEADAY</span>
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
      name: 'Помещение',
      description: 'Коммерческие помещения, ' +
        'которые расположены на первой линии, на центральных улицах или в спальном районе.' +
        ' Важно учесть три основных показателя для чайной: трафик, удобная парковка, общий вид на чайную.',
      specifications: [
        { label: 'Сроки открытия', value: 'до 2 мес.' },
        { label: 'Площадь', value: 'от 40-100 кв.' },
        { label: 'Инвестиции', value: 'от 20 млн. до 30 млн.' },
        { label: 'Окупаемость', value: '18 месяцев в среднем.' },
        { label: 'Роялти', value: '3 от оборота.' },
        { label: 'Паушальный взнос', value: '3 500 000 тг.' }

      ],
      image: 'assets/images/pomeshenie.jpg'
    },
    {
      id: 'island',
      name: 'Корнер',
      description: 'Островки в ТРЦ и Бизнес центре, университеты отличные места для установки чайных.',
      specifications: [
        { label: 'Сроки открытия', value: 'до 2 мес.' },
        { label: 'Площадь', value: 'от 10 до 30 кв' },
        { label: 'Инвестиции', value: 'от 15 млн. до 20 млн.' },
        { label: 'Окупаемость', value: '18 месяцев в среднем ' },
        { label: 'Роялти', value: '3 от оборота.' },
        { label: 'Паушальный взнос', value: '3 000 000 тг.' }
      ],
      image: 'assets/images/korner.png'
    }
  ]);

  getCurrentFormat() {
    return this.formats().find(f => f.id === this.selectedFormat()) || this.formats()[0];
  }

  selectFormat(formatId: string) {
    this.selectedFormat.set(formatId);
  }
}
