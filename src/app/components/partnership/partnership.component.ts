import { Component, signal, computed } from '@angular/core';
import { CommonModule } from '@angular/common';
import { trigger, transition, style, animate, query, stagger } from '@angular/animations';

@Component({
  selector: 'app-partnership',
  standalone: true,
  imports: [CommonModule],
  template: `
    <section id="partnership" class="py-20 bg-white">
      <div class="container mx-auto px-4">
        <!-- Заголовок и преимущества (оставляем без изменений) -->
        <h2 class="text-3xl font-bold text-center mb-8">
          ПАРТНЕРСТВО С <span class="text-coral">TEADAY</span> ЭТО
        </h2>

        <!-- Преимущества партнерства -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-20">
          <div *ngFor="let feature of features()" class="feature-card">
            <div class="icon-wrapper mb-4">
              <img [src]="feature.icon" [alt]="feature.title" class="w-12 h-12">
            </div>
            <h3 class="text-xl font-bold mb-3">{{feature.title}}</h3>
            <p>{{feature.description}}</p>
          </div>
        </div>

        <!-- Этапы партнерства (применяем изменения) -->
        <div class="partnership-steps bg-white rounded-2xl shadow-lg p-12 relative overflow-hidden">
          <div class="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-coral via-coral-light to-coral"></div>

          <!-- Progress Bar -->
          <div class="relative h-2 bg-gray-200 rounded-full mb-8">
            <div class="absolute top-0 left-0 h-full bg-coral rounded-full transition-all duration-500"
                 [style.width]="progressWidth + '%'"></div>
          </div>

          <div class="text-center mb-16">
            <h3 class="text-3xl md:text-4xl font-bold mb-6 text-gray-900">
              КАК СТАТЬ ПАРТНЕРОМ
              <span class="text-coral relative">
                TEADAY
                <div class="absolute -inset-1 bg-coral opacity-20 blur-sm rounded-lg"></div>
              </span>
            </h3>
            <p class="text-lg text-gray-600 max-w-3xl mx-auto">
              Каждый партнер – это наш союзник. Мы ищем тех, кто разделяет наши ценности,
              готов развиваться вместе с нами и вносить свой вклад в общее дело.
            </p>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
               [@staggerSteps]>
            <div *ngFor="let step of steps(); let i = index"
                 class="step-card group"
                 [class.active]="currentStep() === i"
                 (mouseenter)="setCurrentStep(i)">
              <div class="step-number">
                {{i + 1}}
              </div>
              <h4 class="text-xl font-medium mb-4 text-gray-900 group-hover:text-coral transition-colors duration-300">
                {{step.title}}
              </h4>
              <p class="text-gray-600 leading-relaxed">{{step.description}}</p>

              <!-- Progress indicator -->
              <div class="mt-4 h-1 bg-gray-200 rounded-full overflow-hidden">
                <div class="h-full bg-coral transition-all duration-500"
                     [style.width]="(i <= currentStep() ? '100%' : '0%')"></div>
              </div>
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
      @apply bg-white p-8 pt-12 rounded-2xl shadow-sm border border-gray-100 relative;
      transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);

      &:hover {
        @apply shadow-lg border-coral-light;
      }

      .step-number {
        @apply absolute -top-6 -left-6 w-16 h-16 bg-coral rounded-full flex items-center justify-center;
        font-size: 2.5rem;
        font-weight: 700;
        color: white;
        box-shadow: 0 4px 20px rgba(0, 0, 0, 0.1);
        transform-origin: center;
        transition: all 0.3s ease;
      }

      &:hover .step-number {
        transform: scale(1.1) rotate(10deg);
      }

      &.active {
        @apply border-coral;
        transform: translateY(-4px);

        .step-number {
          @apply bg-coral;
          transform: scale(1.15);
        }
      }
    }
  `],
  animations: [
    trigger('staggerSteps', [
      transition(':enter', [
        query('.step-card', [
          style({ opacity: 0, transform: 'translateX(30px)' }),
          stagger('150ms', [
            animate('800ms cubic-bezier(0.35, 0, 0.25, 1)',
              style({ opacity: 1, transform: 'translateX(0)' }))
          ])
        ])
      ])
    ])
  ]
})
export class PartnershipComponent {
  currentStep = signal(0);
  progressWidth = computed(() => (this.currentStep() + 1) * (100 / this.steps().length));

  features = signal([
    {
      icon: 'assets/icons/support_agent_24dp_5F6368_FILL0_wght400_GRAD0_opsz24.svg',
      title: 'Полная поддержка партнеров',
      description: 'на всех этапах развития'
    },
    {
      icon: 'assets/icons/chat_24dp_5F6368_FILL0_wght400_GRAD0_opsz24.svg',
      title: 'Рабочий чат',
      description: 'где можно задавать любые вопросы. Мы всегда открыты к диалогу и готовы рассмотреть ваши идеи'
    },
    {
      icon: 'assets/icons/help.svg',
      title: 'Помощь в поиске команды',
      description: 'и обучение'
    },
    {
      icon: 'assets/icons/base.svg',
      title: 'База знаний',
      description: 'где собраны все стандарты работы'
    },
    {
      icon: 'assets/icons/opportunity.svg',
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
      title: 'Оставьте заявку',
      description: 'Заполните простую форму и расскажите о своём видении будущего партнерства с TEADAY. Мы свяжемся с вами в течение 24 часов.'
    },
    {
      title: 'Согласование деталей',
      description: 'Обсудим все аспекты сотрудничества, условия партнерства и подготовим индивидуальное предложение для вашего бизнеса.'
    },
    {
      title: 'Выбор локации',
      description: 'Проведем анализ рынка и поможем выбрать оптимальное местоположение для вашей точки с учетом всех факторов успеха.'
    },
    {
      title: 'Обучение и подготовка',
      description: 'Проведем комплексное обучение по всем аспектам бизнеса: от приготовления напитков до управления финансами.'
    },
    {
      title: 'Формирование команды',
      description: 'Поможем собрать профессиональную команду, проведем обучение персонала и настроим все рабочие процессы.'
    },
    {
      title: 'Торжественное открытие',
      description: 'Организуем яркое открытие вашей точки с привлечением местных СМИ и запуском маркетинговой кампании.'
    }
  ]);

  constructor() {
    setInterval(() => {
      this.setCurrentStep((this.currentStep() + 1) % this.steps().length);
    }, 3000);
  }

  setCurrentStep(index: number) {
    this.currentStep.set(index);
  }
}
