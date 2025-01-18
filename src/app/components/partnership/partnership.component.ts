import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, transition, style, animate, query, stagger } from '@angular/animations';

@Component({
  selector: 'app-partnership',
  standalone: true,
  imports: [CommonModule],
  template: `
    <h1>PARTNERSHIP-COMPONENT</h1>
    <section class="py-20 bg-white">
      <div class="container mx-auto px-4">
        <h2 class="text-3xl font-bold text-center mb-8">
          ПАРТНЕРСТВО С <span class="text-coral">TEADAY</span> ЭТО
        </h2>

        <!-- Преимущества партнерства -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20"
             [@staggerFeatures]>
          <div *ngFor="let feature of features()" class="feature-card">
            <div class="icon-wrapper mb-4">
              <img [src]="feature.icon" [alt]="feature.title" class="w-12 h-12">
            </div>
            <h3 class="text-xl font-bold mb-3">{{feature.title}}</h3>
            <p>{{feature.description}}</p>
          </div>
        </div>

        <!-- Этапы партнерства -->
        <div class="partnership-steps">
          <h3 class="text-2xl font-bold text-center mb-12">
            КАК СТАТЬ ПАРТНЕРОМ <span class="text-coral">TEADAY</span>
          </h3>

          <p class="text-center max-w-3xl mx-auto mb-12">
            Каждый партнер – это наш союзник. Мы ищем тех, кто разделяет наши ценности,
            готов развиваться вместе с нами и вносить свой вклад в общее дело.
          </p>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
               [@staggerSteps]>
            <div *ngFor="let step of steps(); let i = index"
                 class="step-card relative">
              <div class="step-number">{{i + 1}}</div>
              <h4 class="text-xl font-bold mb-3">{{step.title}}</h4>
              <p>{{step.description}}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  `,
  styles: [`
    .feature-card {
      @apply bg-white p-6 rounded-lg shadow-sm;
      transition: transform 0.3s ease;

      &:hover {
        transform: translateY(-5px);
      }

      .icon-wrapper {
        @apply bg-coral-light p-3 rounded-full w-16 h-16 flex items-center justify-center;
      }
    }

    .step-card {
      @apply bg-white p-6 rounded-lg shadow-sm;

      .step-number {
        @apply w-8 h-8 bg-coral text-white rounded-full flex items-center justify-center
               font-bold absolute -top-4 -left-4;
      }
    }
  `],
  animations: [
    trigger('staggerFeatures', [
      transition(':enter', [
        query('.feature-card', [
          style({ opacity: 0, transform: 'translateY(20px)' }),
          stagger('100ms', [
            animate('600ms ease-out',
              style({ opacity: 1, transform: 'translateY(0)' }))
          ])
        ])
      ])
    ]),
    trigger('staggerSteps', [
      transition(':enter', [
        query('.step-card', [
          style({ opacity: 0, transform: 'translateX(20px)' }),
          stagger('100ms', [
            animate('600ms ease-out',
              style({ opacity: 1, transform: 'translateX(0)' }))
          ])
        ])
      ])
    ])
  ]
})
export class PartnershipComponent {
  features = signal([
    {
      icon: 'assets/icons/support.svg',
      title: 'Полная поддержка партнеров',
      description: 'на всех этапах развития'
    },
    {
      icon: 'assets/icons/chat.svg',
      title: 'Рабочий чат',
      description: 'где можно задавать любые вопросы. Мы всегда открыты к диалогу и готовы рассмотреть ваши идеи'
    },
    {
      icon: 'assets/icons/team.svg',
      title: 'Помощь в поиске команды',
      description: 'и обучение'
    },
    {
      icon: 'assets/icons/knowledge.svg',
      title: 'База знаний',
      description: 'где собраны все стандарты работы'
    },
    {
      icon: 'assets/icons/franchise.svg',
      title: 'Возможность приобретения',
      description: 'мастер-франшизы'
    },
    {
      icon: 'assets/icons/marketing.svg',
      title: 'Мощное маркетинговое продвижение',
      description: 'в популярных социальных сетях'
    }
  ]);

  steps = signal([
    {
      title: 'Шаг 1',
      description: 'Оставьте заявку – расскажите о своем интересе к сотрудничеству.'
    },
    {
      title: 'Шаг 2',
      description: 'Согласуем детали – обсудим точку открытия и подпишем договор'
    },
    {
      title: 'Шаг 3',
      description: 'Выбор локации – найдем идеальное место и утвердим его вместе'
    },
    {
      title: 'Шаг 4',
      description: 'Обучение и подготовка – проведем обучение и настроим все бизнес-процессы'
    },
    {
      title: 'Шаг 5',
      description: 'Формируем команду – подберем персонал и подготовим их к работе'
    },
    {
      title: 'Шаг 6',
      description: 'Торжественное открытие – начинаем успешный путь вашего бизнеса!'
    }
  ]);
}
