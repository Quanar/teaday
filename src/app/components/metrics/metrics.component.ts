import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, transition, style, animate, stagger, query } from '@angular/animations';

@Component({
  selector: 'app-metrics',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="metrics" class="py-20 bg-gray-50">
      <div class="container mx-auto px-4">
        <h2 class="text-3xl font-bold text-center mb-16">КЛЮЧЕВЫЕ ПОКАЗАТЕЛИ</h2>

        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16" [@staggerMetrics]>
          <div *ngFor="let metric of metrics()"
               class="metric-card text-center">
            <div class="text-4xl font-bold text-coral mb-4">{{metric.value}}</div>
            <div class="text-xl">{{metric.label}}</div>
          </div>
        </div>

        <div class="flex flex-col md:flex-row items-center justify-between gap-12">
          <div class="md:w-1/2" [@fadeIn]>
            <p class="text-lg leading-relaxed">
              <span class="font-bold">Бренд TEADAY</span> — это более четырёх лет на рынке и преданность
              оригинальности. Мы завоевали доверие клиентов благодаря уникальному меню,
              в котором каждый найдёт что-то для себя. Мы не просто предлагаем
              классический чай — мы постоянно создаём новые, неповторимые вкусы,
              добавляя в меню свежие напитки, чтобы радовать наших гостей и удивлять
              их каждый раз. TEADAY — это больше, чем чай, это вкусный опыт, который
              всегда остаётся незабываемым.
            </p>
          </div>
          <div class="md:w-1/2" [@slideIn]>
            <img
              src="assets/team.jpg"
              alt="Команда TEADAY"
              class="w-full rounded-lg shadow-lg"
            >
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .metric-card {
      @apply bg-white p-8 rounded-lg shadow-sm;
      transition: transform 0.3s ease, box-shadow 0.3s ease;

      &:hover {
        transform: translateY(-5px);
        box-shadow: 0 10px 30px rgba(0,0,0,0.1);
      }
    }
  `],
  animations: [
    trigger('staggerMetrics', [
      transition(':enter', [
        query('.metric-card', [
          style({ opacity: 0, transform: 'translateY(20px)' }),
          stagger('100ms', [
            animate('600ms ease-out',
              style({ opacity: 1, transform: 'translateY(0)' }))
          ])
        ])
      ])
    ]),
    trigger('fadeIn', [
      transition(':enter', [
        style({ opacity: 0 }),
        animate('600ms ease-out', style({ opacity: 1 }))
      ])
    ]),
    trigger('slideIn', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateX(30px)' }),
        animate('600ms ease-out',
          style({ opacity: 1, transform: 'translateX(0)' }))
      ])
    ])
  ]
})
export class MetricsComponent {
  metrics = signal([
    { value: '20-30 %', label: 'Рентабельность' },
    { value: '12-18 млн тг/мес', label: 'Прогнозируемая выручка' },
    { value: '8-12 мес', label: 'Срок окупаемости' }
  ]);
}
